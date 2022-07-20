const mongoose = require("mongoose");
import slug from "mongoose-slug-generator";

const Brand = new mongoose.Schema({
    brandName: { type: String, required: true },
    image: { type: String },
    status: { type: String, enum: ["active", "hidden"],default:"active" },
    slug: { type: String, slug: 'brandName', unique: true },
},{timestamps:true})

mongoose.plugin(slug);
module.exports = mongoose.model("Brand", Brand)