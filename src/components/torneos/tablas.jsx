import React from 'react'
import { Table } from 'react-bootstrap'

const Tablas = (props) => {
  return (
    <div>
        <Table striped bordered hover variant="dark">
  <thead>
    <tr>
      <th>#</th>
      <th>Parejas</th>
      <th>Puntos</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Rosa - Evelin</td>
      <th>0</th>
    </tr>
    <tr>
      <td>2</td>
      <td>Ezequiel - Antonella</td>
      <th>0</th>
    </tr>
    <tr>
      <td>3</td>
      <td>Ramiro - Juan</td>
      <th>0</th>
    </tr>
    <tr>
      <td>4</td>
      <td>Roberto - Nicolas</td>
      <th>0</th>
    </tr>
  </tbody>
</Table>
    </div>
  )
}

export default Tablas