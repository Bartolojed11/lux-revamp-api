const express = require('express')
const router = express.Router()

const userController = require(`${process.cwd()}/controllers/v1/public/UserController`)
const authController = require(`${process.cwd()}/controllers/v1/AuthController`)

router
    .route('/address')
    .post(userController.validateAddress, authController.protect, userController.addAddress)

router
    .route('/address/:id')
    .patch( authController.protect, userController.updateAddress)
    .delete( authController.protect, userController.deleteAddress)

module.exports = router