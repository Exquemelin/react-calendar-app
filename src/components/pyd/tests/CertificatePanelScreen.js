import React from 'react'


import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';


import { Navbar } from '../../ui/Navbar'
import { FatPanelsList } from './FatPanelsList';


export const CertificatePanelScreen = () => {

    // useHistory es un hook de react-router-dom que contiene el historial de navegación
    const history = useHistory();

    // Obtenemos del store todos los cuadros que tenemos
    const { panels } = useSelector(state => state.panel);

    // Obtenemos del store el cuadro seleccionado
    const { panel } = useSelector( state => state.fat );

    // Definimos la función que lanzaremos cuando se pulse el botón de mostrar informe
    const handleReport = () => {

        // En función del estado del panel iremos a una página u otra
        if ( panel.status !== 'pending' ) {

            // Si ya está probado, o se está revisando, nos vamos a la página de revisión
            // Cambiamos de página
            history.replace('/tests/certificate/show');

        } else {

            // Esta parte quiere decir que el cuadro aún no se empezó a probar
            console.log('El cuadro aún no se ha probado');

        }

    };
    
    return (

        <div>

            <Navbar />

            <h1>PRUEBAS FAT</h1>

            <h3>Escoge el cuadro del que mostrar el certificado de pruebas</h3>

            {
                ( panels.length > 0 )
                    ? ( <FatPanelsList />)
                    : ( <div></div> )
            }

            <button 
                className="btn btn-primary pyd-button"
                onClick={ handleReport }
            >
                <h3>MOSTRAR CERTIFICADO DE PRUEBAS</h3>
            </button>
            
        </div>

    )

}
