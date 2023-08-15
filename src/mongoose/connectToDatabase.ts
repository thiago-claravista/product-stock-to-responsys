import mongoose from "mongoose";
import handleError from "../utils/handleError";

const connectToDatabase = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/vtex_product_stock");
  } catch (error) {
    console.log("Erro ao conectar com o MongoDB:");
    handleError(error);
  }
};

export default connectToDatabase;
