import { VARIATION_LIST_BY_PRODUCT_ID_GET } from "../api";
import handleError from "../utils/handleError";
import getAxios from "../utils/getAxios";
import createProductErrorLog from "../utils/createProductErrorLog";

interface ProductVariations {
  productId: number;
  name: string;
  skus: ProductBySku[];
}

interface ProductBySku {
  sku: number;
  dimensions: {
    Tamanho?: string;
    CORES: string;
    COR: string;
  };
  available: boolean;
  availablequantity: number;
  listPriceFormated: string;
  listPrice: number;
  bestPriceFormated: string;
  bestPrice: number;
  spotPrice: number;
  image: string;
}

const getVariationListByProductId = async (productId: number, sku: number) => {
  const requestConfig = VARIATION_LIST_BY_PRODUCT_ID_GET(productId);

  try {
    const axios = getAxios();
    const response = await axios<ProductVariations>(requestConfig);
    return response.data.skus;
  } catch (error) {
    const status = handleError(error);
    createProductErrorLog(sku, status);
    return null;
  }
};

export default getVariationListByProductId;
