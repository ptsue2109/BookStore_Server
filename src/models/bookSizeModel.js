const mongoose = require("mongoose");
const BookSize = new mongoose.Schema({
    bookSizeName: { type: String, required: true },
})
module.exports = mongoose.model("BookSize", BookSize);