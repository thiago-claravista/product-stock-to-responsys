import mongoose from "mongoose";

interface ProductError {
  sku: number;
  status: number | null;
}

const schema = new mongoose.Schema<ProductError>(
  {
    sku: { type: Number, required: true, unique: true },
    status: { type: Number, default: null },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("product_error", schema);
