// TypeScript es un superset de JavaScript que agrega tipado estático.

// Inferencia de tipo de dato
let age = 31

let lastname: string = "Alberini"
let pet: boolean = true
let launch: undefined = undefined

interface Pet {
  colors: string[],
  sisters: string[],
  years: number,
  favoritesFoods?: string[]
}

const arandela: Pet = {
  colors: ["brown", "white"],
  sisters: ["peperina", "tuerca"],
  years: 6,
}

const peperina: Pet = {
  colors: ["white"],
  sisters: ["arandela", "tuerca"],
  years: 1,
  favoritesFoods: []
}

const greeting = (name: string): string => {
  return `Hola ${name}!`
}

let colors: string[] = ["red", "yellow", "pink", "orange", "brown"]

const sayHi = greeting("Axel")

// console.log(sayHi)

let id: string | number = crypto.randomUUID()

id = 1

// console.log(id)


// Retorna el indice del color a encontrar
const findIndexColor = (colors: string[], myColor: string): string | number => {
  const foundColorIndex = colors.findIndex(color => color === myColor)

  if (foundColorIndex === -1) {
    return `${myColor} no existe en nuestra base de datos`
  }

  return foundColorIndex
}

console.log(findIndexColor(colors, "brown"))