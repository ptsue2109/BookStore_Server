const mongoose = require("mongoose");
import slug from "mongoose-slug-generator";
const { ObjectId } = mongoose.Types;
const productSchema = new mongoose.Schema({
    name: {type:String,required:true},
    image:  {type:String},
    imageMutiple: {type: Object},
    authorId: {type: ObjectId, ref: "Author"},
    targetId: {type: ObjectId, ref: "Target"},
    bookSizeId: {type: ObjectId, ref: "BookSize"},
    bookTypeId: {type: ObjectId, ref: "BookType"},
    bookWeight: {type: Number},
    pageNumber:  {type: Number},
    cost: {type: Number},
    desc: {type: String},
    categoryId: {type: ObjectId, ref: "Category"},
    slug: {type: String, slug: 'name', unique: true},
    stock : {type: Number, required: true},
    // quantity:{type:Number,default:0},
    // price:{type:Number,default:0}
})

mongoose.plugin(slug);
module.exports = mongoose.model("Product", productSchema);