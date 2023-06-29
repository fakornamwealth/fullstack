import express from 'express';
import Cart from '../models/Cart.js';

import {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} from './verifyToken.js';

const router = express.Router();

//CREATE USER CART

router.post('/', verifyToken, async (req, res) => {
  const newCart = new Cart(req.body);

  try {
    const savedCart = await newCart.save();
    res.status(200).send(savedCart);
  } catch (err) {
    res.status(500).send(err);
  }
});

//UPDATE USER CART
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).send(updatedCart);
  } catch (err) {
    res.status(500).send(err);
  }
});

//DELETE USER CART
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).send('Cart deleted...');
  } catch (err) {
    res.status(500).send(err);
  }
});

//GET USER CART
router.get('/find/:id', verifyToken, async (req, res) => {
  let userId = req.params.id;
  try {
    const cart = await Cart.find({ id: userId });
    res.status(200).send(cart);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

//GET ALL CART ADMIN

router.get('/', verifyToken, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).send(carts);
  } catch (err) {
    res.status(500).send(err);
  }
});

export default router;
