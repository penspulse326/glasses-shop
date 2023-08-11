const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");
require("dotenv").config();
const comment = require("./models/comment");

// mongoDB connect
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Atlas is connected.");
  })
  .catch((err) => {
    console.log(err);
  });

// middleware
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(flash());

// router
app.get("/", (req, res) => {
  res.render("index", { message: req.flash("message")[0] });
});

app.post("/", async (req, res) => {
  const { username, phone, email, content } = req.body;

  const newComment = new comment({
    username,
    phone,
    email,
    content,
  });

  try {
    await newComment
      .save()
      .then(() => {
        console.log("A new comment is saved in DB.");
        req.flash(
          "message",
          "您的意見回饋我們已收到！待工作人員審閱後會再與您聯繫。"
        );
        res.redirect("/");
      })
      .catch((err) => {
        console.log(err);
        req.flash("message", "系統發生未知錯誤，請稍後再發送表單。");
        res.redirect("/");
      });
  } catch (e) {
    req.flash("message", "系統發生未知錯誤，請稍後再發送表單。");
    res.redirect("/");
    next(e);
  }
});

app.get("/product", (req, res) => {
  res.render("product");
});

app.get("/product-2", (req, res) => {
  res.render("product-2");
});

app.get("/branch", (req, res) => {
  res.render("branch");
});

app.get("/branch/location/:id", (req, res) => {
  res.render("store");
});

app.get("/blog", (req, res) => {
  res.render("blog");
});

app.get("/blog/article/:id", (req, res) => {
  res.render("article");
});

app.get("/faq", (req, res) => {
  res.render("faq");
});

app.listen(8080, () => {
  console.log("Server is running on port 8080.");
});
