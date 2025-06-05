const mongoose = require("mongoose")

const productoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    principalImage: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    isPrincipal: {
        type: Boolean,
        required: true
    },
})

module.exports = mongoose.model("Product", productoSchema)