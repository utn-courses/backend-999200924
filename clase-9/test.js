const saludar1 = async () => {
  setTimeout(() => {
    console.log("Hola 1.")
  }, 5000)
}

const saludar2 = () => {
  console.log("Hola 2.")
}
const saludar3 = () => {
  console.log("Hola 3.")
}

saludar1()
saludar2()
saludar3()