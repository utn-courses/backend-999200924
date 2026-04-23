import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/db_utn_backend")
    console.log("✅ Conectado con éxito a MongoDb.")
  } catch (error) {
    console.log(error.message)
  }
}

export { connectDb }