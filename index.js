const express = require("express");
const app = express();
const ejs = require("ejs");

// middleware
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
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
