const express = require('express')
const router = express.Router()

const sharedProductController = require(`${process.cwd()}/controllers/v1/shared/ProductController`)

router
    .route('/search/:keywords?')
    .get(sharedProductController.getProducts)

router
    .route('/:url')
    .get(sharedProductController.checkGetProductParam, sharedProductController.getProduct)

module.exports = router