import mongoose, { Schema } from "mongoose";
import { Product } from "../../../types/product";

const ProductSchema = new Schema<Product>(
  {
    Name: { type: String, required: true },
    Price: { type: Number, required: true },
    Image: { type: String },
    Description: { type: String },
    Category:{type:String,required:true},
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: { type: String, enum: ["available", "sold"], required: true },
    ratings: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const ProductModel =
  (mongoose.models.Product as mongoose.Model<Product>) ||
  mongoose.model<Product>("Product", ProductSchema);

export default ProductModel;
