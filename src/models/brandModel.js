const mongoose = require("mongoose");
const slug = require ("mongoose-slug-generator");

const Brand = new mongoose.Schema({
    brandName: { type: String, required: true },
    image: { type:Object, required:true },
    status: { type: String, enum: ["active", "hidden"],default:"active" },
    slug: { type: String, slug: 'brandName', unique: true },
},{timestamps:true})

mongoose.plugin(slug);
module.exports = mongoose.model("Brand", Brand)