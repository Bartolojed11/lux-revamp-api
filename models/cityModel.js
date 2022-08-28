const mongoose = require('mongoose');

const citySchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    province_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'provinces',
        required: [true, 'Please provide a valid province Id']
    }
})

const cityModel = mongoose.model('City', citySchema)

module.exports = cityModel