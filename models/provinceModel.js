const mongoose = require('mongoose')

const ProvinceSchema = mongoose.Schema({
    name: {
        type: String,
        required: ['Please provide a valid province name'],
        unique: true
    },
    region_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'regions',
        required: [true, 'Please provide a valid region Id']
    }
})

// 
const ProvinceModel = mongoose.model('Province', ProvinceSchema)

module.exports = ProvinceModel