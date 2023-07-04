import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String },
    desc: { type: String },
    img: { type: String },
    color: { type: String },
    price: { type: String },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);
