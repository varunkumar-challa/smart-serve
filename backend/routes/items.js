const express = require('express');
const router = express.Router();
const Item = require('../models/items');
const Cart = require('../models/cart');
const Order = require('../models/orders');
const adminAuthenticate = require('../middleware/adminauth');
const authenticate = require('../middleware/auth');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');  // Specify the folder where images should be uploaded
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);  // Append timestamp to avoid filename conflicts
    }
});
const upload = multer({ storage: storage });


// Get all items (menu)
router.get('/', async (req, res) => {
    try {
        const itemList = await Item.find();
        res.json({ success: true, data: itemList });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch items' });
    }
});

// Route to get all orders for admin
router.get('/orders', async (req, res) => {
    try {
        const orders = await Order.find().populate('customer').populate('orderItems.item'); // Populate customer and items
        res.json({ success: true, data: orders });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Failed to fetch orders' });
    }
});


// Add item (Admin only)
router.post('/', adminAuthenticate, upload.single('image'), async (req, res) => {
    try {
        const { name, price, description } = req.body;
        const image = req.file ? req.file.path : null;  // Handle image file (store path)

        // Validation for required fields
        if (!name || !price || !description) {
            return res.status(400).json({ message: 'Name, price, and description are required.' });
        }

        // Create a new item in the database
        const newItem = new Item({
            name,
            price,
            description,
            image,  // Store the file path of the image
        });

        await newItem.save();
        res.status(201).json({ success: true, data: newItem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Failed to add item' });
    }
});

// Get cart (User only)
router.get('/cart', authenticate, async (req, res) => {
    try {
        const userCart = await Cart.findOne({ user: req.user._id }).populate('items.item');
        res.json({ success: true, data: userCart });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch cart' });
    }
});

// Add item to cart (User only)
router.post('/cart', authenticate, async (req, res) => {
    try {
        const { itemId, quantity } = req.body;

        if (!itemId || !quantity) {
            return res.status(400).json({ success: false, error: 'itemId and quantity are required' });
        }

        const item = await Item.findById(itemId);
        if (!item) {
            return res.status(404).json({ success: false, error: 'Item not found' });
        }

        let userCart = await Cart.findOne({ user: req.user._id });

        if (!userCart) {
            userCart = new Cart({
                user: req.user._id,
                items: [{ item: itemId, quantity }],
                total: item.price * quantity,
            });
        } else {
            const existingItemIndex = userCart.items.findIndex(cartItem => cartItem.item.toString() === itemId);

            if (existingItemIndex >= 0) {
                userCart.items[existingItemIndex].quantity += quantity;
            } else {
                userCart.items.push({ item: itemId, quantity });
            }

            await userCart.calculateTotal();
        }

        await userCart.save();
        res.json({ success: true, data: userCart });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Something went wrong' });
    }
});

// Create order (User only)
router.post('/order', authenticate, async (req, res) => {
    try {
        const { items, total, tableNumber } = req.body;

        const order = new Order({
            customer: req.user._id,
            orderItems:items,
            tableNumber,
            total,
        });

        await order.save();

        // Clear the cart after placing the order
        //await Cart.findOneAndDelete({ user: req.user._id });

        res.json({ success: true, data: order });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Failed to create order' });
    }
});

// Get orders (User only)
router.get('/order', authenticate, async (req, res) => {
    try {
        const orders = await Order.find({ customer: req.user._id }).populate('items.item');
        res.json({ success: true, data: orders });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Failed to fetch orders' });
    }
});

// Route to update order status (Cooked / Delivered)
router.patch('/orders/:id', adminAuthenticate, async (req, res) => {
    try {
        const { status } = req.body;
        const validStatuses = ['Cooked', 'Delivered'];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({ success: false, error: 'Invalid status' });
        }

        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ success: false, error: 'Order not found' });
        }

        order.status = status;
        await order.save();

        res.json({ success: true, data: order });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Failed to update order status' });
    }
});


router.get('/:id',authenticate, async (req,res)=>{
    try{
        const item = await Item.findById({_id:req.params.id});
        res.json({success:true,data:item});
    } catch(error){
        res.status(500).json({success:false,error:'Failed to fetch item'});
    }
});


// Delete order (Admin only, when order is delivered)
// router.delete('/order/:id', adminAuthenticate, async (req, res) => {
//     try {
//         await Order.findByIdAndRemove(req.params.id);
//         res.json({ success: true, message: 'Order deleted successfully' });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ success: false, error: 'Failed to delete order' });
//     }
// });

module.exports = router;
