// a / b → parámetros → declaración de lo que necesita
const sumar = (a, b) => {
  // validar
  if (!a || !b) {
    return "Debes ingresar datos."
  }

  const aToNumber = Number(a)
  const bToNumber = Number(b)

  if (isNaN(aToNumber) || isNaN(bToNumber)) {
    return "Operación invalida."
  }

  return aToNumber + bToNumber;
};

const area = (base, altura) => {
  if (!base || !altura) {
    return "Debes ingresar datos."
  }

  const baseToNumber = Number(base)
  const alturaToNumber = Number(altura)

  if (isNaN(baseToNumber) || isNaN(alturaToNumber)) {
    return "Operación invalida."
  }

  return baseToNumber * alturaToNumber;
};

export { sumar, area }