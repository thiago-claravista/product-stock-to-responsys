import "dotenv/config";
import { GENERATE_AUTH_TOKEN } from "../api";
import handleError from "../utils/handleError";
import getAxios from "../utils/getAxios";

interface AuthToken {
  authToken: string;
  issuedAt: number;
  endPoint: string;
}

const RESPONSYS_USERNAME = process.env.RESPONSYS_USERNAME;
const RESPONSYS_PASSWORD = process.env.RESPONSYS_PASSWORD;

if (!RESPONSYS_USERNAME) {
  throw "Usuário de acesso do Responsys (RESPONSYS_USERNAME) não informado!";
}

if (!RESPONSYS_PASSWORD) {
  throw "Senha de acesso do Responsys (RESPONSYS_PASSWORD) não informada!";
}

const generateAuthToken = async () => {
  const requestConfig = GENERATE_AUTH_TOKEN(
    RESPONSYS_USERNAME,
    RESPONSYS_PASSWORD
  );

  try {
    const axios = getAxios();
    const response = await axios<AuthToken>(requestConfig);
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export default generateAuthToken;
