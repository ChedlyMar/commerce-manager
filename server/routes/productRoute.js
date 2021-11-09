import express from "express";
import Product from "../models/product.js";

export const productRouter = express.Router();

//@role:get all products
//@url:localhost:5000/product
productRouter.get("/", async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      status: "succeess",
      products,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      msg: error.message,
    });
  }
});

//@role:create a new product
//@url:localhost:5000/product
productRouter.post("/", async (req, res) => {
  const { name, qte, price } = req.body;

  try {
    const newProduct = new Product({ name, qte, price });
    const product = await newProduct.save();

    res.status(201).json({
      status: "success",
      product,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      msg: error.message,
    });
  }
});

//@role:get product by id
//@url:localhost:5000/product/:id
productRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);

    res.status(200).json({
      status: "success",
      product,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      msg: error.message,
    });
  }
});

//@role:update product by id
//@url:localhost:5000/product/:id
productRouter.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, qte, price } = req.body;

  try {
    const product = await Product.findByIdAndUpdate(
      id,
      { name, qte, price },
      { new: true }
    );

    res.status(200).json({
      status: "success",
      product,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      msg: error.message,
    });
  }
});

//@role:delete product by id
//@url:localhost:5000/product/:id
productRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);

    res.status(204).json({
      status: "success",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      msg: error.message,
    });
  }
});
