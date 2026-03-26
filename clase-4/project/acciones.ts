import fs from "node:fs"

interface Usuario {
  id: number,
  nombre: string,
  edad: number
}

const leerUsuarios = (ruta: string): Usuario[] => {
  const data = fs.readFileSync(ruta, "utf-8")
  return JSON.parse(data)
}

const guardarUsuarios = (ruta: string, usuariosActualizados: Usuario[]): string => {
  fs.writeFileSync(ruta, JSON.stringify(usuariosActualizados))
  return "Usuario agregado con éxito."
}

const actualizarUsuario = () => { }
const borrarUsuario = () => { }

export { leerUsuarios, guardarUsuarios }