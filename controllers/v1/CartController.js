const Cart = require('./../../models/cartModel')
const CartItems = require('./../../models/cartItemsModel')

const catchAsync = require('../../handlers/CatchAsync')
const AppError = require('../../handlers/AppError')

const mongoose = require('mongoose')

exports.create = catchAsync(async (req, res, next) => {
    const { user_id, name, cart_items } = req.body

    let user_cart = await Cart.findOne({
        user_id
    })


    if (user_cart === null) {
        user_cart = await Cart.create({
            user_id,
            name
        })
    }

    let cart_item = await CartItems.create({
        cart_id: user_cart._id,
        product_id: cart_items.product_id,
        quantity: cart_items.quantity,
        amount: cart_items.amount,
        total_amount: cart_items.total_amount,
        image: cart_items.image || ''
    })

    return res.status(200).json({
        status: 'success',
        message: 'Product was successfully added to cart',
        data: {
            cart_item
        }
    })
})

exports.getCart = catchAsync(async (req, res, next) => {
    let { user_id } = req.body
    // user_id has type of mongoose.Schema.ObjectId,, in order to get result, we need to convert it to ObjectId
    user_id = new mongoose.Types.ObjectId(user_id);
    const user_cart = await Cart
        .aggregate([{ $match: { user_id: { $eq: user_id } } }])
        .lookup({ from: 'cart_items', localField: '_id', foreignField: 'cart_id', as: 'cart_items' });

    return res.status(200).json({
        status: 'success',
        results: user_cart.cart_items?.length,
        data: {
            user_cart
        }
    })
})

exports.delete = catchAsync(async (req, res, next) => {
    const { user_id, cart_items } = req.body

    let user_cart = await Cart.findOne({
        user_id
    })

    if (user_cart.length === undefined) {
        throw new AppError('Empty cart')
    }

    await CartItems.find(req.params.id)

    cart_items.forEach(async (item) => {
        await CartItems.findOneAndRemove({ _id: item._id })
    });

    return res.status(200).json({
        status: 'success',
        message: 'Removed from cart successfully'
    })
})