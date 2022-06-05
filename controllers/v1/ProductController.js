const Product = require('./../../models/productModel')
const catchAsync = require('../../handlers/CatchAsync')

exports.getProducts = catchAsync(async (req, res, next) => {
    const products = await Product.find()

    res.status(200).json({
        status: 'success',
        results: products.length,
        data: {
            products
        }
    })
})

exports.createProduct = catchAsync(async (req, res, next) => {
    const newProduct = await Product.create(req.body)

    return res.status(200).json({
        status: 'success',
        message: 'Product created successfully',
        data: {
            newProduct
        }
    })
})

exports.getProduct = catchAsync(async (req, res, next) => {
    const product = await Product.find(req.params.id)

    return res.status(200).json({
        status: 'success',
        data: {
            product
        }
    })
})

exports.deleteProduct = catchAsync(async (req, res, next) => {
    const product = await Product.findByIdAndDelete(req.params.id)

    return res.status(200).json({
        status: 'success',
        message: 'Product deleted successfully'
    })
})

exports.updateProduct = catchAsync(async (req, res, next) => {
    const product = await Product.findByIdAndUpdate(req.params.id)

    return res.status(200).json({
        status: 'success',
        message: 'Product updated successfully',
        data: {
            product
        }
    })
})