import React from 'react'
import { useDispatch, useSelector } from 'react-redux'


import { startLogout } from '../../actions/auth';


export const Navbar = () => {

    // Declaramos la variable dispatch para utilizarla
    const dispatch = useDispatch();

    // Extraemos el nombre del store para mostrarlo en el navbar
    const { name } = useSelector( state => state.auth );

    // Definimos la función que lanzaremos cuando se pulse sobre el Logout
    const handleLogout = () => {

        // Hacemos el dispatch de la función de Logout
        dispatch( startLogout() );

    };

    return (
        <div className="navbar navbar-dark bg-dark mb-4">

            <span className="navbar-brand">
                { name }
            </span>

            <button 
                className="btn btn-outline-danger"
                onClick={ handleLogout }
            >
                <i className="fas fa-sign-out-alt" ></i>
                <span> Salir </span>
            </button>
            
        </div>
    )
}
