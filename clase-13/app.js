import http from "node:http"

const mensaje = "Tomá un dato desde el servidor :)"

const server = http.createServer((informacionDelUsuario, respuesta) => {
  console.log("Alguien hizo una petición!")
  // toda la información de la petición
  console.log("Método:", informacionDelUsuario.method)
  console.log("URL:", informacionDelUsuario.url)
  console.log("Headers:", informacionDelUsuario.headers)
  console.log("HTTP Version:", informacionDelUsuario.httpVersion)
  console.log("Host:", informacionDelUsuario.headers.host)
  console.log("User-Agent:", informacionDelUsuario.headers["user-agent"])
  console.log("Accept:", informacionDelUsuario.headers.accept)
  console.log("Remote Address:", informacionDelUsuario.socket.remoteAddress)
  console.log("Remote Port:", informacionDelUsuario.socket.remotePort)

  respuesta.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" })
  respuesta.end(mensaje)
})

// puertos → 65000
server.listen(40000, () => {
  console.log("Servidor en escucha!")
})

// host → localhost
// 40000

// http://localhost:40000