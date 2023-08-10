import { VtexProduct } from "./types/IVtexProduct";
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

  do {
    const skuList = await getSkuList(page++, LIMIT);
    const promiseList = await Promise.allSettled(skuList.map(getProductBySku));
    const productList = productsFoundInPromises(promiseList);

    proceed = !!skuList.length;

    if (productList.length) {
      console.log(`${productList.length} produtos encontrados!`);
      productsToSend.push(...productList);
    }

    if (productsToSend.length >= LIMIT || (!proceed && productsToSend.length)) {
      await sendVtexProductsToSupplementalTable(
        productsToSend.splice(0, LIMIT)
      );
    }

    // productsNotFoundInPromises(promiseList);
  } while (proceed);
};

const rule = new schedule.RecurrenceRule();
rule.hour = 0;
rule.minute = 0;
rule.tz = "America/Sao_Paulo";

schedule.scheduleJob(rule, init);
