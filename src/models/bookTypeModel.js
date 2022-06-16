const mongoose = require("mongoose");
const BookType = new mongoose.Schema({
    bookTypeName: { type: String, required: true },
})
module.exports = mongoose.model("BookType", BookType);