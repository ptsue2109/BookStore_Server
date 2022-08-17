const mongoose = require("mongoose");
const Sliders = mongoose.Schema({
    slideName: { type: String, required: true },
    URL: { type: String },
    image: {type: Object},
    status: {type: String, enum: ["active", "hidden"],default:"active"}
},{timestamps:true})
module.exports = mongoose.model("Sliders", Sliders);