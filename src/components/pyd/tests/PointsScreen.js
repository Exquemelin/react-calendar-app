import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';


import { Navbar } from '../../ui/Navbar'


import { pointStartLoading } from '../../../actions/points';
import { AddPointFab } from '../../ui/AddPoingFab';
import { PointModal } from './PointModal';
import { PointList } from './PointList';


export const PointsScreen = () => {

    // Declaramos la variable dispatch para lanzar las acciones al store
    const dispatch = useDispatch();

    // Obtenemos del store todos los points que tenemos
    const { points } = useSelector(state => state.point);

    // Utilizamos el useEffect para ver cuando se carga la página y solicitar los points a la DB
    useEffect(() => {

        // Hacemos el dispatch de la carga de los points
        dispatch( pointStartLoading() );
        
    }, [ dispatch ]);

    return (

        <div>

            <Navbar />

            <h1>Puntos de Inspección</h1>

            {
                ( points.length > 0 )
                    ? ( <PointList /> )
                    : ( <div></div> )
            }

            <AddPointFab />

            <PointModal />


            
        </div>

    );

};
