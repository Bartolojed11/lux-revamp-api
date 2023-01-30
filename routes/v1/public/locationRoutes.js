const express = require('express')
const LocationController = require(`${process.cwd()}/controllers/v1/shared/LocationController`)

const router = express.Router()

router
    .route('/regions')
    .get(LocationController.getRegions)

router
    .route('/province/:region_code')
    .get(LocationController.getRegionProvinces)

router
    .route('/cities/:province_code')
    .get(LocationController.getProvinceCities)

router
    .route('/barangay/:city_code')
    .get(LocationController.getCitiesBrgy)

module.exports = router