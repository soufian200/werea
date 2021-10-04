const express = require("express");
const Book = require("../models/Book");
const router = express.Router();
const _ = require("lodash");

// const coverUploaderRouter = require("../routes/coverUploader");
// routes
const bookRouter = require("../routes/book");
const CategoryRouter = require("../routes/category");
const coverUploaderRouter = require("../routes/coverUploader");
const pdfUploadRouter = require("../routes/PdfUploader");
const DashboardRouter = require("../routes/dashboard");
const AuthRouter = require("../routes/auth");

app.use("/upload-cover", coverUploaderRouter);
app.use("/pdf-uploader", pdfUploadRouter);
app.use("/b", bookRouter);
app.use("/categories", CategoryRouter);
app.use("/s/dash", DashboardRouter);
app.use("/auth", AuthRouter);

module.exports = router;