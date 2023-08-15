import { LIST_ALL_SKU_GET } from "../api";
import handleError from "../utils/handleError";
import getAxios from "../utils/getAxios";

const getSkuList = async (page: number, size: number) => {
  const requestConfig = LIST_ALL_SKU_GET(page, size);

  try {
    // console.log(`Obtendo a página ${page} da lista de SKUs...`);
    const axios = getAxios();
    const response = await axios<number[]>(requestConfig);

    return response.data;
  } catch (error) {
    handleError(error);
    return [];
  }
};

export default getSkuList;
