const mongoose = require("mongoose");
import slug from "mongoose-slug-generator";

const Category = new mongoose.Schema({
    cateName: { type: String, required: true },
    image: { type: String },
    status: { type: String, enum: ["active", "hidden"],default:"active" },
    slug: { type: String, slug: 'cateName', unique: true },
    desc: { type: String }
})

mongoose.plugin(slug);
module.exports = mongoose.model("Category", Category)