import { useState } from 'react'

const Contacto = () => {
  const [email, setEmail] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [confirmacion, setConfirmacion] = useState(null)

  const manejadorDeForm = (evento) => {
    evento.preventDefault()

    const mensajeEnviado = { email, mensaje }
    console.log(mensajeEnviado)

    setEmail('')
    setMensaje('')

    setConfirmacion('¡Mensaje enviado con éxito!')
  }

  const manejadorDeEmail = (evento) => {
    setEmail(evento.target.value)
  }

  const manejadorDeMensaje = (evento) => {
    setMensaje(evento.target.value)
  }

  return (
    <section>
      <h2>Contactanos</h2>
      {
        confirmacion
          ? <p>{confirmacion}</p>
          : <form onSubmit={manejadorDeForm}>
            <input
              type="email"
              placeholder="Correo electrónico"
              onChange={manejadorDeEmail}
              value={email}
            />
            <textarea
              placeholder="Mensaje"
              onChange={manejadorDeMensaje}
              value={mensaje}
            ></textarea>
            <button>Enviar</button>
          </form>
      }
    </section>
  )
}

export { Contacto }