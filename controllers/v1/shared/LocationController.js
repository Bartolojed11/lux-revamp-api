const mongoose = require('mongoose')

const Region = require(`${process.cwd()}/models/regionModel`)
const Province = require(`${process.cwd()}/models/provinceModel`)
const City = require(`${process.cwd()}/models/cityModel`)

const catchAsync = require(`${process.cwd()}/handlers/CatchAsync`)

exports.getRegions = catchAsync(async function (req, res, next) {
    const regions = await Region.find()
    let provinces = {}
    let cities = {}

    if (regions[0] !== undefined) {
        provinces = await Province.find({
            region_id: new mongoose.Types.ObjectId(regions[0]._id)
        })

        if (provinces[0] !== undefined) {
            cities = await City.find({
                province_id: new mongoose.Types.ObjectId(provinces[0]._id)
            })
        }
    }


    return res.status(200).json({
        status: 'success',
        results: regions.length,
        data: {
            regions,
            provinces,
            cities
        }
    })
})

exports.getRegionsProvinces = catchAsync(async function (req, res, next) {
    let { region_id } = req.params
    let cities = {}

    region_id = new mongoose.Types.ObjectId(region_id)
    const provinces = await Province.find({
        region_id
    })

    if (provinces[0] !== undefined) {
        cities = await City.find({
            province_id: new mongoose.Types.ObjectId(provinces[0]._id)
        })
    }

    return res.status(200).json({
        status: 'success',
        results: provinces.length,
        data: {
            provinces,
            cities
        }
    })
})

exports.getProvinceCities = catchAsync(async function (req, res, next) {
    let { province_id } = req.params

    province_id = new mongoose.Types.ObjectId(province_id)
    const cities = await City.find({
        province_id
    })

    return res.status(200).json({
        status: 'success',
        results: cities.length,
        data: {
            cities
        }
    })
})