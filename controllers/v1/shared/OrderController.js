const Category = require(`${process.cwd()}/models/categoryModel`)
const Product = require(`${process.cwd()}/models/productModel`)
const Order = require(`${process.cwd()}/models/ordersModel`)


const catchAsync = require(`${process.cwd()}/handlers/CatchAsync`)


const mongoose = require('mongoose')

exports.getUsersOrders = catchAsync(async (req, res, next) => {
    let user_id = req.user._id
    // user_id has type of mongoose.Schema.ObjectId,, in order to get result, we need to convert it to ObjectId
    user_id = new mongoose.Types.ObjectId(user_id)

    let orders = await Order.find({ user_id })

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