const mongoose = require('mongoose')

const RegionSchema = mongoose.Schema({
    psgc_code: {
        type: String,
        required: ['Please provide a valid psg code'],
        unique: true
    },
    region_name: {
        type: String,
        required: ['Please provide a valid region name'],
        unique: true
    },
    region_code: {
        type: String,
        required: [true, 'Please provide a valid region no.'],
        unique: true
    }
})

const RegionModel = mongoose.model('Region', RegionSchema)

module.exports = RegionModel