import { leerUsuarios, guardarUsuarios } from "./acciones"

const URL: string = "./data.json"

const usuarios = leerUsuarios(URL)

// CREANDO UN NUEVO USUARIO
usuarios.push({
  id: 5,
  nombre: "Sebastian",
  edad: 20
})

guardarUsuarios(URL, usuarios)

