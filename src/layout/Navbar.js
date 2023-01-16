import React from 'react'
import { Link,useNavigate } from "react-router-dom"
export default function Navbar
    () {
    let navigate = useNavigate();
    function inicio() {
        navigate("/");
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#" onClick={inicio}>
                        AMAZON WEB SERVICE USER</a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span
                            className="navbar-toggler-icon"></span>
                    </button>
                    <Link className="btn btn-outline-light" to="/adduser">Agregar Usuario</Link>
                </div>
            </nav>
        </div>
    )
}
