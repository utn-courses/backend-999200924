// ✅ index.js → punto de entrada de la aplicación, aquí es donde se ejecuta el código
// ❌ en index.js no se obtienen los datos

import { conexionMongoDb } from "./configMongoose.js"
// import { getUsers, createUser, updateUser, deleteUser } from "./mysql.js"
import { getUsers, createUser, deleteUser } from "./mongodb.js"

// add juancito juan@gmail.com aguanteelddl
const argv = process.argv
const params = argv.slice(2)
const operacion = params[0]
let resultado

const main = async () => {
  conexionMongoDb()
  switch (operacion) {
    case "get":
      resultado = await getUsers()
      break
    case "add":
      // createUser("juancito", "juan@gmail.com", "megustaelddl")
      resultado = await createUser(params[1], params[2], params[3])
      break
    // case "update":
    //   const updates = { username: params[1], email: params[2], password: params[3] }
    //   resultado = await updateUser(params[4], updates)
    //   break
    case "delete":
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