const express = require('express')
const LocationController = require(`${process.cwd()}/controllers/v1/shared/LocationController`)

const router = express.Router()

router
    .route('/')
    .get(LocationController.getRegions)

router
    .route('/province/:region_id')
    .get(LocationController.getRegionsProvinces)

router
    .route('/cities/:province_id')
    .get(LocationController.getProvinceCities)


module.exports = router