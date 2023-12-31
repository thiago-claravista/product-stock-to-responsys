import model from "../mongoose/models/ProductError";
import handleError from "./handleError";

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
  }
};

export default createProductErrorLog;
