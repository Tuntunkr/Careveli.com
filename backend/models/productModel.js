import mongoose, { mongo } from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: Array, required: false },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  sizes: { type: Array, required: false },
  bestSeller: { type: Boolean },
  date: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isDeleted: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
});

const productModel =
  mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;
