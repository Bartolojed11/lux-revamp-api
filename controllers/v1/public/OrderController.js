const Order = require(`${process.cwd()}/models/ordersModel`)
const AppError = require(`${process.cwd()}/handlers/AppError`)

const cartController = require(`${process.cwd()}/controllers/v1/public/CartController`)

const catchAsync = require(`${process.cwd()}/handlers/catchAsync`)

exports.placeOrder = catchAsync(async (req, res, next) => {
    const { ref_num, user_id, name, notes, total_amount, ordered_items, delivery_address } = req.body

    const order = await Order.create({
        ref_num,
        user_id,
        name,
        notes,
        total_amount,
        ordered_items,
        delivery_address,
    })

    // Delete cart items that are being checkout
    cartController.delete(req, res, next)

    return res.status(200).json({
        status: 'success',
        data: {
            ordered_items,
            order,
        }
    })
})