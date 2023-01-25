const mongoose = require('mongoose');

const brgySchema = mongoose.Schema({
    brgy_code: {
        type: String,
        required: [true, 'Please provide a valid brgy code'],
        unique: true
    },
    brgy_name: {
        type: String,
        required: [true, 'Please provide a valid brgy name']
    },
    city_code: {
        type: String,
        required: [true, 'Please provide a valid city code']
    },
    province_code: {
        type: String,
        required: [true, 'Please provide a valid province code']
    },
    region_code: {
        type: String,
        required: [true, 'Please provide a valid region code']
    }
})

const brgyModel = mongoose.model('Barangay', brgySchema)

module.exports = brgyModel