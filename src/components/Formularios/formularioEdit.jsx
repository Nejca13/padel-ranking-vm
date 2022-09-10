import { useForm } from "react-hook-form"
import { updateDoc, doc } from "firebase/firestore"
import { dataBase } from "../../firebase"
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage"
import React, { useEffect, useState } from "react"
import uniqid from "uniqid"
import ReactCrop from "react-image-crop"
import "react-image-crop/dist/ReactCrop.css"
import { useUserContext } from "./../Auth/Auth"

const FormularioEdit = () => {
  const userApp = useUserContext()
  const [playerImg, setPlayerImg] = useState(userApp.foto)
  const [carga, setCarga] = useState(0)
  const [imagenBruta, setImagenBruta] = useState(null)
  const [crop, setCrop] = useState({ aspect: 1 / 1 })
  const [imagen, setImagen] = useState(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const imagenHandler = (e) => {
    setImagenBruta(URL.createObjectURL(e.target.files[0]))
  }

  const Uploader = async (t) => {
    if (t) {
      const storage = getStorage()
      const storageRef = ref(storage, t.name)
      const uploadTask = uploadBytesResumable(storageRef, t)

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          setCarga(progress)
          console.log(progress)
        },
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {})
        }
      )
      await uploadBytes(storageRef, t).then((snapshot) => {})
      const url = await getDownloadURL(ref(storage, t.name))
      setPlayerImg(url)
    }
  }

  const onSubmit = async (data, e) => {
    const documento = doc(dataBase, "players", userApp.id)
    await updateDoc(documento, {
      firstName: data.firstName.toUpperCase().trim(),
      lastName: data.lastName.toUpperCase().trim(),
      position: data.position,
      foto: playerImg,
      categoria: data.categoria,
      genero: data.genero,
      localidad: data.localidad,
    })
    e.target.reset()
    setPlayerImg("")
    setCarga(0)
    window.location.reload()
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
  }, [])

  return (
    <div className="containerPrincipal">
      <div className="containerForm">
        <h1 className="mt-4 tituloPaginas text-white">Edita tu perfil</h1>
        <div className="containerDivs mb-4">
          <form className="row g-2" onSubmit={handleSubmit(onSubmit)}>
            <div className="col-md-6">
              <label className="form-label fw-bold mt-2" htmlFor="nombre">
                Nombre
              </label>
              <input
                className="form-control"
                placeholder="Ingresa tu Nombre"
                id="nombre"
                type="text"
                defaultValue={userApp.firstName}
                {...register("firstName", {
                  required: true,
                  message: "error message",
                  maxLength: 20,
                  pattern: /^[a-zA-ZÀ-ÿ\s]+$/i,
                })}
              />
              <span className="text-danger text-small d-block mb-2">
                {errors.nombre && errors.nombre.message}
              </span>
            </div>
            <div className="col-md-6">
              <label className="form-label fw-bold mt-2" htmlFor="apellido">
                Apellido
              </label>
              <input
                className="form-control"
                placeholder="Ingresa tu Apellido"
                id="apellido"
                type="text"
                defaultValue={userApp.lastName}
                {...register("lastName", {
                  required: true,
                  message: "error message",
                  maxLength: 20,
                  pattern: /^[a-zA-ZÀ-ÿ\s]+$/i,
                })}
              />
              <span className="text-danger text-small d-block mb-2">
                {errors.apellido && errors.apellido.message}
              </span>
            </div>
            <div className="col-md-6">
              <label className="form-label fw-bold mt-2" htmlFor="genero">
                Genero
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
                placeholder="Ingresa de que lado jugas"
                id="genero"
                type="select"
                defaultValue={userApp.genero}
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
              <span className="text-danger text-small d-block mb-2">
                {errors.genero && errors.genero.message}
              </span>
            </div>
            <div className="col-md-6">
              <label className="form-label fw-bold mt-2" htmlFor="categoria">
                Categoria
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
                placeholder="Ingresa de que lado jugas"
                id="categoria"
                type="select"
                defaultValue={userApp.categoria}
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
              <span className="text-danger text-small d-block mb-2">
                {errors.categoria && errors.categoria.message}
              </span>
            </div>
            <div className="col-md-6">
              <label className="form-label fw-bold mt-2" htmlFor="position">
                Posicion
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
                placeholder="Ingresa de que lado jugas"
                id="position"
                type="select"
                defaultValue={userApp.position}
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
            <div className="col-md-6">
              <label className="form-label fw-bold mt-2" htmlFor="localidad">
                Localidad
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
                placeholder="Ingresa de que lado jugas"
                id="localidad"
                type="select"
                defaultValue={userApp.localidad}
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
            <div className="col-12">
              <label className="form-label fw-bold mt-2" htmlFor="foto">
                Foto
              </label>
              <input
                onChange={imagenHandler}
                className="form-control"
                id="foto"
                type="file"
                accept="image/*"
              />
              <div className="progress my-3">
                <div
                  className="progress-bar bg-success"
                  ole="progressbar"
                  style={{ width: `${carga}%` }}
                  aria-valuenow="50"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
            <div className="div-submit">
              <input
                className="btn btn-warning mt-4 float-end"
                type="submit"
                value="Editar Jugador"
              />
              {imagenBruta != null ? (
                <div className="d-flex row align-items-center justify-content-center mt-4 flex-sm-column cropperDiv">
                  <ReactCrop
                    src={imagenBruta}
                    className="cropperImg col-8"
                    onImageLoaded={setImagen}
                    crop={crop}
                    onChange={setCrop}
                  />

                  <div className="d-flex justify-content-around mb-2">
                    <button
                      className="btn btn-danger mt-3 col-4 botonRecortar"
                      onClick={(e) => setImagenBruta(null)}
                    >
                      Cancelar
                    </button>
                    <button
                      className="btn btn-success mt-3 col-4 botonRecortar"
                      onClick={getCroppedImg}
                    >
                      Recortar
                    </button>
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

export default FormularioEdit
