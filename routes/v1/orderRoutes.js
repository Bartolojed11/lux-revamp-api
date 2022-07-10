const express = require('express')
const orderController = require('./../../controllers/v1/OrderController')
const authController = require('./../../controllers/v1//AuthController')

const router = express.Router()

router
    .route('/')
    .post(
        // authController.protect,
        // authController.restrictTo('customer'),
        orderController.placeOrder
    )

router
        .route('/:user_id')
        .get(
            // authController.protect,
            // authController.restrictTo('customer'),
            orderController.getOrders
        )

router
    .route('/:ref_num')
    .get(
        // authController.protect,
        // authController.restrictTo('customer'),
        orderController.getOrder
    )
    .patch(
        // authController.protect,
        // authController.restrictTo('customer'),
        orderController.cancelOrder
    )

module.exports = router




