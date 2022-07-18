const Cart = require(`${process.cwd()}/models/cartModel`)
const CartItems = require(`${process.cwd()}/models/cartItemsModel`)

const catchAsync = require(`${process.cwd()}/handlers/CatchAsync`)
const AppError = require(`${process.cwd()}/handlers/AppError`)

const mongoose = require('mongoose')

exports.create = catchAsync(async (req, res, next) => {
    const { cart_items } = req.body
    const { user } = req

    let user_cart = await Cart.findOne({
        user_id: user._id
    })

    if (user_cart === null) {
        user_cart = await Cart.create({
            user_id: user._id,
            email: user.email
        })
    }

    let cart_item = await CartItems.findOne({
        product_id: new mongoose.Types.ObjectId(cart_items.product_id),
        cart_id: new mongoose.Types.ObjectId(user_cart._id)
    })

    if (cart_item === null) {
        cart_item = await CartItems.create({
            cart_id: user_cart._id,
            product_id: cart_items.product_id,
            quantity: cart_items.quantity,
            amount: cart_items.amount,
            total_amount: cart_items.total_amount,
            image: cart_items.image || ''
        })
    } else {
        cart_item.quantity = cart_items.quantity + cart_item.quantity
        cart_item.total_amount = cart_items.total_amount + cart_item.total_amount
        await cart_item.save()
    }

    return res.status(200).json({
        status: 'success',
        message: 'Product successfully added to cart',
        data: {
            cart_item
        }
    })
})

exports.getCart = catchAsync(async (req, res, next) => {
    let user_id = req.user._id

    // user_id has type of mongoose.Schema.ObjectId, in order to get result, we need to convert it to ObjectId
    user_id = new mongoose.Types.ObjectId(user_id);

    const user_cart = await Cart
        .aggregate([
            { $match: { user_id: { $eq: user_id } } },
            {
                "$lookup": {
                    // foreignField is located in the from table
                    from: 'cart_items', localField: '_id', foreignField: 'cart_id', as: 'cart_items',
                    pipeline: [
                        {
                            $lookup: {
                                from: "products",
                                localField: "product_id",
                                foreignField: "_id",
                                as: "product"
                            },
                        },
                    ],
                    as: "cart_items"
                },

            },

            {
                $project: {
                    "_id": 0,
                    "cart_items._id": 1,
                    "cart_items.amount": 1,
                    "cart_items.total_amount": 1,
                    "cart_items.quantity": 1,
                    "cart_items.product.name": 1,
                    "cart_items.product.images": 1,
                }
            }

        ])

    return res.status(200).json({
        status: 'success',
        results: user_cart.cart_items?.length,
        data: {
            user_cart
        }
    })
})

exports.delete = catchAsync(async (req, res, next) => {
    const { cart_items } = req.body

    const user_id = req.user._id

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