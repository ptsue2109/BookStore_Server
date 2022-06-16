const mongoose = require("mongoose");
const Sliders = new mongoose.Schema({
    slideName: { type: String, required: true },
    URL: { type: String },
    image: {type: String}
})
module.exports = mongoose.model("Sliders", Sliders);