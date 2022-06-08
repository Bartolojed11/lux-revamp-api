const mongoose = require('mongoose')

const OrderSchema = mongoose.Schema({
    ref_num: {
        type: String,
        required: [true, 'Please provide a reference number'],
        unique: true
    },
    user_id: {
        type: String,
        required: [true, 'Please provide a user id']
    },
    name: {
        type: String,
        required: [true, 'Please provide a name']
    },
    address: {
        type: String,
        required: [true, 'Please provide an address']
    },
    notes: {
        type: String
    },
    region: {
        type: String,
        required: [true, 'Please provide a region']
    },
    city: {
        type: String,
        required: [true, 'Please provide a city']
    },
    brgy: {
        type: String
    },
    latitude: {
        type: String
    },
    longitude: {
        type: String
    },
    postal_code: {
        type: String
    },
    total_amount: {
        type: Number,
        required: [true, 'Please provide a total amount']
    },
    order_status: {
        type: String,
        enum: ['pending', 'processing_order', 'booking_confirmed', 'shipped', 'cancelled'],
        default: 'pending'
    },
    cancelled_by: {
        type: String,
        enum: ['customer', 'seller']
    },
    payment_status: {
        type: String,
        enum: ['pending', 'paid', 'unpaid']
    },
    payment_method: {
        type: String
    },
    payment_date: {
        type: Date
    },
    date_ordered: {
        type: Date,
        default: new Date
    },
    date_order_processed: {
        type: Date
    },
    date_booking_confirmed: {
        type: Date
    },
    date_shipped: {
        type: Date
    },
    date_cancelled: {
        type: Date
    },
    order_details: [
        {
            type: {
                type: String,
                required: [true, 'Please provide order items']
            },
            shop_id: {
                type: mongoose.Schema.ObjectId,
                ref: 'Shop'
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
                type: Number
            },
            total_amount: {
                type: Number
            }
        }
    ]
})

OrderSchema.pre('create', function (doc, next) {
    // TODO: Add checking of payment_method and payment_status
    next()
})

OrderSchema.index({ ref_num: 1 })

const Order = mongoose.model('Orders', OrderSchema)

module.exports = Order