import { useForm } from "react-hook-form";
import "../css/style.css";
import { setDoc, doc } from "firebase/firestore";
import dataBase from "../firebase";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable
} from "firebase/storage";
import { useState } from "react";
import uniqid from "uniqid";
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const FormularioRanking = () => {
  const [playerImg, setPlayerImg] = useState("");
  const [boton, setBoton] = useState(true);
  const [carga, setCarga] = useState(0);
  const [imagenBruta, setImagenBruta] = useState(null)
  const [crop, setCrop] = useState({ aspect: 1 / 1});
  const [imagen, setImagen] = useState(null);
  const [result, setResult] = useState(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const imagenHandler = (e) => { //Lo tiene que hacer con la imagen recortada !!

    setImagenBruta(URL.createObjectURL(e.target.files[0]))
    /*const imagen = e.target.files[0];
    const storage = getStorage();
    const storageRef = ref(storage, imagen.name);
    const uploadTask = uploadBytesResumable(storageRef, imagen);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setCarga(progress);
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        });
      }
    );
    await uploadBytes(storageRef, imagen).then((snapshot) => {
    });
    const url = await getDownloadURL(ref(storage, imagen.name));
    setPlayerImg(url);
    setBoton(false);*/
  };
  const onSubmit = async (data, e) => {
    await setDoc(doc(dataBase, 'players', data.firstName.toUpperCase() + data.lastName.toUpperCase() + uniqid()),
      {firstName: data.firstName.toUpperCase(),
      lastName: data.lastName.toUpperCase(),
      position: data.position,
      foto: playerImg,
      categoria: data.categoria,
      genero: data.genero,
      localidad: data.localidad}
    );
    e.target.reset();
    setPlayerImg("");
    setCarga(0);
    setBoton(true);
    alert("Jugador cargado exitosamente!")
  };

  const getCroppedImg = async (e) => {
    e.preventDefault()
    const canvas = document.createElement("canvas");
    const scaleX = imagen.naturalWidth / imagen.width;
    const scaleY = imagen.naturalHeight / imagen.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");
    const pixelRatio = window.devicePixelRatio;
    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";
  
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
    );

    canvas.toBlob(
      (blob) => {
        blob.name = uniqid();
        setResult(blob);
      },
      "image/jpeg",
      1
    );
    
    
      if(result !== null){
        const storage = getStorage();
      const storageRef = ref(storage, result.name);
      const uploadTask = uploadBytesResumable(storageRef, result);
  
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setCarga(progress);
          setImagenBruta(null)
        },
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          });
        }
      );
      await uploadBytes(storageRef, result).then((snapshot) => {
      });
      const url = await getDownloadURL(ref(storage, result.name));
      setPlayerImg(url);
      setBoton(false);
      
      }
    
  }
  return (
    <div className="containerPrincipal">
       
      <div className="containerForm">
      
      <h2 className="mt-4 tituloPaginas">Padel Ranking Valle Medio</h2>
      <div className="containerDivs mb-4 border border-primary rounded border-2">
      
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
              accept="image/png, image/jpeg"
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
              className="btn btn-primary mt-4 float-end"
              type="submit"
              value="Cargar Jugador"
              disabled={boton}
            />
            { imagenBruta != null ? 
                <div className="d-flex row align-items-center justify-content-center mt-4 flex-sm-column cropperDiv">
                  <ReactCrop src={imagenBruta} className="cropperImg col-8" onImageLoaded={setImagen} crop={crop} onChange={setCrop}/>
                  <button className="btn btn-success mt-3 col-8" onClick={getCroppedImg}>
                  Recortar
                  </button>
                  <div>
                  
                  </div>
                  
                </div>
                 :  <span></span> 
            }
          </div>
        </form>
        
      </div>
      </div>
      
              
              
    </div>
  );
};

export default FormularioRanking;
