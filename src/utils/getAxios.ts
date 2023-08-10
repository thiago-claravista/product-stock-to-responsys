import axios from "axios";
import https from "https";

const instance = axios.create({
  timeout: 60000,
  httpsAgent: new https.Agent({ keepAlive: true }),
});

const getAxios = () => {
  return instance;
};

export default getAxios;
