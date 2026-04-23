/**
 * ==========================================
 * EJERCICIOS: CONTROL DE ERRORES EN JAVASCRIPT
 * ==========================================
 * Instrucciones:
 * - Implementar manejo de errores con try/catch donde corresponda
 * - Validar entradas
 * - Evitar que el programa “rompa”
 * - Usar Node.js cuando se solicite
 */

/**
 * 1. División segura
 * Objetivo: Dividir dos números evitando errores por división por cero
 */
function dividir(a, b) {
  // TODO: validar tipos
  // TODO: evitar división por 0
}

/**
 * 2. Parseo seguro de JSON
 * Objetivo: Recibir un string JSON y devolver objeto o error controlado
 */
function parsearJSON(texto) {
  // TODO: usar try/catch con JSON.parse
}

/**
 * 3. Búsqueda en array
 * Objetivo: Buscar un elemento en un array y lanzar error si no existe
 */
function buscarElemento(array, elemento) {
  // TODO: validar array
  // TODO: lanzar error si no se encuentra
}

/**
 * 4. Validación de edad
 * Objetivo: Validar que la edad sea número y mayor a 0
 */
function validarEdad(edad) {
  // TODO: lanzar errores personalizados
}

/**
 * 5. Suma de números desde argumentos de Node
 * Objetivo: leer process.argv y sumar números
 */
function sumarArgumentos() {
  // TODO: manejar NaN
  // TODO: validar que haya argumentos
  const args = process.argv.slice(2);
}

/**
 * 6. Lectura simulada de archivo (Node)
 * Objetivo: simular lectura de archivo y manejar error si no existe
 */
function leerArchivoSimulado(nombre) {
  // TODO: simular error si nombre === "noexiste.txt"
}

/**
 * 7. Convertidor de strings a número seguro
 * Objetivo: convertir string a número con validación
 */
function stringToNumber(valor) {
  // TODO: manejar NaN con throw
}

/**
 * 8. Promesa con error controlado
 * Objetivo: crear una promesa que falle si el input es inválido
 */
function operacionAsincrona(valido) {
  // TODO: resolver o rechazar
}

/**
 * 9. Filtrar datos con validación
 * Objetivo: filtrar números mayores a X y validar array
 */
function filtrarMayores(array, limite) {
  // TODO: validar array y límite
}

/**
 * 10. Calculadora con operaciones seguras
 * Objetivo: implementar suma, resta, multiplicación y división con control de errores
 */
function calculadora(a, b, operacion) {
  // TODO: validar inputs
  // TODO: manejar operación inválida
}

/**
 * EXPORT (opcional para Node)
 */
export {
  dividir,
  parsearJSON,
  buscarElemento,
  validarEdad,
  sumarArgumentos,
  leerArchivoSimulado,
  stringToNumber,
  operacionAsincrona,
  filtrarMayores,
  calculadora
};