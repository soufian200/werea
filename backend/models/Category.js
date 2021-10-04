const mongoose = require("mongoose");

const Category = mongoose.model(
  "Category",
  new mongoose.Schema({ title: String })
);
module.exports = Category;
