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
const { Book } = require("../models");

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

router.get("/checkbooks", (req, res) => {
  db.Book.find()
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/checkusers", (req, res) => {
  db.User.find()
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/borrow-books", verify, (req, res) => {
  console.log("user: ", req.user);

  db.User.findOne({ email: req.user.email })
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/borrow-books/:title", (req, res) => {
  console.log("user: ", req.user);

  db.Book.findOne({ title: req.user.title })
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/borrow-books/:author", (req, res) => {
  console.log("user: ", req.user);

  db.Book.findOne({ author: req.user.author })
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/savebook/:id", verify, async (req, res) => {
  console.log("HI SARAH!");

  let userID = req.user.userID;

  console.log("userID", userID);

  let bookID = req.body.id;

  console.log("body", req.body);
  console.log("bookID", bookID);

  let book = await db.Book.findOne({ id: bookID });

  console.log("lookedup book");
  console.log(book);

  if (!book) {
    if (req.body.intent === "to lend") {
      try {
        console.log("CREATING");
        await db.Book.create({
          id: bookID,
          title: req.body.title,
          authors: req.body.authors,
          description: req.body.description,
          link: req.body.link,
          image: req.body.image,
          usersLending: userID,
        });

        console.log("FINDING");
        let doc = await db.User.findOneAndUpdate(
          { _id: userID },
          { $push: { lend: bookID } }
        );

        doc.save();
        console.log("DOC:");
        console.log(doc);

        console.log("RETURNING");
        return res.json(200, doc);
      } catch (e) {
        console.log("ERROR: ");
        console.log(e);
        return res.status(500).send("Error, check console logs");
      }

      // await db.User.findOneAndUpdate(
      //   { _id: userID },
      //   { $push: { lend: bookID } },
      //   function (err, user, books) {
      //     if (err) {
      //       console.log("ERROR:");
      //       console.log(err);

      //       return res.status(err);
      //     } else {
      //       console.log("RESPONDING!");
      //       return res.json(200, { user: user, books: books });
      //     }
      //   }
      // );
    } else if (req.body.intent === "to borrow") {
      await db.Book.create({
        id: bookID,
        title: req.body.title,
        authors: req.body.authors,
        description: req.body.description,
        link: req.body.link,
        image: req.body.image,
        usersBorrowing: userID,
      });

      await db.User.findOneAndUpdate(
        { _id: userID },
        { $push: { borrow: bookID } },
        function (err, user, books) {
          if (err) {
            console.log("ERROR:");
            console.log(err);

            return res.status(err);
          } else {
            return res.json(200, { user: user, books: books });
          }
        }
      );
    }
  } else {
    if (req.body.intent === "to borrow") {
      await db.Book.findOneAndUpdate(
        { id: bookID },
        { $push: { usersBorrowing: userID } },
        function (err, user, books) {
          if (err) {
            console.log("ERROR:");
            console.log(err);

            return res.status(err);
          } else {
            return res.json(200, { user: user, books: books });
          }
        }
      );
      await db.User.findOneAndUpdate(
        { _id: userID },
        { $push: { borrow: bookID } },
        function (err, user, books) {
          if (err) {
            console.log("ERROR:");

            console.log(err);
            return res.status(err);
          } else {
            return res.json(200, { user: user, books: books });
          }
        }
      );
    } else if (req.body.intent === "to lend") {
      await db.Book.findOneAndUpdate(
        { id: bookID },
        { $push: { usersLending: userID } },
        function (err, user, books) {
          if (err) {
            console.log("ERROR:");
            console.log(err);
            return res.status(err);
          } else {
            return res.json(200, { user: user, books: books });
          }
        }
      );
      await db.User.findOneAndUpdate(
        { _id: userID },
        { $push: { lend: bookID } },
        function (err, user, books) {
          if (err) {
            console.log("ERROR:");
            console.log(err);
            return res.status(err);
          } else {
            return res.json(200, { user: user, books: books });
          }
        }
      );
    }
  }
});

router.delete("/delete/:id", (req, res) => {
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
            userID: result._id,
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
