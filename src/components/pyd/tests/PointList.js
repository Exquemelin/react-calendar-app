import React from 'react'
import { useDispatch, useSelector } from 'react-redux';


import { PointItem } from './PointItem';


export const PointList = () => {

    // Declaramos la variable dispatch para lanzar las acciones al store
    const dispatch = useDispatch();

    // Obtenemos del store todos los puntos que tenemos
    const { points } = useSelector(state => state.point);

    return (

        <div>

            <h2> Listado de puntos de inspección </h2>
            {
                points.map( point => (
                    <PointItem
                        key={point.id}
                        { ...point }
                    />
                ))
            }

        </div>

    );

}