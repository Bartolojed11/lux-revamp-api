const Order = require(`${process.cwd()}/models/ordersModel`)
const Product = require(`${process.cwd()}/models/productModel`)
const Cart = require(`${process.cwd()}/models/cartModel`)

const AppError = require(`${process.cwd()}/handlers/AppError`)

const cartController = require(`${process.cwd()}/controllers/v1/public/CartController`)

const catchAsync = require(`${process.cwd()}/handlers/catchAsync`)

const mongoose = require('mongoose')


async function getOrderTotalAmount(items = []) {
    let total_amount = 0
    let product

    for (const item of items) {
        product = await Product.findOne({ _id: item.product_id })
        total_amount += product.price * item.quantity
    }

    return total_amount
}


exports.placeOrder = catchAsync(async (req, res, next) => {
    const { user } = req
    const { notes, ordered_items, delivery_address } = req.body

    const name = user.first_name + user.last_name

    let user_id = user._id
    user_id = new mongoose.Types.ObjectId(user_id);

    let ref_num = Date.now().toString(36) + Math.random().toString(36).substr(6)
    ref_num = process.env.ORDER_PREFIX + ref_num.toUpperCase(ref_num)

    let total_amount = await getOrderTotalAmount(ordered_items)

    let user_cart = await Cart.findOne({
        user_id: user_id
    })

    const order = await Order.create({
        ref_num,
        user_id,
        name,
        notes,
        total_amount,
        ordered_items,
        delivery_address,
    })

    req.from_place_order = true

    // Delete cart items that are being checkout
    await cartController.deleteCartItems(ordered_items, user_cart)

    return res.status(200).json({
        status: 'success',
        message: 'Order was successfully',
        data: {
            order,
        }
    })
})