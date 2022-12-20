const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    year: {
        type: Number,
        default: new Date().getFullYear(),
    },
    quanity: {
        type: String,
        default: 0,
    },
    imageURL: {
        type: String,
    }
})

module.exports = mongoose.model('Book', bookSchema)