import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';


import { Navbar } from '../../ui/Navbar';
import { createCertificate, fatClean, fatFinish, fatPointsLoad, fatStartNew, fatStartRev, startCertificate, startReport } from '../../../actions/fat';
import { ReportPointList } from './ReportPointList';
import { CerificateCatList } from './CerificateCatList';


export const CertificateScreen = () => {

    // Declaramos la variable dispatch para lanzar las acciones al store
    const dispatch = useDispatch();

    // useHistory es un hook de react-router-dom que contiene el historial de navegación
    const history = useHistory();

    // Obtenemos del store los fat points, el panel y si está arrancando
    const { points, panel, starting, checked, ready, categories, steps } = useSelector(state => state.fat);

    // Utilizamos el useEffect para ver cuando se carga la página y solicitar los cuadros a la DB
    useEffect(() => {

        // Hacemos el dispatch de la carga de los cuadros si tenemos un cuadro seleccionado
        if ( panel.id != undefined ) {
            
            // Hacemos el dispatch de una función que carga las pruebas KAO en el store fat
            dispatch( startCertificate( panel ) );
            
        } else { // En caso contrario nos vamos a la pantalla de inicio de pruebas
            
            // Nos vamos a la página de inicio
            history.replace('/tests');
            
        }
        
        // console.log("Se dispara el useEffect" + ` ${starting}`);
        
    }, [ dispatch ]);

    // Función que lanza el botón de imprimir certificado
    const handelCreate = () => {

        // // Hacemos el dispatch de la función que va a actualizar el panel en la DB
        // dispatch( fatFinish( panel, ready ) );

        // Hacemos el dispatch de la función que va a realizar la petición del certificado al backend
        createCertificate( panel, categories, steps );

        // // Hacemos el dispatch de la action que borrará los datos del store fat
        // dispatch( fatClean() );

        // // Nos vamos a la página de inicio
        // history.replace('/pyd');

    }

    // Función para el botón de cerrar el certificado
    const handleClose = () => {

        // Hacemos el dispatch de la action que borrará los datos del store fat
        dispatch( fatClean() );

        // Nos vamos a la página de inicio
        history.replace('/pyd');

    }

    // TODO: Hay que ver cuándo el cuadro está revisado, por ejemplo cuando no haya ningún KAO,
    // y que se activen los botones.

    return (

        <div>

            <Navbar />

            <h1> Página de Pruebas </h1>
            <h2> Certificado de Pruebas </h2>
            <h2> Número de Serie: { panel.serial }</h2>

            {
                ( !starting ) // Si no está arrancando presentamos el listado de puntos
                    ? ( 
                        <CerificateCatList /> 
                    )
                    : ( <div><span>Cargando Datos</span></div> )
            }

            {/* {

                ( ready )
                    ? ( 
                        <button 
                            className="btn btn-primary pyd-button"
                            onClick={ handelCreate }
                        >
                            <h3>Finalizar Prueba</h3>
                        </button>
                    )
                    : ( <div></div> )

            } */}

                        <button 
                            className="btn btn-primary pyd-button"
                            onClick={ handelCreate }
                        >
                            <h3>Imprimir Certificado</h3>
                        </button>

                        <button 
                            className="btn btn-primary pyd-button"
                            onClick={ handleClose }
                        >
                            <h3>Cerrar Certificado</h3>
                        </button>


        </div>

    );

};
