let edad = 31

edad = "lalala"

let colores = ["red", "yellow", "pink", "orange", "brown", 123]

colores.forEach(c => {
  if (typeof c !== "string") {
    console.log(c, "<- no puede estar en el array de string")
  }
}) 