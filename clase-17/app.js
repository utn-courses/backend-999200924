import http from 'node:http';
import bcrypt from "bcryptjs"

const users = [{ id: 1, usename: "Gabo", email: "gabo@gmail.com", password: "pepe123" }]

const PORT = 3001

const app = http.createServer((req, res) => {
  const { url, method } = req

  switch (url) {
    case "/":
      res.writeHead(200, { "Content-Type": "application/json" })
      return res.end(JSON.stringify({ status: 1 }))
    case "/users":
      if (method === "GET") {
        res.writeHead(200, { "Content-Type": "application/json" })
        return res.end(JSON.stringify(users))
      }

      if (method === "POST") {
        // 🚨🚨
        let body = ""

        req.on("data", (chunk) => {
          body += chunk
        })

        req.on("end", async () => {
          // generar el objeto del usuario, parsear el body
          // JSON.parse(body)
          const parsedBody = JSON.parse(body)

          const { username, email, password } = parsedBody

          if (!username || !email || !password) {
            res.writeHead(400, { "content-type": "application/json" })
            return res.end(JSON.stringify({ status: "Invalid data" }))
          }

          const foundUser = users.find(user => user.email === email)

          if (foundUser) {
            res.writeHead(409, { "content-type": "application/json" })
            return res.end(JSON.stringify({ status: "Conflict, username already exists" }))
          }

          // encriptar la contraseña
          const hashedPassword = await bcrypt.hash(password, 10)

          console.log(hashedPassword)

          const newUser = {
            id: crypto.randomUUID(),
            username,
            email,
            password: hashedPassword
          }

          users.push(newUser)

          res.writeHead(201, { "Content-Type": "application/json" })
          return res.end(JSON.stringify(newUser))
        })
        break
      }
    default:
      res.writeHead(404, { "Content-Type": "application/json" })
      return res.end(JSON.stringify({ status: 0 }))
  }
})

app.listen(PORT, () => {
  console.log(`Servidor en escucha por el puerto http://localhost:${PORT}`)
})