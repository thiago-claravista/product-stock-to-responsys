import { VtexProduct } from "../types/IVtexProduct";

const productsFoundInPromises = (
  promises: PromiseSettledResult<VtexProduct>[]
) => {
  return promises
    .filter(
      (p): p is PromiseFulfilledResult<VtexProduct> => p.status === "fulfilled"
    )
    .map((p) => p.value);
};

export default productsFoundInPromises;
