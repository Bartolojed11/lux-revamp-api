const express = require('express')
const orderController = require(`${process.cwd()}/controllers/v1/public/OrderController`)
const sharedOrderController = require(`${process.cwd()}/controllers/v1/shared/OrderController`)
const authController = require(`${process.cwd()}/controllers/v1/AuthController`)

const router = express.Router()

router
    .route('/')
    .post(
        authController.protect,
        authController.restrictTo('customer'),
        orderController.placeOrder
    )

router
    .route('/user')
    .get(
        authController.protect,
        authController.restrictTo('customer'),
        sharedOrderController.getUsersOrders
    )

router
    .route('/:ref_num')
    .get(
        authController.protect,
        authController.restrictTo('customer'),
        sharedOrderController.getOrder
    )
    .patch(
        authController.protect,
        authController.restrictTo('customer'),
        sharedOrderController.cancelOrder
    )

module.exports = router



