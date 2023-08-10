import "dotenv/config";
import { AxiosRequestConfig } from "axios";
import { SupplementalTableRecordsBody } from "./types/ISupplementalTableRecordsBody";

const VTEX_ACCOUNT_NAME = process.env.VTEX_ACCOUNT_NAME;
const VTEX_ENVIRONMENT = process.env.VTEX_ENVIRONMENT;
const VTEX_APP_KEY = process.env.VTEX_APP_KEY;
const VTEX_APP_TOKEN = process.env.VTEX_APP_TOKEN;
const VTEX_BASE_URL = `https://${VTEX_ACCOUNT_NAME}.${VTEX_ENVIRONMENT}.com.br`;
const RESPONSYS_BASE_URL = process.env.RESPONSYS_BASE_URL;

if (!RESPONSYS_BASE_URL) {
  throw "URL de acesso ao Responsys (RESPONSYS_BASE_URL) não informada!";
}

export const LIST_ALL_SKU_GET = (
  page: number,
  size: number
): AxiosRequestConfig => {
  const url = new URL(
    "/api/catalog_system/pvt/sku/stockkeepingunitids",
    VTEX_BASE_URL
  );
  url.searchParams.append("page", String(page));
  url.searchParams.append("pagesize", String(size));

  return {
    url: url.toString(),
    method: "get",
    headers: {
      "X-VTEX-API-AppKey": VTEX_APP_KEY,
      "X-VTEX-API-AppToken": VTEX_APP_TOKEN,
    },
  };
};

export const CONTEXT_BY_SKU_GET = (sku: number): AxiosRequestConfig => {
  const url = new URL(
    `/api/catalog_system/pvt/sku/stockkeepingunitbyid/${sku}`,
    VTEX_BASE_URL
  );

  return {
    url: url.toString(),
    method: "get",
    headers: {
      "X-VTEX-API-AppKey": VTEX_APP_KEY,
      "X-VTEX-API-AppToken": VTEX_APP_TOKEN,
    },
  };
};

export const VARIATION_LIST_BY_PRODUCT_ID_GET = (
  productId: number
): AxiosRequestConfig => {
  const url = new URL(
    `/api/catalog_system/pub/products/variations/${productId}`,
    VTEX_BASE_URL
  );

  return {
    url: url.toString(),
    method: "get",
    headers: {
      "X-VTEX-API-AppKey": VTEX_APP_KEY,
      "X-VTEX-API-AppToken": VTEX_APP_TOKEN,
    },
  };
};

export const INVENTORY_BY_SKU_GET = (sku: number): AxiosRequestConfig => {
  const url = new URL(
    `/api/logistics/pvt/inventory/skus/${sku}`,
    VTEX_BASE_URL
  );

  return {
    url: url.toString(),
    method: "get",
    headers: {
      "X-VTEX-API-AppKey": VTEX_APP_KEY,
      "X-VTEX-API-AppToken": VTEX_APP_TOKEN,
    },
  };
};

export const GENERATE_AUTH_TOKEN = (
  username: string,
  password: string
): AxiosRequestConfig => {
  const url = new URL(`/rest/api/v1.3/auth/token`, RESPONSYS_BASE_URL);
  const requestBody = new URLSearchParams({
    user_name: username,
    password,
    auth_type: "password",
  });

  return {
    url: url.toString(),
    method: "post",
    data: requestBody.toString(),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
};

export const MERGE_TABLE_RECORDS = (
  folderName: string,
  tableName: string,
  requestBody: SupplementalTableRecordsBody<any>,
  token: string
): AxiosRequestConfig => {
  const url = new URL(
    `/rest/api/v1.3/folders/${folderName}/suppData/${tableName}/members`,
    RESPONSYS_BASE_URL
  );

  return {
    url: url.toString(),
    method: "post",
    data: JSON.stringify(requestBody),
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  };
};
