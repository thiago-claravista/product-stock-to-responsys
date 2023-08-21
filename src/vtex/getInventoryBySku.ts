import { INVENTORY_BY_SKU_GET } from "../api";
import handleError from "../utils/handleError";
import getAxios from "../utils/getAxios";
import createProductErrorLog from "../utils/createProductErrorLog";

interface Inventory {
  skuId: string;
  balance: Balance[];
}

interface Balance {
  warehouseId: string;
  warehouseName: string;
  totalQuantity: number;
  reservedQuantity: number;
  hasUnlimitedQuantity: boolean;
}

const getInventoryBySku = async (sku: number) => {
  const requestConfig = INVENTORY_BY_SKU_GET(sku);

  try {
    const axios = getAxios();
    const response = await axios<Inventory>(requestConfig);
    return response.data;
  } catch (error) {
    const status = handleError(error);
    createProductErrorLog(sku, status);
    return null;
  }
};

export default getInventoryBySku;
