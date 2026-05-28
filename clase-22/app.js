import express from 'express'
import bcrypt, { hash } from 'bcryptjs';
import { rateLimit } from 'express-rate-limit'
import jwt from "jsonwebtoken"
import { connect, model, Schema } from 'mongoose';

const connectDb = async () => {
  try {
    await connect("mongodb://localhost:27017/db_backend_utn")
    console.log("✅ Conectado a MongoDb")
  } catch (error) {
    console.log("❌ Error al conectarse a MongoDb", error.message)
  }
}

// schema para crear el módelo
const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, {
  versionKey: false,
  timestamps: true
})

// modelos para utilizar la db
const User = model("User", userSchema)

const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, default: 0 },
  category: { type: String, default: "Sin categoria" },
  stock: { type: Number, default: 0 },
  available: { type: Boolean, default: false },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true }
}, {
  versionKey: false,
  timestamps: true
})

const Product = model("Product", productSchema)

const server = express()
// permite que las peticiones puedan enviar body JSON
server.use(express.json())

const PORT = 3001

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes).

  handler: (req, res) => {
    res.status(429).json({ error: "Too many requests, please try again later." })
  }
})

const authMiddleware = (req, res, next) => {
  const header = req.headers.authorization

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, error: "Unauthorized" })
  }

  const token = header.split(" ")[1]

  try {
    const decoded = jwt.verify(token, "contraseñasupersegurayprivadaquenadietienequeconocer")

    req.userLogged = decoded

    next()
  } catch (e) {
    res.status(401).json({ success: false, error: e.message })
  }
}

server.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API REST con Express y MongoDB"
  })
})

// Obtener los productos
server.get("/products", authMiddleware, async (req, res) => {
  try {
    const userLogged = req.userLogged
    const filterProducts = await Product.find({ userId: userLogged.id })
    res.json({
      success: true,
      data: filterProducts,
      message: "Producst fetched successfully"
    })
  } catch (error) {
    res.status(500).json({ success: false, error: "Error fetching products" })
  }
})

// Obtener un producto
server.get("/products/:id", authMiddleware, async (req, res) => {
  try {
    const id = req.params.id
    const foundProduct = await Product.findById(id)
    if (!foundProduct) res.status(404).json({ error: "Not found" })
    res.json(foundProduct)
  } catch (error) {
    res.status(400).json({ error: "Invalid ID format" })
  }
})

// Agregar un producto
server.post("/products", authMiddleware, async (req, res) => {
  try {
    const body = req.body
    const userLogged = req.userLogged

    const newProduct = await Product.create({
      name: body.name,
      price: body.price,
      category: body.category,
      stock: body.stock,
      available: body.stock > 0,
      userId: userLogged.id
    })

    newProduct.save()

    const publicDataProduct = {
      id: newProduct._id,
      name: newProduct.name,
      price: newProduct.price,
      category: newProduct.category,
      stock: newProduct.stock,
      available: newProduct.available,
      createdAt: newProduct.createdAt,
      updatedAt: newProduct.updatedAt
    }

    res.json({
      success: true,
      data: publicDataProduct,
      message: "Product created successfully"
    })
  } catch (error) {
    res.status(500).json({ success: false, error: "Error creating product" })
  }
})

// Actualizando un producto
server.put("/products/:id", authMiddleware, async (req, res) => {
  try {
    const id = req.params.id
    const body = req.body

    const updatedProduct = await Product.findByIdAndUpdate(id, { ...body, available: body.stock > 0 }, { new: true })

    if (!updatedProduct) {
      return res.status(404).json({ success: false, error: "Product not found" })
    }

    res.json({
      success: true,
      data: updatedProduct,
      message: "Product updated successfully"
    })
  } catch (error) {
    res.status(400).json({ success: false, error: "Invalid ID format" })
  }
})

server.delete("/products/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params

    const deletedProduct = await Product.findByIdAndDelete(id)

    if (!deletedProduct) {
      return res.status(404).json({ success: false, error: "Product not found" })
    }

    res.json({ success: true, data: deletedProduct, message: "Product deleted successfully" })
  } catch (error) {
    res.status(400).json({ success: false, error: "Invalid ID format" })
  }
})

server.post("/auth/register", async (req, res) => {
  try {
    const { body } = req
    const { password, username, email } = body

    const foundUser = await User.findOne({ email })

    if (foundUser) {
      return res.status(409).json({ success: false, error: "Conflict, user already exists" })
    }

    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_-]).{8,}$/
    if (!regex.test(password)) {
      return res.status(400).json({ success: false, error: "Invalid password. It must contain at least 8 characters, one uppercase letter, one number, and one special character." })
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({
      username,
      email,
      password: hashPassword,
    })

    newUser.save()

    const publicDataUser = {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt
    }

    res.json({
      success: true,
      data: publicDataUser,
      message: "User registered successfully"
    })
  } catch (error) {
    res.status(500).json({ success: false, error: "Error registering user" })
  }
})

server.post("/auth/login", limiter, async (req, res) => {
  try {
    const { body } = req

    const { email, password } = body

    if (!email || !password) {
      return res.status(401).json({ success: false, error: "Unauthorized" })
    }

    const foundUser = await User.findOne({ email })

    if (!foundUser) {
      return res.status(403).json({ success: false, error: "Unauthorized" })
    }

    const isValid = await bcrypt.compare(password, foundUser.password)

    if (!isValid) {
      return res.status(403).json({ success: false, error: "Unauthorized" })
    }

    // TOKEN JWT → Json Web Token → string
    const payload = { id: foundUser._id, username: foundUser.username, email: foundUser.email }
    const secretKey = "contraseñasupersegurayprivadaquenadietienequeconocer"

    const token = jwt.sign(payload, secretKey, { expiresIn: "1h" })

    res.json({ success: true, data: { token }, message: "Login successful" })
  } catch (error) {
    res.status(500).json({ success: false, error: "Error logging in" })
  }
})

server.listen(PORT, () => {
  connectDb()
  console.log(`Servidor en escucha por el puerto http://localhost:${PORT}`)
})
