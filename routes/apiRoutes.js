const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const TOKEN = process.env.TOKEN_SECRET;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const exjwt = require("express-jwt");
const router = express.Router();
const db = require("../models");
const { sumBy } = require("lodash");

async function verify(req, res, next) {
  console.log("VERIFY!");

  var token = req.headers.authorization;

  if (!token) {
    return res.status(401).send("access denied");
  }
  try {
    const verified = jwt.verify(token, TOKEN);

    req.user = verified;

    next();
  } catch (err) {
    console.log("ERROR IN VERIFY!");
    res.status(400).send("Invalid Token");
  }
}

router.get("/books", (req, res) => {
  db.Book.find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/checkusers", (req, res) => {
  db.User.find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/userbooks", (req, res) => {
  db.UserBook.find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.delete("/userbooks/delete/:_id", (req, res) => {
  console.log(req);
  db.UserBook.findOneAndDelete({ _id: req.params._id })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.patch("/userbooks/borrow/:_id", verify, (req, res) => {
  console.log(req.user.userID);

  db.UserBook.findOneAndUpdate(
    { _id: req.params._id },
    { $set: { borrowerID: req.user.userID } }
  )
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/books/:title", (req, res) => {
  console.log("user: ", req.params.title);

  db.Book.find({ title: req.params.title })
    .then((data) => {
      console.log(data._id);
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/books/lend/:id", verify, async (req, res) => {
  let bookID = req.body.id;
  let userID = req.user.userID;

  let book = await db.Book.findOne({ id: bookID });

  let newBook;
  if (!book) {
    try {
      await db.Book.create({
        id: bookID,
        title: req.body.title,
        authors: req.body.authors,
        description: req.body.description,
        link: req.body.link,
        image: req.body.image,
      }).then((res) => {
        newBook = res._id;
      });
    } catch (e) {
      console.log("ERROR: ");
      console.log(e);
      return res.status(500).send("Error, check console logs");
    }
  } else {
    newBook = book._id;
  }

  db.UserBook.create({
    lenderID: userID,
    bookID: newBook,
  }).catch((err) => {
    if (err) {
      console.log(err);
    }
  });
});

router.delete("/books/delete/:id", (req, res) => {
  db.Book.findByIdAndDelete(req.params.id)
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

  db.User.findOne({
    email: email,
  }).then((user) => {
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
            userID: user._id,
          },
          TOKEN,
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
      let token = jwt.sign(
        {
          email: result.email,
          userID: result._id,
        },
        TOKEN,
        { expiresIn: 129600 }
      ); // Signing the token
      res.json({ status: "success", user: result, token });
    });
  });
});

module.exports = router;
