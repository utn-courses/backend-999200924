import { getUsers, createUser, updateUser, deleteUser } from "./controllers.js"

// add juancito juan@gmail.com aguanteelddl
const argv = process.argv
const params = argv.slice(2)
const operacion = params[0]
let resultado

switch (operacion) {
  case "get":
    resultado = await getUsers()
    break
  case "add":
    // createUser("juancito", "juan@gmail.com", "megustaelddl")
    resultado = await createUser(params[1], params[2], params[3])
    break
  case "update":
    const updates = { username: params[1], email: params[2], password: params[3] }
    resultado = await updateUser(params[4], updates)
    break
  case "delete":
    resultado = await deleteUser(params[1])
    break
  default:
    resultado = "Operación invalida."
}

const main = () => {
  console.log(resultado)
}

main()