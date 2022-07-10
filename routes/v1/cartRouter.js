const express = require('express')
const cartController = require('./../../controllers/v1/CartController')
const authController = require('./../../controllers/v1//AuthController')

const router = express.Router()

router
    .route('/')
    .get(
        // authController.protect,
        // authController.restrictTo('customer'),
        cartController.getCart
    )
    .post(
        // authController.protect,
        // authController.restrictTo('customer'),
        cartController.create
    )
    .delete(
        cartController.delete
    )

module.exports = router

