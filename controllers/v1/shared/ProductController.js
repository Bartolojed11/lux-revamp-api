const { request } = require("../../../app")

const Product = require(`${process.cwd()}/models/productModel`)
const catchAsync = require(`${process.cwd()}/handlers/CatchAsync`)

exports.checkGetProductParam = function (req, res, next) {
    const { id, url } = req.params
    
    let condition = { _id: id }

    if (url !== undefined) {
        condition = { url: url }
    }

    req.get_product_condition = condition

    next()

}

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


exports.getProduct = catchAsync(async (req, res, next) => {
    const product = await Product.findOne(req.get_product_condition)

    return res.status(200).json({
        status: 'success',
        data: {
            product
        }
    })
})
