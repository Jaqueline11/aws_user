import { Type } from '@sinclair/typebox'
import axios from 'axios'
import { Button } from 'bootstrap'
import React from 'react'
import { useState } from 'react'
import AddUser from './AddUser'
import { Link, useNavigate } from "react-router-dom";


export default function ViewUser() {

    const navigate = useNavigate();
    
  const [usuario, setUsername] = useState('');
  const [contrasena, setPassword] = useState('');
  const [error, setError] = useState(null);
  
  function handleSubmit(e) {
    e.preventDefault();
    // Validar campos de formulario antes de enviar
    if (!usuario || !contrasena) {
      setError('Por favor ingrese su usuario y contraseña');
      return;
    }else{
      axios.get('http://localhost:8080/api/cursos/validarLogin', {
        params: {
            usuario: usuario,
            contrasena: contrasena
        }
    })
        .then(response => {
            console.log(response.data);
            if(response.data== true){
                console.log("Inicio de sesion exitoso")
                navigate("/bienvenido")
            }else{
                console.log("Inicio de sesion fallido")
                setError('La combinación de correo electrónico y contraseña no es válida: ' + usuario + ' ' + contrasena);
            }
        })
        .catch(error => {
            console.log(error);
        });

    }

    
    
  }

  return (
    <form onSubmit={handleSubmit}>
{error && <p>{error}</p>}

<div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4"> Iniciar sesión</h2>
          <form>
          <div className="mb-3">
            <br></br>
            <input
              type="text"
              id="usuario"
              className="form-control"
              placeholder="Ingrese su usuario"
              value={usuario}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>       
          <div className="mb-3">
            <br></br>
            <input
              type="password"
              id="contrasena"
              className="form-control"
              placeholder="Ingrese su contraseña"
              value={contrasena}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <br></br>
          <button type="submit" className="btn btn-outline-primary" onClick={handleSubmit} >
            Ingresar
          </button>
          <button type="submit" className="btn btn-outline-danger mx-2"onClick={() => navigate("/adduser")}>
            Crear Cuenta
          </button>
          <br></br><br></br>
          <Link to="/">Cancelar</Link>
          </form>
        </div>

      </div>

    </div>

    </form>

  )

}