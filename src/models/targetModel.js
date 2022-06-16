const mongoose = require("mongoose");
import slug from "mongoose-slug-generator";
const Target = new mongoose.Schema({
    targetName: {type:String,required:true},
    slug: {type: String, slug: 'targetName', unique: true}
    
})

mongoose.plugin(slug);
module.exports = mongoose.model("Target", Target);