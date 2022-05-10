import React, { useEffect, useState } from "react";
import { dataBase } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { Table } from "react-bootstrap";

const ControlPanel = () => {
  const [players, setPlayers] = useState(null);

  useEffect(() => {
    obtenerDatos();
  }, []);
  const obtenerDatos = async () => {
    const playersCollection = collection(dataBase, "players");
    const data = await getDocs(playersCollection);
    setPlayers(data.docs.map((doc) => doc.data()));
  };

  return (
    <div className="d-flex justify-content-center my-5">
      <div className="cPanelDiv">
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Cuidad</th>
            <th>ID</th>
          </tr>
        </thead>
        <tbody>
          {players &&
            players.map((item, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{item.firstName + " " + item.lastName}</td>
                <td>{item.email}</td>
                <td>{item.localidad}</td>
                <td>{item.id}</td>
              </tr>
            ))}
        </tbody>
      </Table>
      </div>
    </div>
  );
};

export default ControlPanel;
