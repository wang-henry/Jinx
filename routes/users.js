"use strict";

const express = require("express");

const { User } = require("../models/User");

const { isMongoError, mongoChecker } = require("./utils");

const router = express.Router();

router.post("/login", mongoChecker, (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findByEmailPassword(email, password)
    .then((user) => {
      // Add the user's id to the session.
      // We can check later if this exists to ensure we are logged in.
      req.session.user = user._id;
      req.session.email = user.email;
      res.send({ currentUser: user.email });
    })
    .catch((error) => {
      console.log(error)
      res.status(400).send(error);
    });
});

router.get("/logout", (req, res) => {
  // Remove the session
  req.session.destroy((error) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send();
    }
  });
});

router.post("/", mongoChecker, (req, res) => {
  // Create a new user
  const newUser = new User({
    email: req.body.email,
    password: req.body.password,
  });

  newUser
    .save()
    .then(() => {
      res.send(newUser);
    })
    .catch((error) => {
      if (isMongoError(error)) {
        res.status(500).send("Internal server error")
      } else {
        res.status(400).send("Bad Request");
      }
    });
});

module.exports = router;