const mongoose = require('mongoose')

const User = require(`${process.cwd()}/models/userModel`)
const Region = require(`${process.cwd()}/models/regionModel`)
const Province = require(`${process.cwd()}/models/provinceModel`)
const City = require(`${process.cwd()}/models/cityModel`)

const catchAsync = require(`${process.cwd()}/handlers/CatchAsync`)
const AppError = require(`${process.cwd()}/handlers/AppError`)


exports.validateAddress = catchAsync(async function(req, res, next) {
    const { region_id, city_id, province_id } = req.body

    const region = await Region.findOne({
        _id: new mongoose.Types.ObjectId(region_id)
    })

    const province = await Province.findOne({
        _id: new mongoose.Types.ObjectId(province_id),
        region_id: new mongoose.Types.ObjectId(region_id)
    })

    const city = await City.findOne({
        _id: new mongoose.Types.ObjectId(city_id),
        province_id: new mongoose.Types.ObjectId(province_id)
    })


    if (region === null || province === null || city === null) {
        return next(new AppError('Invalid address'))
    }

    next()
})

exports.addAddress = catchAsync(async function(req, res, next) {
    let { user } = req
    const { region_id, city_id, province_id, is_default } = req.body
    const address_id = mongoose.Types.ObjectId();

    user.addresses.push({
        _id: address_id,
        region_id,
        city_id,
        province_id,
        default: is_default || false
    }) 

    
    await user.save()


    return res.status(200).json({
        status: 'success',
        data: {
            user
        }
    })

})

exports.updateAddress = catchAsync(async function(req, res, next) {
    let { user } = req
    const {  region_id, city_id, province_id } = req.body
    let { id } = req.params
    id = new mongoose.Types.ObjectId(id)
    
    
    const updateAddress = user.addresses.map((address, ndx) => {
        if (address[0]._id.equals(id)) {
            return {...address[0], region_id: region_id, city_id: city_id, province_id: province_id}
        } else {
            return {...address[0]}
        }
    })

    user.addresses = updateAddress

    await user.save()


    return res.status(200).json({
        status: 'success',
        data: {
            user
        }
    })

})

exports.deleteAddress = catchAsync(async function(req, res, next) {
    let { user } = req
    let { id } = req.params
    id = new mongoose.Types.ObjectId(id)
    
    const updateAddress = user.addresses.filter((address, ndx) => {
        return ! address[0]._id.equals(id)
    })


    user.addresses = updateAddress

    await user.save()


    return res.status(200).json({
        status: 'success',
        data: {
            user
        }
    })

})