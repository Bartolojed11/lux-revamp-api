const mongoose = require('mongoose')

const RegionSchema = mongoose.Schema({
    name: {
        type: String,
        required: ['Please provide a valid region name'],
        unique: true
    },
    region_no: {
        type: Number,
        required: [true, 'Please provide a valid region no.'],
        unique: true
    }
})

const RegionModel = mongoose.model('Region', RegionSchema)

module.exports = RegionModel