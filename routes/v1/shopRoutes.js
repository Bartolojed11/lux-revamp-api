const express = require('express')
const router = express.Router()

const shopController = require('./../../controllers/v1/ShopController')
const authController = require('./../../controllers/v1/AuthController')

router
    .route('/')
    .get(shopController.getShops)
    .post(authController.protect, authController.restrictTo('admin'), shopController.createShop)

router
    .route('/:id')
    .get(shopController.getShop)
    .patch(authController.protect, authController.restrictTo('admin', 'seller'), shopController.createShop)
    .delete(authController.protect, authController.restrictTo('admin', 'seller'), shopController.deleteShop)

module.exports = router
