import { useForm } from "react-hook-form";
import "../css/style.css";
import { collection, addDoc } from "firebase/firestore";
import {dataBase} from "../firebase";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useState } from "react";

const FormularioTorneo = () => {
  const [bannerImg, setBannerImg] = useState("");
  const [boton, setBoton] = useState(true);
  const [carga, setCarga] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const imagenHandler = async (e) => {
    const banner = e.target.files[0];
    const storage = getStorage();
    const storageRef = ref(storage, banner.name);
    const uploadTask = uploadBytesResumable(storageRef, banner);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setCarga(progress);
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
        });
      }
    );
    await uploadBytes(storageRef, banner).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });
    const url = await getDownloadURL(ref(storage, banner.name));
    setBannerImg(url);
    setBoton(false);
  };
  const onSubmit = async (data, e) => {
    console.log("Empezo el Submit");
    const docRef = await addDoc(collection(dataBase, "torneos"), {
      lugarDelTorneo: data.lugarDelTorneo,
      categorias: data.categorias,
      fechaTorneo: data.fechaTorneo,
      foto: bannerImg,
    });
    console.log("Document written with ID: ", docRef.id);
    e.target.reset();
    setBannerImg("");
    setCarga(0);
    setBoton(true);
  };
  return (
    <div className="containerPrincipal mb-3">
      <div className="containerForm">
      <h1 className="mt-4 tituloPaginas text-white">Agregar Torneo al inicio</h1>
      <div className="containerDivs mb-3">
        <form className="row" onSubmit={handleSubmit(onSubmit)}>
          <div className="col-12">
            <label className="form-label fw-bold mt-3" htmlFor="lugarDelTorneo">
              Lugar del torneo (cancha)
            </label>
            <input
              className="form-control"
              placeholder="Lugar del torneo"
              id="lugarDelTorneo"
              type="text"
              {...register("lugarDelTorneo", {
                required: true,
                message: "Solo se admiten letras de la A-Z",
                maxLength: 20
              })}
            />
            <span className="text-danger text-small d-block mb-2">
              {errors.lugarDelTorneo && errors.lugarDelTorneo.message}
            </span>
          </div>
          <div className="col-12">
            <label className="form-label fw-bold mt-3" htmlFor="categorias">
              Categorias en juego
            </label>
            <input
              className="form-control"
              placeholder="8va, 7ma, 6ta, etc."
              id="categorias"
              type="text"
              {...register("categorias", {
                required: true,
                message: "error message",
                maxLength: 20
              })}
            />
            <span className="text-danger text-small d-block mb-2">
              {errors.categorias && errors.categorias.message}
            </span>
          </div>
          <div className="col-12">
            <label className="form-label fw-bold mt-3" htmlFor="fechaTorneo">
              Dias en los que se juega
            </label>
            <input
              className="form-control"
              placeholder="22, 23, 24 de Abril"
              id="fechaTorneo"
              type="text"
              {...register("fechaTorneo", {
                required: true,
                message: "error message",
                maxLength: 20
              })}
            />
            <span className="text-danger text-small d-block mb-2">
              {errors.fechaTorneo && errors.fechaTorneo.message}
            </span>
          </div>
          <div className="col-12">
            <label className="form-label fw-bold mt-3" htmlFor="bannerTorneo">
              Banner del torneo
            </label>
            <input
              onChange={imagenHandler}
              className="form-control"
              id="bannerTorneo"
              type="file"
              accept="image/*"
            />
            <div className="progress my-3">
              <div
                className="progress-bar bg-info"
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
              value="Cargar Torneo"
              disabled={boton}
            />
          </div>
        </form>
      </div>
      </div>
    </div>
  );
};

export default FormularioTorneo;
