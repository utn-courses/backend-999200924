import mongoose from "mongoose"
import { connectDb } from "./mongoConfig.js"

// Lograr que un usuario registre una pelicula
const args = process.argv
const params = args.slice(2)
const operacion = params[0]

const operacionesValidas = ["get", "add", "delete", "update", "getOne"]

if (!operacionesValidas.includes(operacion)) {
  console.log("Operación invalida")
}

// id, title, original_title, description, duration, release_date, original_leguage, status

// npm run dev add Primer Primer "Two engineers accidentally discover a time travel device while experimenting in a garage, leading to increasingly complex and unstable consequences." 77 2004-10-08 en released

const title = params[1]
const original_title = params[2]
const description = params[3]
const duration = Number(params[4])
const release_date = params[5]
const original_language = params[6]
const status = params[7]

// TAREA: crear un modelo → mongoose.model()
const filmSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    original_title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    duration: {
      type: Number,
      required: true,
      min: 1
    },
    release_date: {
      type: Date,
      required: true
    },
    original_language: {
      type: String,
      required: true,
      trim: true
    },
    status: {
      type: String,
      required: true,
      enum: ["released", "in_production", "post_production"]
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const Film = mongoose.model("Film", filmSchema);

// mongoose.model("Film", ??????????)

connectDb()

// controller

const addFilm = async () => {
  try {
    // controlar de nuevo el input
    // ✅ los datos de entrada (input) sanitizados
    const newFilm = new Film({
      title, original_title, description, duration, release_date, original_language, status
    })

    await newFilm.save()

    // create, inserteOne, save

    console.log("Pelicula guardada con éxito, ID:", newFilm._id)
  } catch (error) {
    console.log(error.message)
  }
}

if (operacion === "add") {
  addFilm()
}

// switch (operacion) {
//   case "add":
//     addFilm()
//     break
// }