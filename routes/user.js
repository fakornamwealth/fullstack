import express from "express";
import User from "../models/Users.js";
import { verifyTokenAndAdmin } from "./verifyToken.js";

const router = express.Router();

// GET ALL USERS
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(6)
      : await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
