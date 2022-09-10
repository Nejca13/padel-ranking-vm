import { useForm } from "react-hook-form"
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage"
import React, { useState, useEffect } from "react"
import uniqid from "uniqid"
import ReactCrop from "react-image-crop"
import "react-image-crop/dist/ReactCrop.css"
import { addUser, updateUser } from "../Auth/Server/Crud"
import { useUserContext } from "../Auth/Auth"
import styles from './Formularios.module.css'

const FormularioRanking = ({ user, editStatus }) => {
  const userApp = useUserContext()
  const [buscaPareja, setBuscaPareja] = useState(null)
  const [playerImg, setPlayerImg] = useState("")
  const [boton, setBoton] = useState(true)
  const [carga, setCarga] = useState(0)
  const [imagenBruta, setImagenBruta] = useState(null)
  const [crop, setCrop] = useState({
    aspect: 1 / 1,
    unit: "%",
    width: 50,
    height: 50,
    x: 25,
    y: 25,
  })
  const [imagenId, setImagenId] = useState(null)
  const [imagen, setImagen] = useState(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const imagenHandler = (e) => {
    setImagenBruta(URL.createObjectURL(e.target.files[0]))
  }

  const Uploader = async (blob) => {
    if (blob) {
      const storage = getStorage()
      const storageRef = ref(storage, blob.name)
      const uploadTask = uploadBytesResumable(storageRef, blob)

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          setCarga(progress)
        },
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {})
        }
      )
      await uploadBytes(storageRef, blob).then((snapshot) => {})
      const url = await getDownloadURL(ref(storage, blob.name))
      setImagenId(blob.name)
      setPlayerImg(url)
      setBoton(false)
    }
  }

  const onSubmit = (data) => {
    var newPlayer = {
      id: userApp.id,
      email: userApp.email,
      telefono: data.telefono,
      firstName: data.firstName.toUpperCase().trim(),
      lastName: data.lastName.toUpperCase().trim(),
      position: data.position,
      foto: editStatus === true ? userApp.foto : playerImg,
      buscaPareja: editStatus === true ? userApp.buscaPareja : buscaPareja,
      categoria: data.categoria,
      genero: data.genero,
      localidad: data.localidad,
      imagenId: editStatus === true ? userApp.imagenId : imagenId,
    }
    editStatus === true ? updateUser(newPlayer) : addUser(newPlayer)
  }

  const getCroppedImg = async (e) => {
    e.preventDefault()
    const canvas = document.createElement("canvas")
    const scaleX = imagen.naturalWidth / imagen.width
    const scaleY = imagen.naturalHeight / imagen.height
    canvas.width = crop.width
    canvas.height = crop.height
    const ctx = canvas.getContext("2d")
    const pixelRatio = window.devicePixelRatio
    canvas.width = crop.width * pixelRatio
    canvas.height = crop.height * pixelRatio
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
    ctx.imageSmoothingQuality = "high"

    ctx.drawImage(
      imagen,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    )

    canvas.toBlob(
      (blob) => {
        blob.name = uniqid()
        Uploader(blob)
      },
      "image/jpeg",
      1
    )
    setImagenBruta(null)
  }

  useEffect(() => {
    Uploader()
  }, [userApp])

  return (
    <div className={styles.container}>
      <div>
        {
          editStatus === true ? ( <h2>Edita tu perfil de jugador</h2>) : (<h2>Crea tu perfil de jugador</h2>)
        }
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="nombre">Nombre</label>
              <input
                defaultValue={editStatus === true ? userApp.firstName : ""}
                placeholder="Ingresa tu Nombre"
                id="nombre"
                type="text"
                {...register("firstName", {
                  required: true,
                  message: "error message",
                  maxLength: 20,
                  pattern: /^[a-zA-ZÀ-ÿ\s]+$/i,
                })}
              />
              <span>{errors.nombre && errors.nombre.message}</span>
            </div>
            <div>
              <label htmlFor="apellido">Apellido</label>
              <input
              defaultValue={editStatus === true ? userApp.lastName : ""}
                placeholder="Ingresa tu Apellido"
                id="apellido"
                type="text"
                {...register("lastName", {
                  required: true,
                  message: "error message",
                  maxLength: 20,
                  pattern: /^[a-zA-ZÀ-ÿ\s]+$/i,
                })}
              />
              <span>{errors.apellido && errors.apellido.message}</span>
            </div>
            <div>
              <label htmlFor="telefono">Telefono</label>
              <input
              defaultValue={editStatus === true ? userApp.telefono : ""}
                placeholder="Ingresa tu Numero de telefono"
                id="telefono"
                type="tel"
                {...register("telefono", {
                  required: false,
                  message: "error message",
                  maxLength: 20
                })}
              />
              <span>{errors.apellido && errors.apellido.message}</span>
            </div>
            <div>
              <label htmlFor="genero">Genero</label>
              <select
              defaultValue={editStatus === true ? userApp.genero : ""}
                aria-label="Default select example"
                placeholder="Ingresa de que lado jugas"
                id="genero"
                type="select"
                {...register("genero", {
                  required: true,
                  message: "error message",
                  maxLength: 20,
                })}
              >
                <option value="Hombre">Hombre</option>
                <option value="Mujer">Mujer</option>
                <option value="Otro">Otro</option>
              </select>
              <span>{errors.genero && errors.genero.message}</span>
            </div>
            <div>
              <label htmlFor="categoria">Categoria</label>
              <select
              defaultValue={editStatus === true ? userApp.categoria : ""}
                aria-label="Default select example"
                placeholder="Ingresa de que lado jugas"
                id="categoria"
                type="select"
                {...register("categoria", {
                  required: true,
                  message: "error message",
                  maxLength: 20,
                })}
              >
                <option value="8va">8va</option>
                <option value="7ma">7ma</option>
                <option value="6ta">6ta</option>
                <option value="5ta">5ta</option>
                <option value="4ta">4ta</option>
              </select>
              <span>{errors.categoria && errors.categoria.message}</span>
            </div>
            <div>
              <label htmlFor="position">Posicion</label>
              <select
              defaultValue={editStatus === true ? userApp.position : ""}
                aria-label="Default select example"
                placeholder="Ingresa de que lado jugas"
                id="position"
                type="select"
                {...register("position", {
                  required: true,
                  message: "error message",
                  maxLength: 20,
                })}
              >
                <option value="Reves">Reves</option>
                <option value="Drive">Drive</option>
                <option value="Reves y Drive">Ambas</option>
              </select>
            </div>
            <div>
              <label htmlFor="localidad">Localidad</label>
              <select
              defaultValue={editStatus === true ? userApp.localidad : ""}
                aria-label="Default select example"
                placeholder="Ingresa de que lado jugas"
                id="localidad"
                type="select"
                {...register("localidad", {
                  required: true,
                  message: "error message",
                  maxLength: 20,
                })}
              >
                <option value="Coronel Belisle">Coronel Belisle</option>
                <option value="Chimpay">Chimpay</option>
                <option value="Choele Choel">Choele Choel</option>
                <option value="Darwin">Darwin</option>
                <option value="Lamarque">Lamarque</option>
                <option value="Luis Beltran">Luis Beltran</option>
                <option value="Rio Colorado">Rio Colorado</option>
              </select>
            </div>
            <div>
              <label htmlFor="buscaPareja">
              <input type="checkbox" id="buscaPareja" name="buscaPareja" role="switch"
              defaultValue={editStatus === true ? userApp.buscaPareja : ""} 
              onChange={() => setBuscaPareja(true)} />
              Busca Pareja
              </label>
            </div>
            <div>
              <label htmlFor="foto">Foto</label>
              <input
                onChange={imagenHandler}
                id="foto"
                type="file"
                accept="image/*"
              />
              <div>
                <progress value={carga} max="100"></progress>
              </div>
            </div>
            <div>
              <input type="submit" value={editStatus === true ? "Actualizar jugador" : "Cargar jugador"} disabled={editStatus === true ? false : boton} />
              {imagenBruta != null ? (
                <div className={styles.cropperDiv}>
                  <ReactCrop
                    className={styles.crop}
                    src={imagenBruta}
                    onImageLoaded={setImagen}
                    crop={crop}
                    onChange={setCrop}
                  />
                  <div>
                    <button onClick={(e) => setImagenBruta(null)}>
                      Cancelar
                    </button>
                    <button onClick={getCroppedImg}>Recortar</button>
                  </div>
                </div>
              ) : (
                <span></span>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default FormularioRanking
