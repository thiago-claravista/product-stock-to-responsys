import mongoose from "mongoose";
import handleError from "../utils/handleError";

const connectToDatabase = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/vtex_product_stock");
    console.log(
      "[Mongoose] Conexão ao banco de dados 'vtex_product_stock' bem-sucedida!"
    );
  } catch (error) {
    console.log("Erro ao se conectar com o MongoDB:");
    handleError(error);
  }
};

export default connectToDatabase;
