const mongoose = require("mongoose");
const Sliders = mongoose.Schema({
    slideName: { type: String, required: true },
    URL: { type: String },
    image: {type: String}
},{timestamps:true})
module.exports = mongoose.model("Sliders", Sliders);