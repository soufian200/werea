const express = require("express");
const Book = require("../models/Book");
const router = express.Router();
const _ = require("lodash");

const BookValidator = require("../models/BookValidator");
const { getByCategory } = require("../utils/funs");

/**
 * GET THE BOOK BY ITS TITLE
 * */
router.get("/:title", async (req, res) => {
  if (req.params.title) {
    const book = await Book.findOne({
      title: req.params.title.replaceAll("-", " "),
    });
    if (!book) return res.status(404).send({ err: "book not found" });

    // more;
    let more = await getByCategory(book.category, 6);
    more = more.filter((i) => i.title != book.title);

    return res.send({
      book,
      more: _.shuffle(more),
    });
  } else if (req.params.id) {
  }
});

router.get("/", async (req, res) => {
  const book = await Book.findById(req.query.id).select(
    "-isActive -__v -cover"
  );
  if (!book) return res.status(404).send({ err: "book not found" });

  return res.send({
    book,
  });
});

/**
 * EDIT BOOK
 * */

router.put("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const val = req.body;
  // const eb = await Book.findOne({ title: val.title });
  // console.log(eb);
  // if (eb)
  //   return res.status(400).send({ err: "this book's title already exists" });

  const b = await Book.updateOne({ _id: id }, { $set: val });
  // console.log(b);
  // console.log(req.body);
  return res.send({ msg: "book has been updated" });
});

/**
 * ADD NEW BOOK
 * */
router.post("/new", async (req, res) => {
  // 1. get data and validate it
  const book = req.body;
  const { error, value } = BookValidator(book);
  if (error) return res.status(400).send({ err: error.details[0].message });

  // 2. check if book exists
  const e = await Book.findOne({ title: value.title });
  if (e)
    return res.status(400).send({ err: "this book's title already exists" });

  // -save book
  const nbook = new Book(value);
  nbook.save();
  return res.status(201).send({ msg: "book created", status: 201 });
});

module.exports = router;
