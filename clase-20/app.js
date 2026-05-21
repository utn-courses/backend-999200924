import express from 'express'
import bcrypt, { hash } from 'bcryptjs';
import { rateLimit } from 'express-rate-limit'
import jwt from "jsonwebtoken"

// const server = http.createServer(() => {})

const products = [
  {
    id: 1,
    name: "Notebook Lenovo IdeaPad",
    price: 850000,
    category: "Tecnología",
    stock: 12,
    available: true
  },
  {
    id: 2,
    name: "Mouse Logitech G203",
    price: 35000,
    category: "Accesorios",
    stock: 30,
    available: true
  },
  {
    id: 3,
    name: "Teclado Mecánico Redragon",
    price: 78000,
    category: "Accesorios",
    stock: 8,
    available: true
  },
  {
    id: 4,
    name: "Monitor Samsung 24 pulgadas",
    price: 220000,
    category: "Tecnología",
    stock: 5,
    available: true
  },
  {
    id: 5,
    name: "Auriculares Bluetooth JBL",
    price: 65000,
    category: "Audio",
    stock: 0,
    available: false
  },
  {
    id: 6,
    name: "Smartphone Motorola G84",
    price: 420000,
    category: "Telefonía",
    stock: 15,
    available: true
  },
  {
    id: 7,
    name: "Webcam Full HD",
    price: 45000,
    category: "Tecnología",
    stock: 10,
    available: true
  },
  {
    id: 8,
    name: "Disco SSD 1TB Kingston",
    price: 98000,
    category: "Hardware",
    stock: 7,
    available: true
  }
];

const users = []

const server = express()
// permite que las peticiones puedan enviar body JSON
server.use(express.json())

const PORT = 3001

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes).

  handler: (request, response) => {
    response.status(429).json({ error: "Too many requests, please try again later." })
  }
})

// Middleware global → aplica a todas las request
// server.use(limiter)

server.get("/", (request, response) => {
  response.json({ data: 1 })
})

// Obtener los productos
server.get("/products", (request, response) => {
  response.json(products)
})

// Obtener un producto
server.get("/products/:id", (request, response) => {
  const id = Number(request.params.id)
  const foundProduct = products.find(product => product.id === id)
  if (!foundProduct) response.status(404).json({ error: "Not found" })
  response.json(foundProduct)
})

// Agregar un producto
server.post("/products", (request, response) => {
  const body = request.body
  const newProduct = {
    id: products.length + 1, ...body
  }
  products.push(newProduct)
  response.json(newProduct)
})

// Actualizando un producto
server.put("/products/:id", (request, response) => {
  const id = +request.params.id
  const body = request.body

  const foundProduct = products.find(product => product.id === id)

  if (body.name) foundProduct.name = body.name
  if (body.price) foundProduct.price = body.price
  if (body.category) foundProduct.category = body.category
  if (body.stock) foundProduct.stock = body.stock
  if (body.available) foundProduct.available = body.available
  response.json(foundProduct)
})

server.delete("/products/:id", (request, response) => {
  const { id } = request.params
  const index = products.findIndex(product => product.id === Number(id))
  if (index === -1) {
    return response.status(404).json({ error: "Not found" })
  }
  products.splice(index, 1)
  response.json({ message: "Producto eliminado" })
})

server.post("/auth/register", async (request, response) => {
  const { body } = request

  const id = users.length + 1

  const { password, username, email } = body

  // db → async
  // users[] → sync
  const foundUser = users.find(user => user.email === email)

  if (foundUser) {
    return response.status(409).json({ error: "Conflict, user already exists" })
  }

  const hashPassword = await bcrypt.hash(password, 10)

  const newUser = {
    id,
    username,
    email,
    password: hashPassword,
  }

  users.push(newUser)

  const { password: passwordNewUser, ...data } = newUser

  response.json(data)
})

server.post("/auth/login", limiter, async (request, response) => {
  const { body, ip } = request

  const { email, password } = body

  if (!email || !password) {
    return response.status(401).json({ error: "Unauthorized" })
  }

  const foundUser = users.find(user => user.email === email)

  if (!foundUser) {
    return response.status(403).json({ error: "Unauthorized" })
  }

  const isValid = await bcrypt.compare(password, foundUser.password)

  if (!isValid) {
    return response.status(403).json({ error: "Unauthorized" })
  }

  // TOKEN JWT → Json Web Token → string
  const payload = { id: foundUser.id, username: foundUser.username, email: foundUser.email }
  const secretKey = "contraseñasupersegurayprivadaquenadietienequeconocer"

  const token = jwt.sign(payload, secretKey, { expiresIn: "1m" })

  response.json({ token })
})

server.listen(PORT, () => {
  console.log(`Servidor en escucha por el puerto http://localhost:${PORT}`)
})
