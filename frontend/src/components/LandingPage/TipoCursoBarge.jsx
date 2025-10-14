function TipoCursoBadge ({ handleSubmit, tipo, icono }) {
  return(
    <>
      <button onClick={() => handleSubmit({tipo})} className="btn btn-outline-info">
        {icono} {tipo}
      </button>
    </>
  )
}

export default TipoCursoBadge;