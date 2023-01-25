import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function AddUser() {

  let navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState(null);


  const [user, setUser] = useState({
    usuario: "",
    contrasena: "",
    imagenPath: "",
  })

  const { usuario, contrasena, imagenPath } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const [image, setImage] = useState(null)
  function handleImage(e) {
    console.log(e.target.files)
    setImage(e.target.files[0])


  };

  function handleApi() {
    var formData = new FormData();
    formData.append("foto", image);
    axios.post("http://localhost:8080/api/assets/upload", formData, {

      headers: {
        'Content-Type': 'multipart/form-data'
      }

    })

      .then(({ data }) => {
        const { key } = data;
        console.log("key: ", key);
        setUser({ ...user, imagenPath: key });

        console.log("Img path", user.imagenPath)

      })
      .catch(error => {
        console.log(error);
      })




  }



  const registrar = async (e) => {
    e.preventDefault();
    var val;
    await axios.get('http://localhost:8080/api/cursos/validarusuario', {
      params: {
        usuario: user.usuario,

      }
    })
      .then(response => {
        console.log(response.data);
        if (response.data == true) {
          val = response.data;
          setError('El nombre de usuario ya existe');
        } else {
          val = response.data;
        }

      })
    if (val == false) {
      
      if(!user.usuario || !user.contrasena || !user.imagenPath){
        setError('Rellene todos los campos');
      }else{
        
        await axios.post("http://localhost:8080/api/cursos/crearcurso", user)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
      navigate("/")
      }
      
    }

  }
  var urlimagen;
  urlimagen = "https://proyectospringboots3bucket.s3.amazonaws.com/" + user.imagenPath;


  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4"> Registro de Usuario</h2>
          <form onSubmit={(e) => registrar(e)}>
            {error && <p>{error} </p>}

            <div className="mb-3">
              <br></br>
              <input
                type={"text"}
                className="form-control"
                placeholder="Ingrese su usuario"
                name="usuario"
                value={usuario}
                onChange={(e) => onInputChange(e)}
              >
              </input>
            </div>
            <div className="mb-3">
              <br></br>
              <input type={"password"}
                className="form-control"
                placeholder="Ingrese su contraseña"
                name="contrasena"
                value={contrasena}
                onChange={(e) => onInputChange(e)}
              >
              </input>
            </div>
            <br></br>
            <img src={urlimagen} alt="Mi imagen" width="150px" />
            <div>
              <input type="file" name='file' onChange={handleImage}></input>

            </div>
            <br></br>
            <button type="submit" className="btn btn-outline-primary"  >
              Registrar
            </button>


            <Link
              className="btn btn-outline-danger mx-2" to onClick={handleApi}  >
              Guardar Imagen
            </Link>
            <br></br><br></br>
            <Link to="/">Cancelar</Link>


          </form>
        </div>

      </div>

    </div>
  )



}

