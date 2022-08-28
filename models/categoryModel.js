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
    },
    image: {
        type: String
    }
})


CategorySchema.index({ name: 1, })

const Category = mongoose.model('Category', CategorySchema)

module.exports = Category