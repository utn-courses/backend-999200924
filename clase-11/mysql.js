import { db } from "./configMysql.js"

const getUsers = async () => {
  const q = `SELECT * FROM users`
  const [response] = await db.query(q)
  return response
}

// declaración de función → enseñarle a la pc lo que tiene que hacer
const createUser = async (username, email, password) => {
  // VALIDAR
  if (!username || !email || !password) {
    return "Data invalida, necesitas enviar username, email y password para registrar un usuario."
  }

  if (!email.endsWith("@gmail.com")) {
    return "El correo electrónico debería terminar en gmail.com"
  }

  const q = `INSERT INTO users (id, username, email, password) VALUES (?,?,?,?)`

  const [response] = await db.query(q, [crypto.randomUUID(), username, email, password])

  if (response.serverStatus === 2) {
    return "Usuario creado con éxito."
  }
}

const updateUser = async (id, updates) => {
  if (!id) {
    return "ID requerido"
  }

  const q = `UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?`
  const { username, email, password } = updates;
  const [response] = await db.query(q, [username, email, password, id])

  if (response.affectedRows === 0) {
    return "Usuario no encontrado";
  }
  return "Usuario actualizado exitosamente";
}

const deleteUser = async (id) => {
  const q = `DELETE from users WHERE id = ?;`
  const [response] = await db.query(q, [id]);

  if (response.serverStatus === 2) {
    return "Usuario/s eliminado/s"
  }
}

export { getUsers, createUser, updateUser, deleteUser }