const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: { type: String, required: true, minLength: 3 },
  author: { type: String, required: true },
  year: { type: Number, required: true },
  publicationName: String,
  image: String,
  copiesAvailable: { type: Number, required: true },
});

module.exports = mongoose.model("Book", bookSchema);
