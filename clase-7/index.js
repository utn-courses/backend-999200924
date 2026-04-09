import { sumar, area, conversor } from "./herramientas.js"

const [, , operacion, n1, n2] = process.argv

let mensaje

switch (operacion) {
  case "sumar": {
    const resultado = sumar(n1, n2)
    mensaje = typeof resultado === "string"
      ? resultado
      : `El resultado de la suma ${n1}+${n2}=${resultado}`
    break
  }
  case "area": {
    const resultado = area(n1, n2)
    mensaje = typeof resultado === "string"
      ? resultado
      : `El área calculada de base(${n1})*altura(${n2})=${resultado}`
    break
  }
  case "conversor":
    mensaje = `La hora actual en España es: ${conversor()}`
    break
  default:
    mensaje = `
╔══════════════════════════════════════╗
║     Bienvenido a la calculadora      ║
╠══════════════════════════════════════╣
║                                      ║
║ Operaciones disponibles              ║
║    sumar <n1> <n2>                   ║
║    area <base> <altura>              ║
║    conversor                         ║
║                                      ║
║ Ejemplos:                            ║
║   node app.js sumar 10 5             ║
║   node app.js area 4 3               ║
║   node app.js conversor              ║
╚══════════════════════════════════════╝
    `
}

console.log(mensaje)