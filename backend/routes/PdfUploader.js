const express = require("express");
const router = express.Router();
const Book = require("../models/Book");
const multer = require("multer");
const { getExtention } = require("../utils/funs");
const url = "assets/books/pdfs";
const path = require("path");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    var ext = path.extname(file.originalname);
    if (ext === ".pdf") {
      return cb(null, url);
    }
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.originalname.substring(0, file.originalname.length - 4) +
        "-" +
        Date.now() +
        "__iread.com__" +
        getExtention(file.originalname)
    );
  },
});

var upload = multer({ storage });

router.post("/", upload.single("pdffile"), async (req, res, next) => {
  return res.send({ msg: "ok", path: req.file.path.substr("assets".length) });
});

module.exports = router;
