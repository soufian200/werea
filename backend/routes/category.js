const express = require("express");
const Book = require("../models/Book");
const router = express.Router();
const _ = require("lodash");
const Category = require("../models/Category");
const { getByCategory } = require("../utils/funs");
const CategoryValidator = require("../models/CategoryValidator");

// router.get("/", async (req, res) => {
//   const categories = await getByCategory(req.query.c);
//   return res.send({ categories });
// });

router.get("/", async (req, res) => {
  // const categories = await
  const { g, t, c, skip, limit } = req.query;
  if (g == "true") {
    const categories = await Category.find().select("title");
    // console.log(categories);
    return res.send(categories);
  } else if (c && t) {
    const bs = await Book.find({ category: c, type: t })
      .select("cover title")
      .skip(Number(skip))
      .limit(Number(limit));
    // console.log(skip);
    // console.log(limit);
    // console.log(bs);
    return res.send(bs);
  }
  return res.status(404).send({ err: "not found" });
});

router.delete("/remove/:t", async (req, res) => {
  // check if id fouded
  const { t } = req.params;
  const e = await Category.findOne({ title: t });
  if (!e) return res.status(404).send({ err: "category not found" });

  const category = await Category.deleteOne({ title: t });
  // console.log(Category);
  return res
    .status(200)
    .send({ status: 200, msg: "category has been deleted" });
});

router.post("/add", async (req, res) => {
  // 1. get data and validate it
  const category = req.body;
  const { error, value } = CategoryValidator(category);
  if (error) return res.status(400).send({ err: error.details[0].message });

  // 2. check if category exists
  const e = await Category.findOne({ title: value.category });
  if (e) return res.status(400).send({ msg: "category already exists" });

  // 3. save category
  const c = new Category({ title: value.category });
  await c.save();
  console.log(_.pick(c, ["_id", "title"]));
  return res.send({
    msg: "category created",
    category: _.pick(c, ["_id", "title"]),
  });
});

module.exports = router;
