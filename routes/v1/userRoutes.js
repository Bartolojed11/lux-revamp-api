const express = require('express')
const router = express.Router()

const userController = require(`${process.cwd()}/controllers/v1/admin/UserController`)
const authController = require(`${process.cwd()}/controllers/v1/AuthController`)

router.post('/signup', authController.signup)
router.post('/login', authController.login)
router.post('/forgotPassword', authController.forgotPassword)
router.patch('/updatePassword', authController.protect, authController.updatePassword)
router.patch('/resetPassword/:token', authController.resetPassword)

router
    .route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser)

router
    .route('/:id')
    .get(userController.getUser)
    .patch(userController.createUser)
    .delete(userController.deleteUser)

module.exports = router
