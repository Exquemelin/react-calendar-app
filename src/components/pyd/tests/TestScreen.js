import React from 'react'


import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fatClean } from '../../../actions/fat';


import { Navbar } from '../../ui/Navbar'


export const TestScreen = () => {

    // Declaramos la variable dispatch para lanzar las acciones al store
    const dispatch = useDispatch();

    // useHistory es un hook de react-router-dom que contiene el historial de navegación
    const history = useHistory();
    
    // Definimos la función que lanzaremos cuando se pulse el botón de números de serie
    const handlePoints = () => {
    
        // Cambiamos de página
        history.push('/tests/points');
    
    }
    
    // Definimos la función que lanzaremos cuando se pulse el botón de pruebas FAT
    const handleFat = () => {

        // Limpiamos el store fat por si no lo estuviese ya
        dispatch( fatClean() );
    
        // Cambiamos de página
        history.push('/tests/fat');
        
    }

    // Definimos la función que lanzaremos cuando se pulse el botón de pruebas FAT
    const handleReport = () => {

        // Limpiamos el store fat por si no lo estuviese ya
        dispatch( fatClean() );
    
        // Cambiamos de página
        history.push('/tests/report');
        
    }

    // Definimos la función que lanzaremos cuando se pulse el botón de pruebas FAT
    const handleCertificate = () => {

        // Limpiamos el store fat por si no lo estuviese ya
        dispatch( fatClean() );
    
        // Cambiamos de página
        history.push('/tests/certificate');
        
    }

    return (

        <div>

            <Navbar />

            <div className="pyd-screen">
                <button 
                    className="btn btn-primary pyd-button"
                    onClick={ handlePoints }
                >
                    <h3>Puntos de Inspección</h3>
                </button>

                <button 
                    className="btn btn-primary pyd-button"
                    onClick={ handleFat }
                >
                    <h3>Comenzar Prueba</h3>
                </button>

                <button 
                    className="btn btn-primary pyd-button"
                    onClick={ handleReport }
                >
                    <h3>Informe de Pruebas</h3>
                </button>

                <button 
                    className="btn btn-primary pyd-button"
                    onClick={ handleCertificate }
                >
                    <h3>Certificado de Pruebas</h3>
                </button>

            </div>

        </div>

    )

}
