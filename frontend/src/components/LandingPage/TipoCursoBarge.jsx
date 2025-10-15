function TipoCursoBadge ({ idTipo, handleSubmit, tipo, icono }) {
  return(
    <>
      <button onClick={() => handleSubmit(idTipo)} className="btn btn-outline-info">
        <i className={icono}></i> {tipo}
      </button>
    </>
  )
}

export default TipoCursoBadge;