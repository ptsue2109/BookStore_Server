const mongoose = require("mongoose");
import slug from "mongoose-slug-generator";
const { ObjectId } = mongoose.Types;
const productSchema = new mongoose.Schema({
    name: {type:String,required:true},
    image:  {type:Object},
    brandId: {type: ObjectId, ref: "Brand"},
    categoryId: {type: ObjectId, ref: "Category"},
    cost: {type: Number},
    desc: {type: String},
    slug: {type: String, slug: 'name', unique: true},
    stock : {type: Number, required: true}
},{timestamps: true})

mongoose.plugin(slug);
module.exports = mongoose.model("Product", productSchema);