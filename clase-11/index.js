// ✅ index.js → punto de entrada de la aplicación, aquí es donde se ejecuta el código
// ❌ en index.js no se obtienen los datos

import { conexionMongoDb } from "./configMongoose.js"
// import { getUsers, createUser, updateUser, deleteUser } from "./mysql.js"
import { getUsers, createUser, deleteUser, updateUser } from "./mongodb.js"

// add juancito juan@gmail.com aguanteelddl
const argv = process.argv
const params = argv.slice(2)
const operacion = params[0]
const id = params[4]
const username = params[1]
const email = params[2]
const password = params[3]

// regex para username: solo letras
const usernameRegex = /^[a-zA-Z]+$/

// password regex: al menos 8 caracteres, una mayúscula, una minúscula y un número
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

let resultado

const main = async () => {
  conexionMongoDb()
  switch (operacion) {
    case "get":
      resultado = await getUsers()
      if (resultado.length === 0) {
        resultado = "No se encontraron usuarios."
      }
      break
    case "add":
      if (!username || !email || !password) {
        resultado = "Data invalida, necesitas enviar username, email y password para crear un usuario."
        break
      }

      if (!username.length < 4 && !username.length > 20) {
        resultado = "El username debe tener al menos 4 caracteres y no más de 20."
        break
      }

      if (!usernameRegex.test(username)) {
        resultado = "El username solo puede contener letras."
        break
      }

      if (!email.endsWith("@gmail.com")) {
        resultado = "El correo electrónico debería terminar en gmail.com"
        break
      }

      if (!passwordRegex.test(password)) {
        resultado = "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número."
        break
      }

      // createUser("juancito", "juan@gmail.com", "megustaelddl")
      resultado = await createUser(username, email, password)
      break
    case "update":
      if (!username || !email || !password) {
        resultado = "Data invalida, necesitas enviar username, email y password para actualizar un usuario."
        break
      }

      if (!username.length < 4 && !username.length > 20) {
        resultado = "El username debe tener al menos 4 caracteres y no más de 20."
        break
      }

      if (!usernameRegex.test(username)) {
        resultado = "El username solo puede contener letras."
        break
      }

      if (!email.endsWith("@gmail.com")) {
        resultado = "El correo electrónico debería terminar en gmail.com"
        break
      }

      if (!passwordRegex.test(password)) {
        resultado = "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número."
        break
      }

      if (!id) {
        resultado = "ID requerido para actualizar un usuario."
        break
      }

      const updates = { username, email, password }
      resultado = await updateUser(id, updates)
      break
    case "delete":
      if (!params[1]) {
        resultado = "ID requerido para borrar un usuario."
        break
      }
      resultado = await deleteUser(params[1])
      break
    default:
      resultado = "Operación invalida."
  }
  console.log(resultado)
  setTimeout(() => {
    process.exit(1)
  }, 2000)
}

main()