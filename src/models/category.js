const mongoose = require("mongoose");
const slug= require("mongoose-slug-generator");

const Category = new mongoose.Schema({
    cateName: { type: String, required: true },
    image: { type: Object, required: true },
    status: { type: String, enum: ["active", "hidden"],default:"active" },
    slug: { type: String, slug: 'cateName', unique: true },
    desc: { type: String }
},{timestamps:true})

mongoose.plugin(slug);
module.exports = mongoose.model("Category", Category)