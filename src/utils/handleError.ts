import { isAxiosError } from "axios";

const handleError = (error: unknown) => {
  if (!(error instanceof Error)) return null;

  if (isAxiosError(error) && error.code !== "ETIMEDOUT") {
    const { response, config } = error;

    switch (response?.status) {
      case 404:
        return null;
      case 429:
        console.log(
          `[${response?.status}] Limite de requisições excedido -> ${config?.url}`
        );
        console.log(response.headers);
        break;
      case 500:
      // logica para tentar envio novamente
      // break;
      default:
        console.log(
          `[${response?.status}] ${JSON.stringify(response?.data)} -> ${
            config?.url
          }`
        );
        break;
    }

    return response?.status ?? null;
  } else {
    console.log(error.message);
  }

  return null;
};

export default handleError;
