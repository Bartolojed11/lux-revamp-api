const mongoose = require('mongoose')

const CategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a category name'],
        unique: true
    },
    url: {
        type: String,
        required: [true, 'Please provide a category url'],
        unique: true
    },
    is_active: {
        type: Boolean,
        default: true
    }
})

const Category = mongoose.model('Category', CategorySchema)

exports.module = Category