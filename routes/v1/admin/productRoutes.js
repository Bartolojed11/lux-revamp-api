const express = require('express')
const router = express.Router()

const productController = require(`${process.cwd()}/controllers/v1/admin/ProductController`)
const authController = require(`${process.cwd()}/controllers/v1/AuthController`)

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