import { CONTEXT_BY_SKU_GET } from "../api";
import handleError from "../utils/handleError";
import getAxios from "../utils/getAxios";

interface ProductContext {
  Id: number;
  ProductId: number;
  ProductName: string;
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
    handleError(error);
    return null;
  }
};

export default getProductContextBySku;
