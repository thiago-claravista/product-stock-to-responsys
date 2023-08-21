import { VtexProduct } from "../types/IVtexProduct";
import convertVtexCurrencyToNumber from "../utils/convertVtexCurrencyToNumber";
import getInventoryBySku from "./getInventoryBySku";
import getProductContextBySku from "./getProductContextBySku";
import getVariationListByProductId from "./getVariationListByProductId";

const getProductBySku = async (sku: number) => {
  const context = await getProductContextBySku(sku);

  if (context) {
    const variationList = await getVariationListByProductId(
      context.ProductId,
      sku
    );
    const variation = variationList?.find((variation) => variation.sku === sku);
    const [category] = Object.keys(context.ProductCategories);
    const [tamanho] = context.NameComplete.match(/(?<=-\s).+$/) ??
      context.SkuName.match(/(?<=-\s).+$/) ?? [""];

    if (variation) {
      const inventory = await getInventoryBySku(sku);
      const balance = inventory?.balance.find(
        (balance) => balance.warehouseName === "Estoque Principal"
      );

      if (!balance) {
        throw { sku, error: "Inventário não encontrada" };
      }

      const price = Math.max(
        variation.listPrice,
        variation.bestPrice,
        variation.spotPrice
      );

      const product: VtexProduct = {
        productId: context.ProductId,
        productName: context.ProductName,
        skuId: sku,
        tamanho: variation.dimensions.Tamanho || tamanho,
        productPrice: convertVtexCurrencyToNumber(price),
        categoryId: Number(category),
        productImageUrl: variation.image || context.ImageUrl,
        productUrl: context.DetailUrl,
        productAvailability: Boolean(balance.totalQuantity),
        productInventory: balance.totalQuantity,
      };

      return product;
    }

    throw { sku, error: "Variação não encontrada" };
  }

  throw { sku, error: "Contexto não encontrado" };
};

export default getProductBySku;
