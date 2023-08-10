import { VtexProduct } from "../types/IVtexProduct";

const productsNotFoundInPromises = (
  promises: PromiseSettledResult<VtexProduct>[]
) => {
  const notFound = promises.filter(
    (p): p is PromiseRejectedResult => p.status === "rejected"
  );
  console.log(`${notFound.length} produtos não encontrados!`);
};

export default productsNotFoundInPromises;
