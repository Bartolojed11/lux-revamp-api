const express = require('express')
const router = express.Router()

const categoryController = express.Controller = require('./../../controllers/v1/CategoryController')
const authController = require('./../../controllers/v1/AuthController')

router
    .route('/')
    .get(categoryController.getCategories)
    .post(authController.protect, authController.restrictTo('admin'), categoryController.createCategory)

router
    .route('/:id')
    .get(categoryController.getCategory)
    .patch(authController.protect, authController.restrictTo('admin'), categoryController.createCategory)
    .delete(authController.protect, authController.restrictTo('admin'), categoryController.deleteCategory)

module.exports = router
