const mongoose = require('mongoose')
const validator = require('validator')

const CartModelSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'users',
        required: [true, 'Please provide a user id']
    },
    email: {
        type: String,
        required: [true, 'Please provide your email address'],
        unique: true,
        validate: [
            validator.isEmail,
            'Please provide a valid email address'
        ]
},
})

const CartModel = mongoose.model('Cart', CartModelSchema)

module.exports = CartModel