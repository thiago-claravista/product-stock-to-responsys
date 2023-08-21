import { VtexProduct } from "../types/IVtexProduct";

const productsNotFoundInPromises = (
  promises: PromiseSettledResult<VtexProduct>[]
) => {
  return promises
    .filter((p): p is PromiseRejectedResult => p.status === "rejected")
    .map((p) => p.reason as { sku: number; error: string });
};

export default productsNotFoundInPromises;
