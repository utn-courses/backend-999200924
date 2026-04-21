import mongoose from "mongoose"

// esquema → Schema
// tipar la data de cada usuario
// {username, email, password}
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
},
  {
    timestamps: true,
    versionKey: false
  }
)

// modelo → model
// para administrar usuarios crearé el model de User
const User = mongoose.model("User", userSchema)

const getUsers = async () => {
  try {
    const users = await User.find({})
    return users
  } catch (error) {
    console.log(error)
  }
}

const createUser = async (username, email, password) => {
  if (!username || !email || !password) {
    return "Debes enviar la información necesaria."
  }

  try {
    // const existingUser = await User.findOne({ email })
    // if (existingUser) {
    //   return "El email ya está registrado."
    // }
    const user = new User({ username, email, password })
    await user.save()
    return "Usuario creado con éxito."
  } catch (error) {
    if (error.code === 11000) {
      return "El email ya está registrado."
    }
    process.exit(1)
  }
}

// 1
const deleteUser = async (id) => {
  if (!id) {
    return "El id es requerido para borrar un usuario"
  }

  try {
    const deletedUser = await User.findByIdAndDelete(id)

    if (!deletedUser) {
      return "El usuario no se encuentra."
    }

    return "Usuario borrado con éxito."
  } catch (error) {
    if (error.name === "CastError") {
      return "El ID debería ser un ID de MongoDB válido."
    }
    console.log(error)
  }
}

const updateUser = async (id, updates) => {
  if (!id) {
    return "ID requerido"
  }
  try {
    const user = await User.findByIdAndUpdate(id, updates, { new: true })
    return user
  } catch (error) {
    console.log(error)
  }
}

export { getUsers, createUser, deleteUser, updateUser, User }


