const Category = require(`${process.cwd()}/models/categoryModel`)
const Product = require(`${process.cwd()}/models/productModel`)
const Order = require(`${process.cwd()}/models/ordersModel`)


const catchAsync = require(`${process.cwd()}/handlers/CatchAsync`)


const mongoose = require('mongoose')

exports.getUsersOrders = catchAsync(async (req, res, next) => {
    let user_id = req.user._id
    let items = {}
    let product = {}
    // user_id has type of mongoose.Schema.ObjectId,, in order to get result, we need to convert it to ObjectId
    user_id = new mongoose.Types.ObjectId(user_id)

    let orders = await Order.find({ user_id })

    // orders = orders
    let outerNdx = 0
    let innerNdx = 0

    // TODO: Find a way to remove this from loop 
    for (const order of orders) {
        for (const order_item of order.ordered_items) {
            product = await Product.findOne({
                _id: new mongoose.Types.ObjectId(order_item.product_id)
            })
            items = {
                'product_id': order_item.product_id,
                'quantity': order_item.quantity,
                'amount': order_item.amount,
                'total_amount': order_item.total_amount,
                'name': product.name,
                'slug': product.url
            }
            orders[outerNdx].ordered_items[innerNdx] = items

            innerNdx++
        }

        outerNdx++
        innerNdx = 0
    }

    return res.status(200).json({
        status: 'success',
        results: orders.length || 0,
        data: {
            orders
        }
    })
})

exports.getOrder = catchAsync(async (req, res, next) => {
    const { ref_num } = req.params

    let order = await Order.findOne({ ref_num })
    order = order.toObject()
    let ordered_items = []
    let product = {}

    for (const item of order.ordered_items) {
        product = await Product.findOne({
            _id: new mongoose.Types.ObjectId(item.product_id)
        })
        ordered_items = [...ordered_items,
        {
            'product_id': item.product_id,
            'quantity': item.quantity,
            'amount': item.amount,
            'total_amount': item.total_amount,
            'name': product.name,
            'slug': product.url
        }
        ]
    }

    order.ordered_items = ordered_items

    return res.status(200).json({
        status: 'success',
        data: {
            order
        }
    })
})

exports.cancelOrder = catchAsync(async (req, res, next) => {
    const { ref_num } = req.params
    const order = await Order.findOne({ ref_num })

    if (order.order_status !== 'pending') {
        return next(new AppError("To cancel this order, please contact directly seller!"))
    }

    order.order_status = 'cancelled'

    await order.save()

    return res.status(200).json({
        status: 'success',
        data: {
            order
        }
    })
})