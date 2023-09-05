import mongoose from "mongoose";

interface ProductNotFound {
  sku: number;
}

const schema = new mongoose.Schema<ProductNotFound>(
  {
    sku: { type: Number, required: true, unique: true },
  },
  { versionKey: false }
);

export default mongoose.model("product_not_found", schema);
