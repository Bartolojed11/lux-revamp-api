const mongoose = require('mongoose')

const User = require(`${process.cwd()}/models/userModel`)
const Region = require(`${process.cwd()}/models/regionModel`)
const Province = require(`${process.cwd()}/models/provinceModel`)
const City = require(`${process.cwd()}/models/cityModel`)
const Barangay = require(`${process.cwd()}/models/brgyModel`)

const catchAsync = require(`${process.cwd()}/handlers/CatchAsync`)
const AppError = require(`${process.cwd()}/handlers/AppError`)


exports.validateAddress = catchAsync(async function (req, res, next) {
    const { region_code, province_code, city_code, brgy_code } = req.body

    const region = await Region.findOne({ region_code }).select('region_name region_code -_id');
    const province = await Province.findOne({ province_code }).select('province_name province_code -_id');
    const city = await City.findOne({ city_code }).select('city_name city_code -_id');
    const brgy = await Barangay.findOne({ brgy_code }).select('brgy_name brgy_code -_id');

    if (region === null || province === null || city === null) {
        return next(new AppError('Invalid address'))
    }

    req.address = {
        region,
        province,
        city,
        brgy
    }

    next()
})

exports.addAddress = catchAsync(async function (req, res, next) {
    const { user } = req
    const { address } = req
    const { is_default } = req.body
    const { region_name, region_code } = address.region
    const { province_name, province_code } = address.province
    const { city_name, city_code } = address.city
    const brgy_name = address?.brgy?.brgy_name || null
    const brgy_code = address?.brgy?.brgy_code || null

    user.addresses.push({
        _id: mongoose.Types.ObjectId(),
        region_name,
        province_name,
        city_name,
        brgy_name,
        region_code,
        province_code,
        city_code,
        brgy_code,
        default: is_default || false
    })

    await user.save()

    return res.status(200).json({
        status: 'success',
        message: 'Address added successfully',
        data: {
            "address" : user.addresses
        }
    })

})

exports.updateAddress = catchAsync(async function (req, res, next) {
    let { user } = req
    const { region_id, city_id, province_id } = req.body
    let { id } = req.params
    id = new mongoose.Types.ObjectId(id)


    const updateAddress = user.addresses.map((address, ndx) => {
        if (address[0]._id.equals(id)) {
            return { ...address[0], region_id: region_id, city_id: city_id, province_id: province_id }
        } else {
            return { ...address[0] }
        }
    })

    user.addresses = updateAddress

    await user.save()


    return res.status(200).json({
        status: 'success',
        message: 'Address updated successfully',
        data: {
            "address" : user.addresses
        }
    })

})

exports.deleteAddress = catchAsync(async function (req, res, next) {
    let { user } = req
    let { id } = req.params
    id = new mongoose.Types.ObjectId(id)

    const updateAddress = user.addresses.filter((address, ndx) => {
        return !address[0]._id.equals(id)
    })


    user.addresses = updateAddress

    await user.save()


    return res.status(200).json({
        status: 'success',
        message: 'Address deleted successfully',
        data: {
            user
        }
    })

})

exports.getUserAddress = catchAsync(async function (req, res, next) {
    let { _id } = req.user
    const addressList = await User.find({ _id }).select('addresses')

    return res.status(200).json({
        status: 'success',
        data: {
            "address": addressList[0]?.addresses
        }
    })
});

exports.getDefaultShippingAddress = catchAsync(async function (req, res, next) {
    let { _id } = req.user
    const addressList = await User.find({ _id }).select('addresses')
    const defaultAddress = addressList[0]?.addresses?.filter((address) => {
        return address.default
    });

    return res.status(200).json({
        status: 'success',
        data: {
            defaultAddress: defaultAddress[0] || {}
        }
    })
});
