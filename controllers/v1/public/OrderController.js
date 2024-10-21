const Order = require(`${process.cwd()}/models/ordersModel`);
const Product = require(`${process.cwd()}/models/productModel`);
const Cart = require(`${process.cwd()}/models/cartModel`);
const CartItems = require(`${process.cwd()}/models/cartItemsModel`);

const AppError = require(`${process.cwd()}/handlers/AppError`);

const cartController = require(
    `${process.cwd()}/controllers/v1/public/CartController`,
);

const catchAsync = require(`${process.cwd()}/handlers/CatchAsync`);

const appConfig = require(`${process.cwd()}/config/app`);

const mongoose = require("mongoose");

async function getOrderTotalAmount(items = []) {
    let total_amount = 0;
    let product;

    for (const item of items) {
        product = await Product.findOne({ _id: item.product_id });
        total_amount += product.price * item.quantity;
    }

    return total_amount;
}

exports.placeOrder = catchAsync(async (req, res, next) => {
    const { user } = req;
    const { notes, delivery_address } = req.body;
    let { ordered_items } = req.body;
    let product = {};
    const name = user.first_name + user.last_name;

    let user_id = user._id;
    user_id = new mongoose.Types.ObjectId(user_id);

    let user_cart = await Cart.findOne({
        user_id: user_id,
    });

    let ref_num =
        Date.now().toString(36) + Math.random().toString(36).substr(6);
    ref_num = appConfig.ORDER_PREFIX + ref_num.toUpperCase(ref_num);

    let total_amount = await getOrderTotalAmount(ordered_items);

    let already_ordered = false;

    if (user_cart === null) already_ordered = true;

    let cart_item = {};

    // Check if this order is already placed
    if (user_cart !== null && !already_ordered) {
        const cart_id = new mongoose.Types.ObjectId(user_cart._id);
        for (const order_item of ordered_items) {
            cart_item = await CartItems.findOne({
                cart_id: cart_id,
                product_id: new mongoose.Types.ObjectId(order_item.product_id),
            });
            console.log("already_ordered", cart_item);
            if (cart_item === null) {
                already_ordered = true;
                break;
            }
        }
    }

    if (already_ordered) {
        throw new AppError("This cart is already ordered!");
    }

    for (const item of ordered_items) {
        item.product_id = new mongoose.Types.ObjectId(item.product_id);
        product = await Product.findOne({ _id: item.product_id });

        item.name = product.name;
        item.url = product.url;
    }

    const order = await Order.create({
        ref_num,
        user_id,
        name,
        notes,
        total_amount,
        ordered_items,
        delivery_address,
    });

    req.from_place_order = true;

    // Delete cart items that are being checkout
    await cartController.deleteCartItems(ordered_items, user_cart);

    return res.status(200).json({
        status: "success",
        message: "Order was successfully",
        data: {
            order,
        },
    });
});
