import { VtexProduct } from "./types/IVtexProduct";
import connectToDatabase from "./mongoose/connectToDatabase";
import createDatabaseLog from "./utils/createDatabaseLog";
import sendVtexProductsToSupplementalTable from "./responsys/sendVtexProductsToSupplementalTable";
import getProductBySku from "./vtex/getProductBySku";
import getSkuList from "./vtex/getSkuList";
import productsFoundInPromises from "./utils/productsFoundInPromises";
import productsNotFoundInPromises from "./utils/productsNotFoundInPromises";
import schedule from "node-schedule";

const init = async () => {
  const LIMIT = 200;
  const productsToSend: VtexProduct[] = [];
  let page = 1;
  let proceed = true;

  await connectToDatabase();
  console.log(`[${new Date().toLocaleString("pt-br")}] Migração iniciada...`);

  do {
    const skuList = await getSkuList(page++, LIMIT);
    const promiseList = await Promise.allSettled(skuList.map(getProductBySku));
    const productList = productsFoundInPromises(promiseList);

    proceed = !!skuList.length;

    if (productList.length) {
      // console.log(`${productList.length} produtos encontrados!`);
      productsToSend.push(...productList);
    }

    if (productsToSend.length >= LIMIT || (!proceed && productsToSend.length)) {
      const products = productsToSend.splice(0, LIMIT);
      const response = await sendVtexProductsToSupplementalTable(products);

      createDatabaseLog(products, response);
    }

    // productsNotFoundInPromises(promiseList);
  } while (proceed);

  console.log(`[${new Date().toLocaleString("pt-br")}] Migração finalizada!`);
};

const rule = new schedule.RecurrenceRule();
rule.hour = [0, 12, 18];
rule.minute = 0;
rule.tz = "America/Sao_Paulo";

schedule.scheduleJob(rule, init);
console.log("'product-stock-to-responsys' iniciado...");
init();
