import "dotenv/config";
import { MERGE_TABLE_RECORDS } from "../api";
import { SupplementalTableRecordsBody } from "../types/ISupplementalTableRecordsBody";
import { VtexProduct } from "../types/IVtexProduct";
import { ProductTableSupplementalRecord } from "../types/IProductTableSupplementalRecord";
import convertVtexProductToProductTableSupplementalRecord from "../utils/convertVtexProductToProductTableSupplementalRecord";
import generateAuthToken from "./generateAuthToken";
import getAxios from "../utils/getAxios";
import handleError from "../utils/handleError";

const FOLDER_NAME = process.env.RESPONSYS_FOLDER_NAME;
const TABLE_NAME = process.env.RESPONSYS_SUP_PRODUCTS_TABLE_NAME;

if (!FOLDER_NAME) {
  throw "'FOLDER_NAME' do Responsys não informada!";
}

if (!TABLE_NAME) {
  throw "Nome da tabela suplemental de produtos (RESPONSYS_SUP_PRODUCTS_TABLE_NAME) não informado!";
}

const sendVtexProductsToSupplementalTable = async (products: VtexProduct[]) => {
  const token = await generateAuthToken();

  if (!token) {
    throw "Token de autenticação não informado!";
  }

  const records = products.map(
    convertVtexProductToProductTableSupplementalRecord
  );
  const fieldNames = Object.keys(records[0]);
  const requestBody: SupplementalTableRecordsBody<ProductTableSupplementalRecord> =
    {
      recordData: { fieldNames, records },
      insertOnNoMatch: "true",
      updateOnMatch: "REPLACE_ALL",
    };
  const requestConfig = MERGE_TABLE_RECORDS(
    FOLDER_NAME,
    TABLE_NAME,
    requestBody,
    token.authToken
  );

  try {
    const axios = getAxios();
    const response = await axios<
      SupplementalTableRecordsBody<ProductTableSupplementalRecord>
    >(requestConfig);

    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export default sendVtexProductsToSupplementalTable;
