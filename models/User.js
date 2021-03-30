"use strict";

const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail, // custom validator
      message: "Not valid email",
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  name: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: false,
    validate: {
      validator: validator.isMobilePhone,
      message: "Not valid phone",
    },
  },
  resume: String,
  status: String,
});

UserSchema.set('timestamps', true);

// Runs immediately prior to saving the document in the database.
UserSchema.pre("save", function (next) {
  const user = this; // binds this to User document instance

  // checks to ensure we don't hash password more than once
  if (user.isModified("password")) {
    // generate salt and hash the password
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

UserSchema.statics.findByEmailPassword = function (email, password) {
  const User = this;

  // First find the user by their email
  return User.findOne({ email: email }).then((user) => {
    if (!user) {
      return Promise.reject(new Error("User not found")); // a rejected promise
    }
    // If the user exists, make sure their password is correct
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          resolve(user);
        } else {
          reject(new Error("Incorrect password"));
        }
      });
    });
  });
};

UserSchema.set('timestamps', true);

const User = mongoose.model("User", UserSchema);
module.exports = { User };
