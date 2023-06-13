import express from "express";
import User from "../models/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

// REGISTER

router.post("/register", async (req, res) => {
  // check if all fields are empty or not
  if (
    (req.body.username === "" || req.body.username === null,
    req.body.email === "" || req.body.email === null,
    req.body.password === "" || req.body.password === null)
  ) {
    res.status(400).send(`Please fill all fields!`);
  }

  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const saveUser = await newUser.save();
    res.status(201).send(saveUser);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// LOGIN

router.post("/login", async (req, res) => {
  // check if all fields are empty or not
  if (
    (req.body.username === "" || req.body.username === null,
    req.body.password === "" || req.body.password === null)
  ) {
    res.status(400).send(`Please fill all fields!`);
  }

  try {
    // check the database for the user
    const user = await User.findOne({ username: req.body.username });

    if (user) {
      const hashedPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      const { password, ...others } = user._doc;

      // create accessToken
      const accessToken = jwt.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );
      if (hashedPassword) {
        res.status(200).send({
          ...others,
          accessToken,
          message: `Valid Password`,
        });
      } else {
        res.status(400).send(`Invalid Password!`);
      }
    } else {
      res.status(401).send(`User does not exist!`);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

export default router;
