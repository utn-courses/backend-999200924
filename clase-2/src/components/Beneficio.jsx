const Beneficio = ({ beneficio }) => {
  // destructuring
  const { id, titulo, descripcion } = beneficio

  return <li>
    <p>ID: {id}</p>
    <h4>{titulo}</h4>
    <p>{descripcion}</p>
  </li>
}

export { Beneficio }