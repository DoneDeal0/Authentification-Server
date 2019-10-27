const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

// Routes
// signup
router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  User.findOne({ email: email }).then(user => {
    if (user) {
      return res.send({ type: "email", msg: "this user already exists" });
    }
    User.create({ name, email, password: bcrypt.hashSync(password, 10) })
      .then(user => {
        const payload = {
          id: user._id,
          name: user.name,
          email: user.email
        };
        const token = jwt.sign(payload, process.env.TOKEN_KEY, {
          expiresIn: "20d"
        });
        return res.json({ token, isLogged: true });
      })
      .catch(err => console.log("signup failed", err));
  });
});

// login
router.post("/login", (req, res) => {
  const { email, originalPassword } = req.body;
  User.findOne({ email: { $eq: email } })
    .then(user => {
      if (!user) {
        return res.send({ type: "email", msg: "this user doesn't exist" });
      }
      const { password } = user;
      if (!bcrypt.compareSync(originalPassword, password)) {
        return res.send({ type: "password", msg: "incorrect password" });
      }
      const payload = {
        id: user._id,
        name: user.name,
        email: user.email
      };
      const token = jwt.sign(payload, process.env.TOKEN_KEY, {
        expiresIn: "20d"
      });
      return res.json({ token, isLogged: true });
    })
    .catch(err => console.log("login failed", err));
});

module.exports = router;
