import { beneficiosData } from "../data/beneficiosData"
import { fechaActual } from "../utils/fechaActual"
import { Beneficio } from "./Beneficio"

const Beneficios = () => {

  const fecha = fechaActual()

  return (
    <section>
      <h2>Nuestros beneficios</h2>
      <h2>Hoy es {fecha}</h2>
      <ul>
        {
          beneficiosData.map((beneficio) => <Beneficio key={beneficio.id} beneficio={beneficio} />
          )
        }
      </ul>
    </section>
  )
}

export { Beneficios }