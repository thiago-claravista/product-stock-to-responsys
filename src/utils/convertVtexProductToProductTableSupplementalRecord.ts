import { ProductTableSupplementalRecord } from "../types/IProductTableSupplementalRecord";
import { VtexProduct } from "../types/IVtexProduct";

const convertVtexProductToProductTableSupplementalRecord = (
  product: VtexProduct
) => {
  const record: ProductTableSupplementalRecord = {
    PRODUCT_ID: String(product.productId),
    PRODUCT_NAME: product.productName,
    SKU_ID: String(product.skuId),
    TAMANHO: product.tamanho,
    PRODUCT_PRICE: String(product.productPrice),
    CATEGORY_ID: String(product.categoryId),
    PRODUCT_IMAGE_URL: product.productImageUrl,
    PRODUCT_URL: product.productUrl,
    PRODUCT_AVAILABILITY: String(product.productAvailability),
    PRODUCT_INVENTORY: String(product.productInventory),
  };

  return record;
};

export default convertVtexProductToProductTableSupplementalRecord;
