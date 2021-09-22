import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';


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

    // useHistory es un hook de react-router-dom que contiene el historial de navegación
    const history = useHistory();

    // Definimos la función que lanzaremos cuando se pulse sobre el botón de pruebas FAT
    const handleFat = () => {

        // Cambiamos de página
        history.replace('/pyd');

    }

    // history.replace('/login');

    return (
        <div className="navbar navbar-dark bg-dark mb-4">

            <span className="navbar-brand">
                { name }
            </span>

            <button
                className="btn btn-outline-primary"
                onClick={ handleFat }
            >
                <span> P&D Automatización</span>
            </button>

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
