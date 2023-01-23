const mongoose = require('mongoose')

const ProvinceSchema = mongoose.Schema({
    province_code: {
        type: String,
        required: ['Please provide a valid province code'],
        unique: true
    },
    province_name: {
        type: String,
        required: ['Please provide a valid province name'],
    },
    region_code: {
        type: String,
        required: [true, 'Please provide a valid region code']
    },
    psgc_code: {
        type: String,
        required: ['Please provide a valid psg code']
    },
})

const ProvinceModel = mongoose.model('Province', ProvinceSchema)

module.exports = ProvinceModel