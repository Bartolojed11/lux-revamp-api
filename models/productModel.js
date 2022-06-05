const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
    },
    url: {
        type: String,
        required: [true, 'Please provide a product url'],
        unique: true
    },
    sku: {
        type: String
    },
    categories: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Category'
        }
    ],
    summary: {
        type: String,
    },
    other_info: {
        type: String,
    },
    price: {
        type: Number,
        required: [true, 'Please provide a product price'],
    },
    compared_price: {
        type: Number,
        default: 0
    },
    tags: {
        type: String,
    },
    is_active: {
        type: Boolean,
        default: true
    },
    max_qty_percheckout: {
        type: Number,
        default: 0
    },
    track_qty: {
        type: Boolean,
        default: true
    },
    cont_selling: {
        type: Boolean,
        default: false
    },
    avail_qty: {
        type: Number,
        default: 0
    },
    images: {
        type: [String],
        // required: [true, 'A product must have at least one image']
    },
    created_by: [
        {
            type: mongoose.Schema.ObjectId,
            required: true,
            ref: 'User'
        }
    ],
    updated_by: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        }
    ],
    shop_id: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Shop'
        }
    ]
})

const Product = mongoose.model('Product', ProductSchema)

exports.module = Product