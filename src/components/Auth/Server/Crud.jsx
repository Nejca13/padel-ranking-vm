import { dataBase } from "../../../firebase"
import { setDoc, doc, deleteDoc, updateDoc } from "firebase/firestore"
import { getStorage, ref, deleteObject } from "firebase/storage"

export const addUser = async (newPlayer) => {
  await setDoc(doc(dataBase, "PRVM_DB_PLAYERS", newPlayer.id), {
    firstName: newPlayer.firstName,
    lastName: newPlayer.lastName,
    id: newPlayer.id,
    telefono: newPlayer.telefono,
    position: newPlayer.position,
    foto: newPlayer.foto,
    buscaPareja: newPlayer.buscaPareja,
    categoria: newPlayer.categoria,
    genero: newPlayer.genero,
    localidad: newPlayer.localidad,
    email: newPlayer.email,
    imagenId: newPlayer.imagenId,
  })
  setTimeout(() => {
    window.location.reload()
  }, 1000)
}

export const updateUser = async (user) => {
  const documento = doc(dataBase, "PRVM_DB_PLAYERS", user.id)
  await updateDoc(documento, {
    firstName: user.firstName,
    lastName: user.lastName,
    id: user.id,
    telefono: user.telefono,
    position: user.position,
    foto: user.foto,
    buscaPareja: user.buscaPareja,
    categoria: user.categoria,
    genero: user.genero,
    localidad: user.localidad,
    email: user.email,
    imagenId: user.imagenId,
  })
  setTimeout(() => {
    window.location.reload()
  }, 1000)
}

export const deleteUser = async (user) => {
  const storage = getStorage()
  const storageRef = ref(storage, user.imagenId)
  deleteObject(storageRef)
    .then(() => {
      console.log("Borro foto")
    })
    .catch((error) => {
      console.log("No borro nada porque" + error)
    })
  await deleteDoc(doc(dataBase, "PRVM_DB_PLAYERS", user.id))
  setTimeout(() => {
    window.location.reload()
  }, 1000)
}
