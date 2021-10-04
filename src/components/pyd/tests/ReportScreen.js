import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';


import { Navbar } from '../../ui/Navbar';
import { createReport, fatClean, fatFinish, fatPointsLoad, fatStartNew, fatStartRev, startReport } from '../../../actions/fat';
import { ReportPointList } from './ReportPointList';


export const ReportScreen = () => {

    // Declaramos la variable dispatch para lanzar las acciones al store
    const dispatch = useDispatch();

    // useHistory es un hook de react-router-dom que contiene el historial de navegación
    const history = useHistory();

    // Obtenemos del store los fat points, el panel y si está arrancando
    const { points, panel, starting, checked, ready } = useSelector(state => state.fat);

    // Utilizamos el useEffect para ver cuando se carga la página y solicitar los cuadros a la DB
    useEffect(() => {

        // Hacemos el dispatch de la carga de los cuadros si tenemos un cuadro seleccionado
        if ( panel.id != undefined ) {
            
            // Hacemos el dispatch de una función que carga las pruebas KAO en el store fat
            dispatch( startReport( panel ) );
            
        } else { // En caso contrario nos vamos a la pantalla de inicio de pruebas
            
            // Nos vamos a la página de inicio
            history.replace('/tests');
            
        }
        
        // console.log("Se dispara el useEffect" + ` ${starting}`);
        
    }, [ dispatch ]);

    // Función para el botón de imprimir informe
    const handleReport = async () => {

        // Metemos en una variable los puntos que están KAO
        const reportPoints = points.filter( (pt) => {
            return pt.result === 'KAO'
        });

        // Hacemos el dispatch de la función que va a actualizar el panel en la DB
        dispatch( createReport( panel, reportPoints ) );

    }

    // Función para el botón de cerrar el informe
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
            <h2> Informe de Defectos </h2>
            <h2> Número de Serie: { panel.serial }</h2>

            {
                ( !starting ) // Si no está arrancando presentamos el listado de puntos
                    ? ( 
                        <ReportPointList /> 
                    )
                    : ( <div><span>Cargando Datos</span></div> )
            }

            {
                
                <button 
                    className="btn btn-primary pyd-button"
                    onClick={ handleReport }
                >
                    <h3>Imprimir Informe</h3>
                </button>

            }
            {

                <button 
                    className="btn btn-primary pyd-button"
                    onClick={ handleClose }
                >
                    <h3>Cerrar Informe</h3>
                </button>

            }


        </div>

    );

};
