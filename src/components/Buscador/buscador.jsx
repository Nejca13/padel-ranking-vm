import React, { useState, useEffect } from "react"
import Categorias from "../categorias/categorias"
import styles from "./Buscador.module.css"

const Buscador = (props) => {
  const [jugadoresFiltrados, setJugadoresFiltrados] = useState([])
  const [totalJugadores, setTotalJugadores] = useState([])
  const [genero, setGenero] = useState(null)
  const [ciudad, setCiudad] = useState(null)
  const [cat, setCat] = useState(null)
  const [nombre, setNombre] = useState(null)
  const players = props.players

  const buttonete = () => {
    setJugadoresFiltrados(props.players)
    setCat(null)
    setGenero(null)
    setCiudad(null)
  }

  const filtrar = (e) => {
    e.preventDefault()
    if (nombre !== null) {
      const filtroNombre = totalJugadores.filter(
        (item) =>
          item.firstName.includes(nombre.toUpperCase()) ||
          item.lastName.includes(nombre.toUpperCase())
      )
      setJugadoresFiltrados(filtroNombre)
    }
    if (cat !== null && genero !== null && ciudad !== null) {
      const filtro = props.players.filter(
        (item) =>
          item.categoria === cat &&
          item.localidad === ciudad &&
          item.genero === genero
      )
      setJugadoresFiltrados(filtro)
    }
    if (cat !== null && genero !== null && ciudad === null) {
      const filtro = props.players.filter(
        (item) => item.categoria === cat && item.genero === genero
      )
      setJugadoresFiltrados(filtro)
    }
    if (genero !== null && ciudad !== null && cat === null) {
      const filtro = props.players.filter(
        (item) => item.localidad === ciudad && item.genero === genero
      )
      setJugadoresFiltrados(filtro)
    }
    if (cat !== null && ciudad !== null && genero === null) {
      const filtro = props.players.filter(
        (item) => item.categoria === cat && item.localidad === ciudad
      )
      setJugadoresFiltrados(filtro)
    }
    if (cat !== null && ciudad === null && genero === null) {
      const filtro = props.players.filter((item) => item.categoria === cat)
      setJugadoresFiltrados(filtro)
    }
    if (cat === null && ciudad !== null && genero === null) {
      const filtro = props.players.filter((item) => item.localidad === ciudad)
      setJugadoresFiltrados(filtro)
    }
    if (cat === null && ciudad === null && genero !== null) {
      const filtro = props.players.filter((item) => item.genero === genero)
      setJugadoresFiltrados(filtro)
    }
  }
  useEffect(() => {
    setTotalJugadores(players)
  }, [players])

  return (
    <div className={styles.container}>
      <div className={styles.buscador}>
        <form onSubmit={filtrar} onKeyUp={filtrar} className={styles.form}>
          <select className="" onChange={(e) => setGenero(e.target.value)}>
            <option defaultValue={null} value={null}>
              Genero
            </option>
            <option value="Hombre">Hombres</option>
            <option value="Mujer">Mujeres</option>
          </select>
          <select className="" onChange={(e) => setCat(e.target.value)}>
            <option defaultValue={null} value={null}>
              Categoria
            </option>
            <option value="8va">8va</option>
            <option value="7ma">7ma</option>
            <option value="6ta">6ta</option>
            <option value="5ta">5ta</option>
            <option value="4ta">4ta</option>
          </select>
          <select
            className=""
            placeholder="Localidades"
            onChange={(e) => setCiudad(e.target.value)}
          >
            <optgroup label="Localidades" />
            <option defaultValue={null} value={null}>
              Localidades
            </option>
            <option value="Coronel Belisle">Coronel Belisle</option>
            <option value="Chimpay">Chimpay</option>
            <option value="Choele Choel">Choele Choel</option>
            <option value="Darwin">Darwin</option>
            <option value="Lamarque">Lamarque</option>
            <option value="Luis Beltran">Luis Beltran</option>
            <option value="Rio Colorado">Rio Colorado</option>
          </select>
          
            <input
              id="filtrarNombre"
              type="text"
              placeholder="Buscar jugador por Nombre o Apellido"
              style={{ width: "90%", fontSize: "1rem", padding: "5px", height: "--line-height" }}
              onChange={(e) => setNombre(e.target.value)}
            />
          
          <button type="reset" onClick={filtrar}>
            Filtrar
          </button>
          <button type="reset" onClick={buttonete}>
            Reset
          </button>
        </form>
      </div>
      {jugadoresFiltrados.length !== 0 ? (
        <div>
          <Categorias players={jugadoresFiltrados} categoria="4ta" />
          <Categorias players={jugadoresFiltrados} categoria="5ta" />
          <Categorias players={jugadoresFiltrados} categoria="6ta" />
          <Categorias players={jugadoresFiltrados} categoria="7ma" />
          <Categorias players={jugadoresFiltrados} categoria="8va" />
          <Categorias players={jugadoresFiltrados} categoria="ERROR" />
        </div>
      ) : (
        <div>
          <Categorias players={totalJugadores} categoria="4ta" />
          <Categorias players={totalJugadores} categoria="5ta" />
          <Categorias players={totalJugadores} categoria="6ta" />
          <Categorias players={totalJugadores} categoria="7ma" />
          <Categorias players={totalJugadores} categoria="8va" />
        </div>
      )}
    </div>
  )
}

export default Buscador
