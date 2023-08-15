import mongoose from "mongoose";
import { VtexProduct } from "../../types/IVtexProduct";
import { SupplementalTableRecordsBody } from "../../types/ISupplementalTableRecordsBody";

interface RequestLog {
  sent_products: VtexProduct[];
  responsys_log: SupplementalTableRecordsBody<any>;
}

const schema = new mongoose.Schema<RequestLog>(
  {
    sent_products: [
      {
        productId: { type: Number, required: true },
        productName: { type: String, required: true },
        skuId: { type: Number, required: true },
        tamanho: { type: String, required: true },
        productPrice: { type: Number, required: true },
        categoryId: { type: Number, required: true },
        productImageUrl: { type: String, required: true },
        productUrl: { type: String, required: true },
        productAvailability: { type: Boolean, required: true },
        productInventory: { type: Number, required: true },
      },
    ],
    responsys_log: {
      insertOnNoMatch: { type: String, required: true },
      matchColumnNames: { type: [String] },
      recordData: {
        fieldNames: { type: [String], required: true },
        mapTemplateName: { type: String },
        records: { type: [Object], required: true },
      },
      updateOnMatch: { type: String, required: true },
    },
  },
  { timestamps: true }
);

schema.index({ "sent_products.skuId": 1, createdAt: 1 });

export default mongoose.model("request_log", schema);
