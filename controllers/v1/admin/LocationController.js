const Region = require(`${process.cwd()}/models/regionModel`)
const Province = require(`${process.cwd()}/models/provinceModel`)
const City = require(`${process.cwd()}/models/cityModel`)

const catchAsync = require(`${process.cwd()}/handlers/CatchAsync`)
const AppError = require(`${process.cwd()}/handlers/AppError`)


exports.addRegion = catchAsync(async function (req, res, next) {
    const { name, region_no } = req.body
    const region = await Region.create({
        name,
        region_no
    })

    return res.status(200).json({
        status: 'success',
        message: 'Region added successfully',
        data: {
            region
        }
    })
})

exports.addProvince = catchAsync(async function (req, res, next) {
    const { name, region_id } = req.body
    const province = await Province.create({
        name,
        region_id
    })

    return res.status(200).json({
        status: 'success',
        message: 'Province added successfully',
        data: {
            province
        }
    })
})

exports.addCity = catchAsync(async function (req, res, next) {
    const { name, province_id } = req.body
    const city = await City.create({
        name,
        province_id
    })

    return res.status(200).json({
        status: 'success',
        message: 'City added successfully',
        data: {
            city
        }
    })
})