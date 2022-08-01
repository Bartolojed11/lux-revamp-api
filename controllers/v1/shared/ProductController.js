const { request } = require("../../../app")

const Product = require(`${process.cwd()}/models/productModel`)
const catchAsync = require(`${process.cwd()}/handlers/CatchAsync`)

const Filtering = require(`${process.cwd()}/helpers/Filtering`)

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
    let url = req.url.split('?')
    url = url[1] || ''
    let allowedFields = ['name', 'price']
    let filterValues = []
    let filters = []
    let field = ''

    if (url !== '') {
        url = url.split('&')
        for (const query of url) {
            field = query.split('=')[0] || ''
            if (allowedFields.includes(field)) {
                filterValues = [...filterValues, query.split('=')[1]]
                filters = [...filters, query.split('=')[0]]
            }
        }
    }

    req.allowedFields = allowedFields
    req.filters = filters
    req.filterValues = filterValues

    const model = new Filtering(Product, req).filter().selectedFields()
    const products = await model.query

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
