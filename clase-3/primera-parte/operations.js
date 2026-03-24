const add = (a, b) => {
  if (typeof a !== "number" || typeof b !== "number") {
    return "Operación invalida"
  }
  return a + b
}

const divide = (a, b) => {
  if (b === 0) {
    return "Operación invalida"
  }
  return a / b
}

let dato = 1
dato = "lalala"
console.log(dato)

export { add, divide }