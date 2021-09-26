import React from 'react'


import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';


import { Navbar } from '../../ui/Navbar'
import { FatPanelsList } from './FatPanelsList';


export const FatScreen = () => {

    // useHistory es un hook de react-router-dom que contiene el historial de navegación
    const history = useHistory();

    // Obtenemos del store todos los cuadros que tenemos
    const { panels } = useSelector(state => state.panel);

    // Obtenemos del store el cuadro seleccionado
    const { panel } = useSelector( state => state.fat );

    // Definimos la función que lanzaremos cuando se pulse el botón de iniciar las pruebas
    const handleStart = () => {

        // En función del estado del panel iremos a una página u otra
        if ( panel.status === 'tested' || panel.status === 'reviewing' ) {

            // Si ya está probado, o se está revisando, nos vamos a la página de revisión
            // Cambiamos de página
            history.replace('/tests/fat/review');

        } else {
            
            // Si aún no se empezó a probar, o se está probando, nos vamos a la página de pruebas
            // Cambiamos de página
            history.replace('/tests/fat/inspection');         
            
        }

    };
    
    return (

        <div>

            <Navbar />

            <h1>PRUEBAS FAT</h1>

            <h3>Escoge el cuadro a probar</h3>

            {
                ( panels.length > 0 )
                    ? ( <FatPanelsList />)
                    : ( <div></div> )
            }

            <button 
                className="btn btn-primary pyd-button"
                onClick={ handleStart }
            >
                <h3>INICIAR</h3>
            </button>
            
        </div>

    )

}
