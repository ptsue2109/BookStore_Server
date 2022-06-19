const mongoose = require("mongoose");
import slug from "mongoose-slug-generator";
const Author = new mongoose.Schema({
    authorName: { type: String, required: true , unique: true},
    image:{type: String},
    slug: {type: String,slug: 'authorName'},
    desc: {type: String}
},{timestamps:true})
mongoose.plugin(slug);
module.exports = mongoose.model("Author", Author);