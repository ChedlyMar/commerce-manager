import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  name: { type: String },
  qte: { type: String },
  price: { type: String },
});

const productModel = mongoose.model("product", productSchema);

export default productModel;
