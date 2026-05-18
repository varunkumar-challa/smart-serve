const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        item: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Item',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    total: {
        type: Number,
        default: 0
    }
});

// Method to calculate total dynamically based on the items in the cart
cartSchema.methods.calculateTotal = async function() {
    let total = 0;

    // Calculate the total based on the items in the cart
    for (let i = 0; i < this.items.length; i++) {
        const cartItem = this.items[i];
        const item = await mongoose.model('Item').findById(cartItem.item); // Get the item from the database
        if (item) {
            total += item.price * cartItem.quantity; // Calculate total price
        }
    }

    this.total = total; // Set the total on the cart
    await this.save(); // Save the updated cart with the new total
};

// Use the cart model
module.exports = mongoose.model('Cart', cartSchema);
