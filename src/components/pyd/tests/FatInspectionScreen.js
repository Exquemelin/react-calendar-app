import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';


import { Navbar } from '../../ui/Navbar';
import { FatPointList } from './FatPointList';

import { fatClean, fatFinish, fatPointsLoad, fatStartNew } from '../../../actions/fat';
import { FatPointModal } from './FatPointModal';


export const FatInspectionScreen = () => {

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
            
            // Hacemos el dispatch de la creación y carga de unas nuevas pruebas FAT
            dispatch( fatStartNew( panel ) );

            // console.log( "Los puntos son " + points );

            // console.log( points );
            
        } else { // En caso contrario nos vamos a la pantalla de inicio de pruebas
            
            // Nos vamos a la página de inicio
            history.replace('/tests');
            
        }
        
        // console.log("Se dispara el useEffect" + ` ${starting}`);
        
    }, [ dispatch ]);

    const handleFinish = () => {

        // Hacemos el dispatch de la función que va a actualizar el panel en la DB
        dispatch( fatFinish( panel, ready ) );

        // Hacemos el dispatch de la action que borrará los datos del store fat
        dispatch( fatClean() );

        // Nos vamos a la página de inicio
        history.replace('/pyd');

    }


    return (

        <div>

            <Navbar />

            <h1> Página de Pruebas </h1>
            <h2> Número de Serie: { panel.serial }</h2>

            {
                ( !starting ) // Si no está arrancando presentamos el listado de puntos
                    ? ( <FatPointList 
                            filter={ false }
                        /> 
                    )
                    : ( <div><span>Cargando Datos</span></div> )
            }

            {

                ( checked )
                    ? ( 
                        <button 
                            className="btn btn-primary pyd-button"
                            onClick={ handleFinish }
                        >
                            <h3>Finalizar Prueba</h3>
                        </button>
                    )
                    : ( <div></div> )

            }

            {/* <FatPointModal /> */}


        </div>

    );

};
