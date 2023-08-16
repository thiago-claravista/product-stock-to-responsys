import { CONTEXT_BY_SKU_GET } from "../api";
import handleError from "../utils/handleError";
import getAxios from "../utils/getAxios";
import createProductError from "../utils/createProductError";

interface ProductContext {
  Id: number;
  ProductId: number;
  ProductName: string;
  NameComplete: string;
  SkuName: string;
  ImageUrl: string;
  DetailUrl: string;
  ProductCategories: { [key: string]: string };
}

const getProductContextBySku = async (sku: number) => {
  const requestConfig = CONTEXT_BY_SKU_GET(sku);

  try {
    const axios = getAxios();
    const response = await axios<ProductContext>(requestConfig);
    return response.data;
  } catch (error) {
    const status = handleError(error);
    createProductError(sku, status);
    return null;
  }
};

export default getProductContextBySku;
