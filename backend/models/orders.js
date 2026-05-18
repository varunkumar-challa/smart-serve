const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    orderItems: [
        {
            item: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Item',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    tableNumber:{
        type: Number,
        required:true
    },
    total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending','Cooked', 'Delivered'],
        default: 'pending',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('Order',orderSchema);