const express = require('express')
const router = express.Router()

const authController = require(`${process.cwd()}/controllers/v1/AuthController`)

router.post('/signup', authController.signup)
router.post('/login', authController.login)
router.post('/forgotPassword', authController.forgotPassword)
router.patch('/updatePassword', authController.protect, authController.updatePassword)
router.patch('/resetPassword/:token', authController.resetPassword)

module.exports = router
