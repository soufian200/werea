const Book = require("../models/Book");

async function getByCategory(category, limit = null, skip = 0) {
  return await Book.find({ category, isActive: true })
    .select("cover title")
    .skip(skip)
    .limit(limit);
}

function getExtention(f) {
  const a = f.split(".");
  return "." + a[a.length - 1];
}

module.exports = { getByCategory, getExtention };
