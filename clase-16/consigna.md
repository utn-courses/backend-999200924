# Ejercicio: Mini servidor HTTP de usuarios

Desarrollar un mini servidor HTTP utilizando exclusivamente el módulo `node:http`.

El servidor debe permitir:

- Obtener todos los usuarios mediante una ruta `GET /users`
- Crear usuarios mediante una ruta `POST /users`

## Estructura de cada usuario

Cada usuario debe tener:

- id
- username
- password

## Requisitos

### ID automático

El `id` debe generarse automáticamente utilizando:

```js
crypto.randomUUID()
```

### Contraseña hasheada

La contraseña no debe almacenarse en texto plano.

Debe guardarse utilizando un hash con:

```js
createHash("sha256")
```

## Almacenamiento

La información de los usuarios puede almacenarse en un array local.

## Validaciones

Validar que:

- `username` exista
- `password` exista

En caso de faltar información:

- responder con un status code adecuado
- devolver un mensaje de error en formato JSON

## Objetivos

Practicar:

- Servidores HTTP con Node.js
- Métodos GET y POST
- Lectura del body de una request
- Manejo de JSON
- Uso de `crypto.randomUUID`
- Hash de contraseñas
- Validaciones básicas
- Respuestas HTTP
