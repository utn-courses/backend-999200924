// Variables
// Memoria RAM -> random access memory
const nombre = "Gabriel"
console.log(nombre.toUpperCase())

// nombre = "María"

// declaración
let edad = 31
// reasignación
edad = 32

const calcularEdad = () => {
  let edad = 32
}

// string
// number
// boolean
// null
// undefined
// object
// array

const apellido = "Alberini"
const hash = "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
const uuid = "69b95d81-2c8c-83e9-b14c-9f9ddca32fce"
const password = "pepe123"

// a mi me dicen "gabo"
console.log('a mi me dicen "gabo"')

// template string
console.log(`hola, mi apellido es ${apellido}`)

console.log(`Es verdad que 1 es mayor a 2?: ${1 > 2}`)

console.log(`Hola, ${nombre.toUpperCase()}`)

console.log(`Hola!`)

// --------------------------

const positivo = 1
const negativo = -1
const decimal = 1.1

console.log(typeof positivo)
console.log(typeof negativo)
console.log(typeof decimal)

// -----------------------------------

const verdadero = true
const falso = false

// operadores aritméticos SIEMPRE retornan un boolean
console.log(1 === 1)
console.log(4 > 10)

// tienden a verdadero o falso
console.log("Que valor logico es el 1:", !!1)
console.log("Que valor logico es el 0:", !!0)

const alumnosAprobados = 0

if (alumnosAprobados) {
  console.log(":)")
} else {
  console.log(":(")
}

console.log("Que valor logico de mi lista de colores con solo el azul:", !!["azul"])
console.log("Que valor logico de mi lista de colores vacia:", !![])
console.log("Que valor logico tienen unos string vacio", !!"")
console.log("Que valor logico tienen un string con espacio", !!" ")


// --------------------------------
// negación
const valor = 1

console.log(!valor)


const years = 19

const calculoEdad = years < 18

if (!calculoEdad) {
  console.log("puedes pasar")
}


console.log(!!1, "<- valor booleano")
console.log(!1, "<- inversión del valor booleano")

// null -> ausencia de valor
const avion = null // -> valor humano
let mascota

console.log(mascota)

mascota = "arandela"

console.log(mascota)

// las constantes necesitan un valor inicial
// const colorFav
// console.log(colorFav)

// datos complejos
// arrays y objetos

const colores = ["azul", "rojo", "amarillo", "violeta", "rosa", "caqui"]
console.log(colores[3])
console.log(colores.length)

const color = colores.find((color) => color.startsWith("c"))
const coloresFiltrados = colores.filter((color) => color.length > 4)

console.log(coloresFiltrados)

// object
// colección de datos
// los objetos describen una entidad

// mascota

const arandela = {
  edad: 6,
  color: "marrón",

  saludar() {
    console.log("Hola me llamo arandela")
  }
}

console.log(arandela.saludar())