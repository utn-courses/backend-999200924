import { leerUsuarios, guardarUsuarios, borrarUsuario, actualizarUsuario } from "./acciones"

const URL: string = "./data.json"

const params = process.argv

const id = Number(params[2])

const respuesta = borrarUsuario(URL, id)
console.log(respuesta)