import { useForm } from "react-hook-form";
import "../css/style.css";
import { collection, addDoc } from "firebase/firestore";
import dataBase from "../firebase";
import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";



const FormularioRanking = () => {
  const [playerImg, setPlayerImg] = useState("");
  const [boton, setBoton] = useState(true)
  const [carga, setCarga] = useState(0)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const imagenHandler = async(e) => {
    const imagen = e.target.files[0];
    const storage = getStorage();
    const storageRef = ref(storage, imagen.name); 
    const uploadTask = uploadBytesResumable(storageRef, imagen);

    uploadTask.on('state_changed',
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    setCarga(progress)
  },
  (error) => {
  },
  () => {
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
      
    });
  }
);
    await uploadBytes(storageRef, imagen).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    });
    const url = await getDownloadURL(ref(storage, imagen.name))
   setPlayerImg(url)
   setBoton(false)
  }
  const onSubmit = async(data, e) => {
      console.log("Empezo el Submit")
      const docRef = await addDoc(collection(dataBase, "players"), {
       firstName: data.firstName,
       lastName: data.lastName,
       position: data.position,
       foto: playerImg
      });
      console.log("Document written with ID: ", docRef.id);
      e.target.reset();
      setPlayerImg("")
      setCarga(0)
      setBoton(true)
  };
  return (
    <div className="containerPrincipal">
      <h1 className="mt-4">Padel Ranking Valle Medio</h1>
      <div className="containerDivs border border-primary rounded border-2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="div-inputs">
            <label className="form-label mt-2" htmlFor="nombre">
              Nombre
            </label>
            <input
              className="form-control"
              placeholder="Ingresa tu Nombre"
              id="nombre"
              type="text"
              {...register("firstName", {
                required: true,
                message: "error message",
                maxLength: 20,
                pattern: /^[A-Za-z]+$/i,
              })}
            />
            <span className="text-danger text-small d-block mb-2">
              {errors.usuario && errors.nombre.message}
            </span>
          </div>
          <div className="div-inputs">
            <label className="form-label mt-2" htmlFor="apellido">
              Apellido
            </label>
            <input
              className="form-control"
              placeholder="Ingresa tu Apellido"
              id="apellido"
              type="text"
              {...register("lastName", {
                required: true,
                message: "error message",
                maxLength: 20,
                pattern: /^[A-Za-z]+$/i,
              })}
            />
            <span className="text-danger text-small d-block mb-2">
              {errors.usuario && errors.apellido.message}
            </span>
          </div>
          <div className="div-inputs">  
            <label className="form-label mt-2" htmlFor="posicion">
              Posicion
            </label>
            <select
              className="form-select"
              aria-label="Default select example"
              placeholder="Ingresa de que lado jugas"
              id="posicion"
              type="select"
              {...register("position", {
                required: true,
                message: "error message",
                maxLength: 20,
                pattern: /^[A-Za-z]+$/i,
              })}
            >
              <option value="Reves">Reves</option>
              <option value="Drive">Drive</option>
            </select>
            <span className="text-danger text-small d-block mb-2">
              {errors.usuario && errors.posicion.message}
            </span>
          </div>
          <div className="div-inputs">
            <label className="form-label mt-2" htmlFor="foto">
              Foto
            </label>
            <input
              onChange={imagenHandler}
              className="form-control"
              id="foto"
              type="file"
              accept="image/png, image/jpeg"
              />
              <div className="progress my-3">
              <div className="progress-bar bg-info" ole="progressbar" style={{width:`${carga}%`}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
          </div>
          <div className="div-submit">
            <input
              className="btn btn-primary mt-4 float-end"
              type="submit"
              value="Cargar Jugador"
              disabled={boton}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioRanking;
