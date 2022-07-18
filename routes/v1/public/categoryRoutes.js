const express = require('express')
const router = express.Router()

const sharedCategoryController = require(`${process.cwd()}/controllers/v1/shared/CategoryController`)
const authController = require(`${process.cwd()}/controllers/v1/AuthController`)

router
    .route('/')
    .get(sharedCategoryController.getCategories)

router
    .route('/:id')
    .get(sharedCategoryController.getCategory)

module.exports = router
