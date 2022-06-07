const express = require('express')
const router = express.Router()

const productController = express.Controller = require('../../controllers/v1/ProductController')
const authController = require('../../controllers/v1/AuthController')

router
    .route('/')
    .get(productController.getProducts)
    .post(
        // authController.protect,
        // authController.restrictTo('admin', 'seller'),
        productController.uploadImgToBuffer,
        // productController.fileFilter,
        productController.resizeAndUploadImg,
        productController.createProduct
    )

router
    .route('/:id')
    .get(productController.getProduct)
    .patch(authController.protect, authController.restrictTo('admin', 'seller'), productController.createProduct)
    .delete(authController.protect, authController.restrictTo('admin', 'seller'), productController.deleteProduct)

module.exports = router