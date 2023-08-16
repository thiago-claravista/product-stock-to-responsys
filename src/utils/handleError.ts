import { isAxiosError } from "axios";

const handleError = (error: unknown) => {
  if (!(error instanceof Error)) return null;

  if (isAxiosError(error) && error.code !== "ETIMEDOUT") {
    const { response, config } = error;

    switch (response?.status) {
      case undefined:
        console.log(`[${error.name}] ${error.message}`);
        break;
      case 404:
        break;
      default:
        console.log(
          `[${response?.status}] ${JSON.stringify(response?.data)} -> ${
            config?.url
          }`
        );
        break;
    }

    return response?.status ?? null;
  }

  console.log(`[${error.name}] ${error.message}`);
  return null;
};

export default handleError;
