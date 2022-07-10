const mongoose = require('mongoose')

const CartItemsSchema = mongoose.Schema({
    cart_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'Cart'
    },
    product_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product'
    },
    quantity: {
        type: Number,
        required: [true, 'Please provide a valid quantity']
    },
    amount: {
        type: Number,
        required: [true, 'Please provide a valid amount']
    },
    total_amount: {
        type: Number,
        required: [true, 'Please provide a valid total amount']
    },
    image: {
        type: String
    }
})

const CartItemsModel = mongoose.model('cart_items', CartItemsSchema)

module.exports = CartItemsModel