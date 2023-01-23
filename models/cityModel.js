const mongoose = require('mongoose');

const citySchema = mongoose.Schema({
    city_code: {
        type: String,
        required: [true, 'Please provide a valid city code']
    },
    city_name: {
        type: String,
        required: [true, 'Please provide a valid city name']
    },
    province_code: {
        type: String,
        required: [true, 'Please provide a valid province code']
    },
    psgc_code: {
        type: String,
        required: [true, 'Please provide a valid psgc code']
    },
    region_code: {
        type: String,
        required: [true, 'Please provide a valid region code']
    }
})

const cityModel = mongoose.model('City', citySchema)

module.exports = cityModel