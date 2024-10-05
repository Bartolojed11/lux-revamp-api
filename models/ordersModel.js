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
            type: Object,
            _id: {
                type: mongoose.Schema.ObjectId,
                required: true,
                unique: true
            },
            region_code: {
                type: String,
                ref: 'regions',
                required: [true, 'Please select a region code']
            },
            region_name: {
                type: String,
                ref: 'regions',
                required: [true, 'Please select a region name']
            },
            province_code: {
                type: String,
                ref: 'provinces',
                required: [true, 'Please select a province code']
            },
            province_name: {
                type: String,
                ref: 'provinces',
                required: [true, 'Please select a region']
            },
            city_name: {
                type: String,
                ref: 'cities',
                required: [true, 'Please select a city name']
            },
            city_code: {
                type: String,
                ref: 'cities',
                required: [true, 'Please select a city code']
            },
            brgy_code: {
                type: String,
                ref: 'barangays',
                required: [true, 'Please select a city barangay code']
            },
            brgy_name: {
                type: String,
                ref: 'barangays',
                required: [true, 'Please select a barangay name']
            },
            postal_code: {
                type: Number
            },
            additional_address: {
                type: String
            }
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
            name: {
                type: String,
                required: [true, 'Please provide product name']
            },
            url: {
                type: String,
                required: [true, 'Please provide product url']
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
            }
        }
    ],
})

OrderSchema.pre('create', function (doc, next) {
    // TODO: Add checking of payment_method and payment_status
    next()
})

OrderSchema.index({ ref_num: 1 })

const Order = mongoose.model('Orders', OrderSchema)

module.exports = Order