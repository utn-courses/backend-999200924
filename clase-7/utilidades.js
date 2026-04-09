const validarNumeros = (...valores) => {
  const numeros = valores.map(Number)
  if (valores.some(v => v === undefined)) return "Debes ingresar datos."
  if (numeros.some(isNaN)) return "Operación inválida."
  return numeros
}

export { validarNumeros }