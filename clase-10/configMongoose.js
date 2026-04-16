import mongoose from "mongoose"

const URI_DB = "mongodb://localhost:27017/db_utn_backend"

const conexionMongoDb = async () => {
  try {
    await mongoose.connect(URI_DB)
    console.log("✅ Conectado a MongoDB con éxito.")
  } catch (error) {
    console.log("❌ No se pudo conectar a MongoDB")
  }
}

export { conexionMongoDb }