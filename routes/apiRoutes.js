const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/example", (req, res) => {
  res.send("success");
});

router.get("/all", (req, res) => {
  db.Books.find().then(books => {
    res.send(books);
  });
});

router.post("/new", (req, res) => {
  db.Books.create({
    id: req.body.id,
    title: req.body.text,
    author: req.body.author,
    description: req.body.description,
    //image: req.body.image,
    link: req.body.link
  }).then(newBook => {
    res.send(newBook);
  });
});

module.exports = router;
