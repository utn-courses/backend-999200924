import http from "node:http"
import { products } from "./data.js"

const mensaje = "Actualmente en san justo hacen 13° C"

// Métodos posibles:
// GET → obtener información
// POST → enviar información
// PUT / PATCH → actualizar información
// DELETE → eliminar información

const server = http.createServer((informacionDelUsuario, respuesta) => {
  respuesta.setHeader("Access-Control-Allow-Origin", "*")

  const { method, url } = informacionDelUsuario

  if (url === "/" && method === "GET") {
    respuesta.writeHead(200, { "Content-Type": "application/json; charset=utf-8" })
    respuesta.end(JSON.stringify({ status: "Hola, bienvenido al servidor" }))
  } else if (url === "/products" && method === "GET") {
    respuesta.writeHead(200, { "Content-Type": "application/json; charset=utf-8" })
    respuesta.end(JSON.stringify(products))
  } else if (url.startsWith("/products/") && method === "GET") {
    const id = Number(url.split("/")[2])

    const foundProduct = products.find((product) => product.id === id)

    if (!foundProduct) {
      respuesta.writeHead(404, { "Content-Type": "application/json; charset=utf-8" })
      return respuesta.end(JSON.stringify({ status: "Product not found" }))
    }

    respuesta.writeHead(200, { "Content-Type": "application/json; charset=utf-8" })
    respuesta.end(JSON.stringify(foundProduct))
  } else if (url === "/products" && method === "POST") {
    let body = ""

    informacionDelUsuario.on("data", (chunk) => {
      body += chunk
    })

    informacionDelUsuario.on("end", () => {
      const data = JSON.parse(body)

      // CREAR CON LA DATA RECIBIDA EL OBJ DEL NUEVO PRODUCTO (LÓGICA DE NEGOCIO)

      const { name, price, category, stock } = data

      if (!name || !price || !category || !stock) {
        respuesta.writeHead(400, { "content-type": "application/json; charset=utf-8" })
        return respuesta.end(JSON.stringify({ status: "Falta información requerida" }))
      }

      const newProduct = {
        id: products.length + 1,
        name: name,
        price: price,
        category: category,
        stock: stock
      }

      // AGREGA A LA BASE DE DATOS
      // un array
      // un archivo
      // una base de datos
      products.push(newProduct)
      respuesta.writeHead(201, { "content-type": "application/json; charset=utf-8" })
      respuesta.end(JSON.stringify(newProduct))
    })
  } else if (url.startsWith("/products/") && method === "DELETE") {
    const id = +url.split("/")[2]

    if (!id) {
      respuesta.writeHead(400, { "Content-Type": "application/json; charset=utf-8" })
      return respuesta.end(JSON.stringify({ status: "ID inválido o inexistente" }))
    }

    const index = products.findIndex(product => product.id === id)

    if (index === -1) {
      respuesta.writeHead(404, { "Content-Type": "application/json; charset=utf-8" })
      return respuesta.end(JSON.stringify({ status: "Product not found" }))
    }

    const deletedProduct = products.splice(index, 1)[0]

    respuesta.writeHead(200, { "Content-Type": "application/json; charset=utf-8" })
    respuesta.end(JSON.stringify(deletedProduct))
  } else {
    respuesta.writeHead(404, { "Content-Type": "application/json; charset=utf-8" })
    respuesta.end(JSON.stringify({ status: "Recurso no encontrado" }))
  }
})

// 65535 es el puerto máximo que se puede usar, pero es recomendable usar puertos por encima del 3000 para evitar conflictos con otros servicios

const PORT = 3001

server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`)
})
