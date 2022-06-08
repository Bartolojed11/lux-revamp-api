const express = require('express')
const orderController = require('./../../controllers/v1/OrderController')
const authController = require('./../../controllers/v1//AuthController')

const router = express.Router()

router
    .route('/')
    .get(
        authController.protect,
        authController.restrictTo('customer'),
        orderController.getOrders
    )
    .post(
        authController.protect,
        authController.restrictTo('customer'),
        orderController.createOrder
    )

router
    .route('/:ref_num')
    .get(
        authController.protect,
        authController.restrictTo('customer'),
        orderController.getOrder
    )
    .patch(
        authController.protect,
        authController.restrictTo('customer'),
        orderController.cancelOrder
    )

module.exports = router




