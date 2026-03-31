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

const guardarUsuarios = (ruta: string, usuariosActualizados: Usuario[]): void => {
  fs.writeFileSync(ruta, JSON.stringify(usuariosActualizados))
}

const borrarUsuario = (ruta: string, id: number): Usuario | string => {
  // paso 1
  const usuarios = leerUsuarios(ruta)

  // paso 2 
  const usuarioABorrar = usuarios.find(usuario => usuario.id === id)

  if (!usuarioABorrar) {
    return "Usuario no encontrado."
  }

  // paso 3
  const usuariosActualizados = usuarios.filter(usuario => usuario.id !== id)

  // paso 4
  guardarUsuarios(ruta, usuariosActualizados)

  // último paso
  return usuarioABorrar
}

// {nombre: "Seba"}
// {edad: 21}
// {nombre: "Seba", edad: 21}
// {nombre: string, edad: number, id: number}
// return de función: Usuario | string
const actualizarUsuario = (ruta: string, id: number, data: Partial<Usuario>): string | Usuario => {
  // paso 1 → leer los usuarios
  const usuarios = leerUsuarios(ruta)
  // paso 2 → verificar existencia del usuario → !usuario → return "Usuario no encontrado."
  const usuarioAActualizar = usuarios.find(usuario => usuario.id === id)

  if (!usuarioAActualizar) {
    return "Usuario no encontrado."
  }

  let usuarioActualizado = usuarioAActualizar

  // paso 3 → mapear usuarios -> map: retorna nuevo array transformando elementos
  const usuariosActualizados = usuarios.map(usuario => {
    if (usuario.id !== id) {
      return usuario
    }
    // data = {edad: 21} | {nombre: "Seba", edad: 21} | {nombre: "Seba"}
    // usuario = {id: 5, nombre: "Sebastian", edad: 20}

    const { edad, nombre } = data

    if (edad) {
      usuario.edad = edad
    }

    if (nombre) {
      usuario.nombre = nombre
    }

    usuarioActualizado = usuario

    return usuario
  })

  // paso 4 → reescribir db con usuarios actualizados
  guardarUsuarios(ruta, usuariosActualizados)

  // paso 5 → retornar al cliente el usuario actualizado
  return usuarioActualizado
}

export { leerUsuarios, guardarUsuarios, borrarUsuario, actualizarUsuario }


