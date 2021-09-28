import React from 'react'


import { useSelector } from 'react-redux';


import { FatPointItem } from './FatPointItem';
import { FatReviewPointItem } from './FatReviewPointItem';


export const FatReviewPointList = ( param ) => {
    
    // Obtenemos del store todos los points que tenemos
    const { points, starting, panel, checked } = useSelector(state => state.fat);

    // Desestructuramos los parámetros para extraer el filtro
    const { filter } = param;

    // console.log("Point List");

    // console.log( Object.keys(points).length )
    // console.log( points)

    return (

        <div>

            <h3>Listado de Pruebas a Revisar</h3>

            {
                ( true ) // Si se cumple la condición hacemos el map de los fat points
                    ? ( points.map( (point, index) => (

                        ( filter ) // Si se aplica el filtro de los KAO solo dibujamos aquellos que lo tengan
                            ? ( 

                                ( point.result === "KAO" ) // Si el status es KAO se dibuja, de lo contrario no se hace nada
                                    ? (

                                        <FatReviewPointItem 
                                            key={point.id}
                                            index={ index }
                                            { ...point }
                                        />
                                    )
                                    : ( <div></div> )
                            )
                            : (
                                <FatReviewPointItem 
                                    key={point.id}
                                    index={ index }
                                    { ...point }
                                />
                            )
                        ))
                        
                    )
                    : ( <div>No existen puntos de inspección</div> )
            }           

        </div>

    );

};
