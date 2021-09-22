import React from 'react'
import { useHistory } from 'react-router-dom';


import { Navbar } from '../ui/Navbar'



export const PYDScreen = () => {

    // useHistory es un hook de react-router-dom que contiene el historial de navegación
    const history = useHistory();
    
    // Definimos la función que lanzaremos cuando se pulse el botón de números de serie
    const handleSerials = () => {
    
        // Cambiamos de página
        history.replace('/serials');
    
    }
    
    // Definimos la función que lanzaremos cuando se pulse el botón de pruebas FAT
    const handleTests = () => {
    
        // Cambiamos de página
        history.replace('/tests');
        
    }

    return (

        <div>

            <Navbar />

            <div className="pyd-screen">
                <button 
                    className="btn btn-primary pyd-button"
                    onClick={ handleSerials }
                >
                    <h3>Números de Serie</h3>
                </button>

                <button 
                    className="btn btn-primary pyd-button"
                    onClick={ handleTests }
                >
                    <h3>Pruebas FAT</h3>
                </button>

            </div>

        </div>
    )
}
