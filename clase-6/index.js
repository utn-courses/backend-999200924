// input → process → output
// console.log(process.argv)

const n1 = process.argv[3]
const n2 = process.argv[4]

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

const operacion = process.argv[2]
let resultado = 0
let mensaje = ""

switch (operacion) {
  case "sumar":
    resultado = sumar(n1, n2)
    if (typeof resultado === "string") {
      mensaje = resultado
    } else {
      mensaje = `El resultado de la suma ${n1}+${n2}=${resultado}`
    }
    break
  case "area":
    resultado = area(n1, n2)
    if (typeof resultado === "string") {
      mensaje = resultado
    } else {
      mensaje = `El area calculada de base(${n1})*altura(${n2})=${resultado}`
    }
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
║                                      ║
║ Ejemplos:                            ║
║   node app.js sumar 10 5             ║
║   node app.js area 4 3               ║
╚══════════════════════════════════════╝
  `
    break
}

console.log(mensaje)
