const Shop = require('./../../models/shopModel')
const catchAsync = require('../../handlers/CatchAsync')

exports.getShops = catchAsync(async (req, res, next) => {
    const shops = await Shop.find()

    res.status(200).json({
        status: 'success',
        results: shops.length,
        data: {
            shops
        }
    })
})

exports.createShop = catchAsync(async (req, res, next) => {
    const newShop = await Shop.create(req.body)

    return res.status(200).json({
        status: 'success',
        message: 'Shop created successfully',
        data: {
            newShop
        }
    })
})

exports.getShop = catchAsync(async (req, res, next) => {
    const shop = await Shop.find(req.params.id)

    return res.status(200).json({
        status: 'success',
        data: {
            shop
        }
    })
})

exports.deleteShop = catchAsync(async (req, res, next) => {
    const shop = await Shop.findByIdAndDelete(req.params.id)

    return res.status(200).json({
        status: 'success',
        message: 'Shop deleted successfully'
    })
})

exports.updateShop = catchAsync(async (req, res, next) => {
    const shop = await Shop.findByIdAndUpdate(req.params.id)

    return res.status(200).json({
        status: 'success',
        message: 'Shop updated successfully',
        data: {
            shop
        }
    })
})