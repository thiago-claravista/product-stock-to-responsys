import model from "../mongoose/models/ProductError";
import sendVtexProductsToSupplementalTable from "../responsys/sendVtexProductsToSupplementalTable";
import getProductBySku from "../vtex/getProductBySku";
import createRequestLog from "./createRequestLog";
import productsFoundInPromises from "./productsFoundInPromises";
import productsNotFoundInPromises from "./productsNotFoundInPromises";

const resendProductsWithError = async () => {
  const LIMIT = 200;
  const products = await model.find().exec();

  if (products.length) {
    console.log(
      `Reenviando produtos com erro de requisição (${products.length} produtos)...`
    );

    const skuList = products.map((p) => p.sku);
    const promiseList = await Promise.allSettled(skuList.map(getProductBySku));
    const productList = productsFoundInPromises(promiseList);
    const notFoundProductSkuList = productsNotFoundInPromises(promiseList).map(
      (reason) => reason.sku
    );

    do {
      const productsToSend = productList.splice(0, LIMIT);
      const response = await sendVtexProductsToSupplementalTable(
        productsToSend
      );

      // cria o log e deleta da collection os produtos encontrados
      await Promise.allSettled(
        [
          createRequestLog(productsToSend, response),
          productsToSend.map(({ skuId }) =>
            model.findOneAndDelete({ sku: skuId }).exec()
          ),
        ].flat()
      );

      console.log(`${productsToSend.length} produtos enviados!`);
    } while (!!productList.length);

    // deleta da collection os produtos não encontrados
    console.log(`${notFoundProductSkuList.length} produtos não encontrados!`);

    await Promise.allSettled(
      notFoundProductSkuList.map((sku) =>
        model.findOneAndDelete({ sku }).exec()
      )
    );
  }
};

export default resendProductsWithError;
