import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


export default function Home() {

    const [users, setUsers] = useState([]);
    useEffect(() => {
        loadUsers();
    }, [])

    const loadUsers = async () => {
        const result = await axios.get("http://localhost:8080/api/cursos/getcurso");
        console.log("F")
        setUsers(result.data);
    };

    const deleteUser = async (id, key) => {
        await axios.delete('http://localhost:8080/api/cursos/eliminarcurso', {
            params: {
                id: id,
            }

        })
        await axios.delete('http://localhost:8080/api/assets/delete-object', {
            params: {
                key: key,
            }

        })

       

        loadUsers();
    }









    return (
        <div className='container'>
            <div className='py-4'>
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Usuario</th>
                            <th scope="col">Contraseña</th>
                            <th scope="col">Url imagen</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => (
                                <tr>
                                    <th scope="row" key={index}>{index + 1}</th>
                                    <td>{user.usuario}</td>
                                    <td>{user.contrasena}</td>
                                    <img src={user.imagenUrl} alt="Mi imagen" width="150px" />
                                    <td>
                                        <button
                                            className="btn btn-danger mx-2"
                                            onClick={() => deleteUser(user.id, user.imagenPath)}
                                        >
                                            Delete
                                        </button>
                                        <Link
                                            className="btn btn-outline-primary mx-2"
                                            to={`/edituser/${user.id}`}
                                        >      
                                            Editar
                                        </Link>
                                    
                                    </td>
                                    
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
