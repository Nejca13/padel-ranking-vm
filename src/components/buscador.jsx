const Buscador = (props) => {
  return (
    <div className="row mb-2">
      <select className="form-select col" aria-label="Default select example">
        <option selected value="">Genero</option>
        <option value="1">Hombres</option>
        <option value="2">Mujeres</option>
      </select>
      <select className="form-select col" aria-label="Default select example">
        <option selected value="">Categoria</option>
        <option value="8va">8va</option>
        <option value="7ma">7ma</option>
        <option value="6ta">6ta</option>
        <option value="5ta">5ta</option>
        <option value="4ta">4ta</option>
      </select>
      <select className="form-select col" aria-label="Default select example" placeholder="Localidades">
        <optgroup label="Localidades" />
        <option value="todos" selected>Todas</option>
        <option value="Coronel Belisle">Coronel Belisle</option>
        <option value="Chimpay">Chimpay</option>
        <option value="Choele Choel">Choele Choel</option>
        <option value="Darwin">Darwin</option>
        <option value="Lamarque">Lamarque</option>
        <option value="Luis Beltran">Luis Beltran</option>
        <option value="Rio Colorado">Rio Colorado</option>
      </select>
      <input type="text" className="col" />
    </div>
  );
};

export default Buscador;
