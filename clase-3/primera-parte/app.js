import fs from "node:fs"

// file system

const students = [
  { name: "Alice", age: 20 },
  { name: "Bob", age: 22 },
  { name: "Charlie", age: 19 }
]

const createFile = (filename, ext, content) => {
  // lalala
  // txt
  // lalala.txt
  // Hola mundo!
  const filePath = `${filename}.${ext}`
  fs.writeFileSync(filePath, content)
  console.log(`Archivo ${filePath} creado con éxito.`)
}

createFile("../../lalala", "json", JSON.stringify(students, null, 2))