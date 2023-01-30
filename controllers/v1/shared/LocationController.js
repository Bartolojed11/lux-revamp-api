const Region = require(`${process.cwd()}/models/regionModel`)
const Province = require(`${process.cwd()}/models/provinceModel`)
const City = require(`${process.cwd()}/models/cityModel`)
const Barangay = require(`${process.cwd()}/models/brgyModel`)

const catchAsync = require(`${process.cwd()}/handlers/CatchAsync`)

exports.getRegions = catchAsync(async function (req, res, next) {
    const regions = await Region.find().sort({
        region_code: 1
    })

    return res.status(200).json({
        status: 'success',
        results: regions.length,
        data: {
            regions
        }
    })
})

exports.getRegionProvinces = catchAsync(async function (req, res, next) {
    let { region_code } = req.params
    let provinces = await Province.find({
        region_code: {
            $eq: region_code
        }
    }).sort({
        province_name: 1
    })

    return res.status(200).json({
        status: 'success',
        results: provinces.length,
        data: {
            provinces,
        }
    })
})

exports.getProvinceCities = catchAsync(async function (req, res, next) {
    let { province_code } = req.params
    const cities = await City.find({
        province_code
    }).sort({
        city_name: 1
    })

    return res.status(200).json({
        status: 'success',
        results: cities.length,
        data: {
            cities
        }
    })
})

exports.getCitiesBrgy = catchAsync(async function (req, res, next) {
    let { city_code } = req.params
    const barangays = await Barangay.find({
        city_code
    }).sort({
        brgy_name: 1
    })

    return res.status(200).json({
        status: 'success',
        results: barangays.length,
        data: {
            barangays
        }
    })
})
