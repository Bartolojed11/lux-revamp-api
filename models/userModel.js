const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')

const UserSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: [true, 'Please tell us your first name']
    },
    last_name: {
        type: String,
        required: [true, 'Please tell us your last name']
    },
    email: {
        type: String,
        required: [true, 'Please provide your email address'],
        unique: true,
        validate: [
            validator.isEmail,
            'Please provide a valid email address'
        ]
    },
    phone_number: {
        type: String,
        // required: [true, 'Please provide your phone number'],
    },
    photo: {
        type: String
    },
    password: {
        type: String,
        required: [true, 'Please provide your password'],
        minlength: 8,
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        minlength: 8,
        select: false,
        validate: {
            // This will only work on SAVE and Create, so on update, we must use .save()
            validator: function (val) {
                return val === this.password
            },
            message: 'Password not match!'
        }
    },
    role: {
        type: String,
        enum: ['admin', 'customer', 'seller'],
        default: 'customer'
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        default: 'other'
    },
    birthday: {
        type: Date
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'on-vacation'],
        default: 'active'
    },
    addresses: [{
        type: Array,
        _id: {
            type:  mongoose.Schema.ObjectId,
            required: true,
            unique: true
        },
        region: {
            type: mongoose.Schema.ObjectId,
            ref: 'regions',
            required: [true, 'Please select a region']
        },
        province: {
            type: mongoose.Schema.ObjectId,
            ref: 'provinces',
            required: [true, 'Please select a province']
        },
        city: {
            type: mongoose.Schema.ObjectId,
            ref: 'cities',
            required: [true, 'Please select a city']
        },
        brgy: {
            type: String
        },
        postal_code: {
            type: Number
        },
        additional_address: {
            type: String
        },
        default: false
    }],
    passwordChangeAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date
})

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    // by default, 10 is used. But here we used 12 instead to make it more secure
    // .hash is an async function
    this.password = await bcrypt.hash(this.password, 12)
    // passwordConfirm is just used for model validation but we don't wan't it on the database
    this.passwordConfirm = undefined
    next()
})


UserSchema.pre('save', async function (next) {
    if (!this.isModified('password') || this.isNew) return next()
    // We subtract one second here because sending json request is much faster than saving to the database
    // We need to do this since we have a checking if password is already changed
    this.passwordChangeAt = Date.now() - 1000
    next()
})


/**
 * userPassword = Stored on db, candidatePassword = password inputted
 * UserSchema.methods.correctPassword = use to define a method for UserSchema
 */
UserSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword)
}

UserSchema.methods.changePasswordAfter = async function (JWTTimestamp) {
    if (this.passwordChangeAt) {
        const changeTimeStamp = parseInt(this.passwordChangeAt.getTime() / 1000, 10)
        return JWTTimestamp < changeTimeStamp
    }

    return false
}

UserSchema.methods.createPasswordResetToken = async function () {
    const resetToken = crypto.randomBytes(32).toString('hex')

    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000

    return resetToken
}

const User = mongoose.model('User', UserSchema)

module.exports = User