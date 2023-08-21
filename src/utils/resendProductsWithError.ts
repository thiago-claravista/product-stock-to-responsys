import model from "../mongoose/models/ProductError";
import sendVtexProductsToSupplementalTable from "../responsys/sendVtexProductsToSupplementalTable";
import getProductBySku from "../vtex/getProductBySku";
import createRequestLog from "./createRequestLog";
import productsFoundInPromises from "./productsFoundInPromises";
import productsNotFoundInPromises from "./productsNotFoundInPromises";

const resendProductsWithError = async () => {
  const products = await model.find().exec();

  if (products.length) {
    console.log(`Reenviando produtos com erro de requisição...`);

    const hasRequestLimitLog = products.some((p) => p.status === 429);
    const skuList = products.map((p) => p.sku);
    const promiseList = await Promise.allSettled(skuList.map(getProductBySku));
    const productList = productsFoundInPromises(promiseList);
    const notFoundProductSkuList = productsNotFoundInPromises(promiseList).map(
      (reason) => reason.sku
    );

    if (productList.length) {
      const response = await sendVtexProductsToSupplementalTable(productList);

      // cria o log e deleta da collection os produtos encontrados
      await Promise.allSettled(
        [
          createRequestLog(productList, response),
          productList.map(({ skuId }) =>
            model.findOneAndDelete({ sku: skuId }).exec()
          ),
        ].flat()
      );

      console.log(
        `${productList.length}/${products.length} produtos enviados!`
      );
    } else {
      console.log("hasRequestLimitLog:", hasRequestLimitLog);
    }

    // deleta da collection os produtos não encontrados
    if (!hasRequestLimitLog) {
      console.log(`${notFoundProductSkuList.length} produtos não encontrados!`);

      await Promise.allSettled(
        notFoundProductSkuList.map((sku) =>
          model.findOneAndDelete({ sku }).exec()
        )
      );
    }
  }
};

export default resendProductsWithError;
