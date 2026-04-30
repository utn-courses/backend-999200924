import http from "node:http"
import { products } from "./data.js"

const mensaje = "Actualmente en san justo hacen 13° C"

// servidor http → http://localhost:40000
// el protocolo http es un protocolo de comunicación entre un cliente y un servidor, donde el cliente hace una petición y el servidor responde con una respuesta. El servidor escucha en un puerto específico (en este caso, el puerto 40000) y espera a que los clientes hagan peticiones. Cuando un cliente hace una petición, el servidor procesa la información de la petición y envía una respuesta de vuelta al cliente. En este ejemplo, el servidor responde con un mensaje de texto plano que dice "Actualmente en san justo hacen 13° C".

// Métodos posibles:
// GET → obtener información
// POST → enviar información
// PUT / PATCH → actualizar información
// DELETE → eliminar información

const server = http.createServer((informacionDelUsuario, respuesta) => {
  respuesta.setHeader("Access-Control-Allow-Origin", "*")

  const { method, url } = informacionDelUsuario

  if (url === "/") {
    respuesta.writeHead(200, { "Content-Type": "application/json; charset=utf-8" })
    respuesta.end(JSON.stringify({ status: "Hola, bienvenido al servidor" }))
  } else if (url === "/products" && method === "GET") {
    respuesta.writeHead(200, { "Content-Type": "application/json; charset=utf-8" })
    respuesta.end(JSON.stringify(products))
  } else {
    respuesta.writeHead(404, { "Content-Type": "application/json; charset=utf-8" })
    respuesta.end(JSON.stringify({ status: "Ruta no encontrada" }))
  }
})

// puertos → 65000
server.listen(40000, () => {
  console.log("Servidor en escucha!")
})

// host → localhost
// 40000

// http://localhost:40000