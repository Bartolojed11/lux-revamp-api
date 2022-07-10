const express = require('express')
const router = express.Router()

const categoryController = require(`${process.cwd()}/controllers/v1/admin/CategoryController`)
const sharedCategoryController = require(`${process.cwd()}/controllers/v1/shared/CategoryController`)
const authController = require(`${process.cwd()}/controllers/v1/AuthController`)

router
    .route('/')
    .get(sharedCategoryController.getCategories)
    .post(
        // authController.protect, 
        // authController.restrictTo('admin'), 
        categoryController.createCategory
    )

router
    .route('/:id')
    .get(sharedCategoryController.getCategory)
    .patch(authController.protect, authController.restrictTo('admin'), categoryController.updateCategory)
    .delete(authController.protect, authController.restrictTo('admin'), categoryController.deleteCategory)

module.exports = router
