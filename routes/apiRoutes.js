const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const exjwt = require("express-jwt");
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

router.post("/mybooks", (req, res) => {
  db.Books.create({
    id: req.body.id,
    title: req.body.title,
    authors: req.body.authors,
    description: req.body.description,
    image: req.body.image,
    link: req.body.link,
    intent: req.body.intent,
  })
    .then((savedBook) => {
      res.json(savedBook);
    })
    .catch((err) => {
      res.json(err);
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

// AUTH ROUTES

router.post("/log-in", (req, res) => {
  const { email, password } = req.body;
  console.log("User submitted: ", email, password);

  db.User.findOne({
    email: email,
  }).then((user) => {
    console.log("User Found: ", user);

    if (user === null) {
      res.status(401).json({
        sucess: false,
        token: null,
        err: "Invalid Credentials",
      });
    }

    bcrypt.compare(password, user.password, function (err, result) {
      if (result === true) {
        console.log("Valid!");

        let token = jwt.sign(
          {
            email: user.email,
          },
          "super secret",
          { expiresIn: 129600 }
        ); // Signing the token

        res.json({
          sucess: true,
          err: null,
          token,
        });
      } else {
        console.log("Entered Password and Hash do not match!");
        res.status(401).json({
          sucess: false,
          token: null,
          err: "Entered Password and Hash do not match!",
        });
      }
    });
  });
});

router.get("/users", (req, res) => {
  db.User.find().then((users) => {
    res.json(users);
  });
});

router.post("/signup", async (req, res) => {
  const { email, password, name } = req.body;
  console.log(email, password, name);

  // First check if user exists
  const existingUser = await db.User.findOne({
    email,
  });

  console.log("existing user", existingUser);

  if (existingUser) {
    console.log("EXISTING USER");
    return res.json({
      status: "failed",
      message: "user exists",
    });
  }

  console.log("CONTINUING OUTSIDE OF existing user");

  const saltRounds = 10;

  bcrypt.hash(password, saltRounds, function (err, hash) {
    db.User.create({
      email: email,
      password: hash,
      name: name,
    }).then((result) => {
      res.json({ status: "success", user: result });
    });
  });
});

module.exports = router;
