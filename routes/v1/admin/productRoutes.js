const express = require('express')
const router = express.Router()

const productController = require(`${process.cwd()}/controllers/v1/admin/ProductController`)
const sharedProductController = require(`${process.cwd()}/controllers/v1/shared/ProductController`)
const authController = require(`${process.cwd()}/controllers/v1/AuthController`)

router
    .route('/')
    .get(sharedProductController.getProducts)
    .post(
        // authController.protect,
        // authController.restrictTo('admin'),
        productController.uploadImgToBuffer,
        // productController.fileFilter,
        productController.resizeAndUploadImg,
        productController.createProduct
    )

router
    .route('/:id')
    .get(sharedProductController.checkGetProductParam, sharedProductController.getProduct)
    .patch(authController.protect, authController.restrictTo('admin'), productController.createProduct)
    .delete(authController.protect, authController.restrictTo('admin'), productController.deleteProduct)

module.exports = router