const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/allsaved", (req, res) => {
  db.Books.find()
    .then((books) => {
      res.json(books);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/saved", (req, res) => {
  db.Books.create({
    id: req.body.id,
    title: req.body.title,
    authors: req.body.authors,
    description: req.body.description,
    image: req.body.image,
    link: req.body.link,
  }).then((savedBook) => {
    res.json(savedBook);
  });
});

router.delete("/delete/:id", (req, res) => {
  db.Books.findByIdAndDelete(req.params.id)
    .then((book) => {
      res.json(book);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
