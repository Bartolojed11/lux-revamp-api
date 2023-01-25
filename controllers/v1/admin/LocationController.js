const Region = require(`${process.cwd()}/models/regionModel`)
const Province = require(`${process.cwd()}/models/provinceModel`)
const City = require(`${process.cwd()}/models/cityModel`)
const Brgy = require(`${process.cwd()}/models/brgyModel`)

const catchAsync = require(`${process.cwd()}/handlers/CatchAsync`)
const AppError = require(`${process.cwd()}/handlers/AppError`)
const fs = require('fs');

exports.initialize = catchAsync(async function(req, res, next) {
    await initRegions();
    await initProvinces();
    await initCities();
    await initBrgy();

    return res.status(200).json({
        status: 'success',
        message: 'Locations initialized successfully!',
    })
})

const initRegions = catchAsync(async function(req, res, next) {
    let regions = fs.readFileSync(`${process.cwd()}/ph-json/region.json`, 'utf8');
    await Region.deleteMany({})
    await Region.insertMany(JSON.parse(regions))
})

const initProvinces = catchAsync(async function(req, res, next) {
    let provinces = fs.readFileSync(`${process.cwd()}/ph-json/province.json`, 'utf8');
    await Province.deleteMany({})
    await Province.insertMany(JSON.parse(provinces))
})

const initCities = catchAsync(async function(req, res, next) {
    let cities = fs.readFileSync(`${process.cwd()}/ph-json/city.json`, 'utf8');
    await City.deleteMany({})
    await City.insertMany(JSON.parse(cities))
})

const initBrgy = catchAsync(async function(req, res, next) {
    let brgys = fs.readFileSync(`${process.cwd()}/ph-json/barangay.json`, 'utf8');
    await Brgy.deleteMany({})
    await Brgy.insertMany(JSON.parse(brgys))
})

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