const mongoose = require('mongoose')

const OrderSchema = mongoose.Schema({
    ref_num: {
        type: String,
        required: [true, 'Please provide a reference number'],
        unique: true
    },
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'users',
        required: [true, 'Please provide a user id']
    },
    name: {
        type: String,
        required: [true, 'Please provide a name']
    },
    notes: {
        type: String
    },
    delivery_address: [
        {
            type: {
                type: Array,
                required: [true, 'Please provide a delivery address']
            },
            address: {
                type: String,
                required: [true, 'Please provide an address']
            },
            region: {
                type: mongoose.Schema.ObjectId,
                ref: 'regions',
                required: [true, 'Please provide a region']
            },
            city: {
                type: mongoose.Schema.ObjectId,
                ref: 'cities',
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
        }
    ],
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
        default: '',
        enum: ['customer', 'seller', '']
    },
    payment_status: {
        type: String,
        enum: ['pending', 'paid', 'unpaid'],
        default: 'unpaid',
    },
    payment_method: {
        type: String,
        default: 'cod',
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
    ordered_items: [
        {
            type: {
                type: Array,
                required: [true, 'Please provide order items']
            },
            product_id: {
                type: mongoose.Schema.ObjectId,
                ref: 'products'
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