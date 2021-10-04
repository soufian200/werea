const express = require("express");
const Book = require("../models/Book");
const router = express.Router();
const _ = require("lodash");

const limit = 10;
async function objFind(ob, skip) {
  const bs = await Book.find(ob)
    .select("-__v -isActive")
    .skip(skip)
    .limit(limit);
  return bs;
}

router.get("/h", async (req, res) => {
  const { page } = req.query;
  const skip = (Number(page) - 1) * limit;
  const bs = await objFind({ isActive: true }, skip);
  return res.send({ count: bs.length, books: bs });
});

router.get("/pagination", async (req, res) => {
  const { active } = req.query;
  const bs = await Book.find({ isActive: active });
  return res.send({ pages: Math.ceil(bs.length / limit) });
});

/**
 * DELETE BOOK
 * */

router.delete("/b/delete/:id", async (req, res) => {
  const { id } = req.params;
  const r = await Book.deleteOne({ _id: id });

  return res.send({
    msg: "book has been deleted successfully",
    operation: "delete",
  });
});

router.get("/p", async (req, res) => {
  const { page } = req.query;
  const skip = (Number(page) - 1) * limit;
  const bs = await objFind({ isActive: false }, skip);
  return res.send({ count: bs.length, books: bs });
});

router.patch("/p/activate/:id", async (req, res) => {
  const { id } = req.params;
  const val = req.body;

  const eb = await Book.updateOne({ _id: id }, { $set: val });

  return res.send({
    msg: "book has been activated successfully",
    operation: "activate",
  });
});

router.get("/b", async (req, res) => {
  const bs = await objFind({ isActive: true, type: "book" });
  return res.send({ count: bs.length, books: bs });
});

router.get("/n", async (req, res) => {
  const bs = await objFind({ isActive: true, type: "novel" });
  return res.send({ count: bs.length, books: bs });
});
router.get("/a", async (req, res) => {
  const bs = await objFind({ isActive: true, type: "audio" });
  return res.send({ count: bs.length, books: bs });
});

router.get("/status", async (req, res) => {
  const pendings = await Book.find({ isActive: false });
  const books = await Book.find({ isActive: true, type: "book" });
  const novels = await Book.find({ isActive: true, type: "novel" });
  const audio = await Book.find({ isActive: true, type: "audio" });

  return res.send({
    status: [
      { title: "books", counts: books.length },
      { title: "pendings", counts: pendings.length },
      { title: "novels", counts: novels.length },
      { title: "audio", counts: audio.length },
    ],
  });
});

module.exports = router;
