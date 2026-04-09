import { validarNumeros } from "./utilidades.js"

const sumar = (a, b) => {
  const resultado = validarNumeros(a, b)
  return typeof resultado === "string" ? resultado : resultado[0] + resultado[1]
}

const area = (base, altura) => {
  const resultado = validarNumeros(base, altura)
  return typeof resultado === "string" ? resultado : resultado[0] * resultado[1]
}

const conversor = () => {
  const ahora = new Date()
  const horaEs = (ahora.getHours() + 5) % 24 // ajuste con rollover
  const minutosEs = ahora.getMinutes().toString().padStart(2, "0")
  return `${horaEs}:${minutosEs}`
}

export { sumar, area, conversor }