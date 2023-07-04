import express from 'express';
import Product from '../models/Product.js';
import { verifyTokenAndAdmin } from './verifyToken.js';

const router = express.Router();

// ADD NEW PRODUCT

router.post('/', verifyTokenAndAdmin, async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).send(savedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// UPDATE A PRODUCT

router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).send(updatedProduct);
  } catch (error) {
    res.status(500).send(error);
  }
});

// DELETE A PRODUCT

router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).send('Product Delete!');
  } catch (error) {
    res.status(500).send(error);
  }
});

// GET ALL PRODUCTS

router.get('/', async (req, res) => {
  try {
    const product = await Product.find();

    res.status(200).send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
