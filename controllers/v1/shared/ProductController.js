const Category = require(`${process.cwd()}/models/categoryModel`)
const catchAsync = require(`${process.cwd()}/handlers/CatchAsync`)

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