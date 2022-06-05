const mongoose = require('mongoose')

const ShopSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a shop name'],
        maxlength: 40
    },
    url: {
        type: String,
        required: [true, 'Please provide a shop url'],
        unique: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'on-vacation']
    },
    shop_logo: {
        type: String,
        required: [true, 'Please provide a shop logo'],
    },
    shop_banner: {
        type: String
    },
    owner_id: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        }
    ],
    contact_number: {
        type: String,
        required: [true, 'Please provide a contact number'],
    },
    secondary_contact_number: {
        type: String,
        default: ''
    },
    latest_time_activity: {
        type: String
    },
})

const Shop = mongoose.model('Shop', ShopSchema)

exports.module = Shop

