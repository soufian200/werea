require("express-async-errors");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const winston = require("winston");
require("winston-mongodb");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const app = express("app");
const Book = require("./models/Book");

// routes
const bookRouter = require("./routes/book");
const CategoryRouter = require("./routes/category");
const coverUploaderRouter = require("./routes/coverUploader");
const pdfUploadRouter = require("./routes/PdfUploader");
const DashboardRouter = require("./routes/dashboard");
const AuthRouter = require("./routes/auth");

// models
const { getByCategory } = require("./utils/funs");
const _ = require("lodash");
const error = require("./middlewares/error");


  
//   middlewares
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("assets"));
if ((process.env.NODE_ENV == "development")) app.use(morgan("tiny"));



 /**
 * CONNECT DATABASE
 * */
let db = process.env.NODE_ENV === "production" ? process.env.DB_NAME: process.env.LOCAL_DB;

mongoose
  .connect(db,{ useUnifiedTopology: true ,useCreateIndex:true,useUnifiedTopology:false, useUnifiedTopology: true ,useNewUrlParser: true })
  .then(() => console.log("connected...."))
  .catch((err) => {console.error("connection failed...");console.log(err)});

  /**
 * LOGGER
 * */
winston.add(
  new winston.transports.File({ filename: "logfile.log", timestamp: true })
);
winston.add(
  new winston.transports.MongoDB({ db })
);



app.use("/upload-cover", coverUploaderRouter);
app.use("/pdf-uploader", pdfUploadRouter);
app.use("/b", bookRouter);
app.use("/categories", CategoryRouter);
app.use("/s/dash", DashboardRouter);
app.use("/auth", AuthRouter);




app.get("/pendings", async (req, res) => {
  const pending = await Book.find({ isActive: false }).select(
    "cover title author dateCreated"
  );
  return res.send({ pending, status: 200 });
});

app.get("/home", async (req, res) => {
  let context = {};

  const explore = await Book.find().select("cover title");
  const education = await getByCategory("education", 5 * 2);
  const history = await getByCategory("history", 6);

  context.history = _.shuffle(history);
  context.education = _.shuffle(education);
  context.explore = _.shuffle(explore);

  return res.send({ context });
});

app.get("/search", async (req, res) => {
  if (req.query.q) {
    const search = await Book.find({
      title: new RegExp("@".replace("@", req.query.q, "ig")),
    }).select("title cover");
    return res.send({ search });
  } else if (req.query.query) {
    const search = await Book.find({
      title: new RegExp("@".replace("@", req.query.query, "ig")),
    }).select("-isActive -__v");
    return res.send({ search });
  }
});

app.get("/download/:id", async (req, res) => {
  const b = await Book.findById(req.params.id);
  if (!b) return res.status(404).send({ err: "book not found" });

  const x = __dirname + "/assets/" + b.pdfPath;
  res.download(x);
});

app.get("/explore", async (req, res) => {
  const limit = 15;
  const { page } = req.query;
  if (page) {
    const items = await Book.find({ isActive: true })
      .select("cover title")
      .skip(limit * (Number(page) - 1))
      .limit(limit);
    return res.send({ items });
  } else {
    return res.status(404).send({ err: "page not found" });
  }
});

app.use(error);
const port = process.env.PORT || 4001;
app.listen(port, () => console.log(`listening on port ${port}`));
