const mongoose = require('mongoose')

const CartModelSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'users',
        required: [true, 'Please provide a user id']
    },
    name: {
        type: String,
        required: [true, 'Please provide a name']
    }
})

const CartModel = mongoose.model('Cart', CartModelSchema)

module.exports = CartModel