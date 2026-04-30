## Consigna: Primer servidor con múltiples métodos HTTP

Vas a modificar el servidor que ya tenés creado en Node.js para que pueda **recibir distintos métodos HTTP** y responder con un **mensaje de texto diferente en cada caso**.

---

### Objetivo

Entender cómo el servidor detecta el método (`GET`, `POST`, `PUT`, `DELETE`) y responde en consecuencia.

---

### Requisitos

1. Trabajar sobre la ruta:  
   `/products`

2. El servidor debe responder distinto según el método:

   - `GET /products` → "Recibí una petición GET"
   - `POST /products` → "Recibí una petición POST"
   - `PUT /products` → "Recibí una petición PUT"
   - `DELETE /products` → "Recibí una petición DELETE"

3. Si la ruta es `/products` pero el método no es uno de los anteriores:
   - "Método no permitido"

4. Si la ruta no existe:
   - "Ruta no encontrada"

---

### Pistas

Ya tenés acceso a:

```js
const { method, url } = informacionDelUsuario
```

Podés usar condicionales como:

```js
if (url === "/test" && method === "GET") {
  // ...
}
```

---

### Pruebas con Bruno

Crear 4 requests:

- GET → http://localhost:40000/products
- POST → http://localhost:40000/products
- PUT → http://localhost:40000/products
- DELETE → http://localhost:40000/products
  
- Solo responder un JSON simple
