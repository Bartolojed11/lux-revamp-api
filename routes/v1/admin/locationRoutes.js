const express = require('express')

const LocationController = require(`${process.cwd()}/controllers/v1/admin/LocationController`)

const router = express.Router()

router
    .route('/region')
    .post(LocationController.addRegion)

router
    .route('/province')
    .post(LocationController.addProvince)

router
    .route('/city')
    .post(LocationController.addCity)

module.exports = router