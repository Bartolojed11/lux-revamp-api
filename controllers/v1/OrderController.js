const Order = require('./../../models/ordersModel')
const AppError = require('./../../handlers/AppError')
const catchAsync = require('./../../handlers/catchAsync')

exports.getOrders = catchAsync(async (req, res, next) => {
    const orders = await Order.find({ user_id: req.params.user_id })

    return res.status(200).json({
        status: 'success',
        results: orders.length,
        data: {
            orders
        }
    })
})

exports.getOrder = catchAsync(async (req, res, next) => {
    const { ref_num } = req.params
    const order = await Order.findOne({ ref_num })

    return res.status(200).json({
        status: 'success',
        data: {
            order
        }
    })
})

exports.createOrder = catchAsync(async (req, res, next) => {

    const order = await Order.create(req.body)

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