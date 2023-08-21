import { SupplementalTableRecordsBody } from "../types/ISupplementalTableRecordsBody";
import { VtexProduct } from "../types/IVtexProduct";
import model from "../mongoose/models/RequestLog";
import handleError from "./handleError";

const createRequestLog = async (
  products: VtexProduct[],
  response: SupplementalTableRecordsBody<any> | null
) => {
  try {
    await model.create({ sent_products: products, responsys_log: response });
  } catch (error) {
    console.log("Erro ao criar um log no banco de dados:");
    handleError(error);
  }
};

export default createRequestLog;
