const Hero = ({ titulo, slogan = "Sin slogan" }) => {
  return (
    <section>
      <h1>{titulo}</h1>
      {
        <h3>{slogan}</h3>
        // renderizado condicional, si slogan es undefined, null, false, 0, "" no se renderiza el h3
        // slogan && <h3>{slogan}</h3>
      }
    </section>
  );
}

export { Hero }