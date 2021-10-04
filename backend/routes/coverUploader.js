const express = require("express");
const router = express.Router();
const Book = require("../models/Book");
const multer = require("multer");
const { getExtention } = require("../utils/funs");
const coverUrl = "assets/books";
const path = require("path");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const extentions = ["jpg", "png", "jpeg"];
    const isValid = extentions.find(
      (e) => "." + e == path.extname(file.originalname)
    );

    if (isValid) {
      cb(null, coverUrl);
    }
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + getExtention(file.originalname)
    );
  },
});

var upload = multer({ storage });

router.post("/", upload.single("cover"), async (req, res) => {
  return res.send({
    path: req.file.path.substr("assets".length),
  });
});

module.exports = router;
