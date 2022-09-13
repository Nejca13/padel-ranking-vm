import React, { useEffect, useState } from "react"
import { dataBase } from "../../firebase"
import { collection, getDocs } from "firebase/firestore"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDeleteLeft, faEdit, faGear } from "@fortawesome/free-solid-svg-icons"
import styles from './cPanel.module.css'

const ControlPanel = () => {
  const [players, setPlayers] = useState(null)

  useEffect(() => {
    obtenerDatos()
  }, [])
  const obtenerDatos = async () => {
    const playersCollection = collection(dataBase, "players")
    const data = await getDocs(playersCollection)
    setPlayers(data.docs.map((doc) => doc.data()))
  }

  return (
    <div className="">
      <div className="">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Cuidad</th>
              <th>ID</th>
              <th>
                <FontAwesomeIcon icon={faGear} />{" "}
              </th>
            </tr>
          </thead>
          <tbody>
            {players &&
              players.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.firstName + " " + item.lastName}</td>
                  <td>{item.email}</td>
                  <td>{item.localidad}</td>
                  <td>{item.id}</td>
                  <td className={styles.opt}> 
                    <button>
                      <FontAwesomeIcon icon={faEdit} />{" "}
                    </button>
                    <button className={styles.btnDelete}>
                      <FontAwesomeIcon icon={faDeleteLeft}/>{" "}
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ControlPanel
