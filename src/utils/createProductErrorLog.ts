import model from "../mongoose/models/ProductError";
import handleError from "./handleError";

import ProductNotFound from "../mongoose/models/ProductNotFound";

const createProductErrorLog = async (sku: number, status: number | null) => {
  if (status !== 404) {
    try {
      await model
        .findOneAndUpdate({ sku }, { sku, status }, { upsert: true })
        .exec();
    } catch (error) {
      console.log("Erro ao criar um erro de produto no banco de dados:");
      handleError(error);
    }
  } else {
    ProductNotFound.findOneAndUpdate({ sku }, { sku }, { upsert: true }).exec();
  }
};

export default createProductErrorLog;
