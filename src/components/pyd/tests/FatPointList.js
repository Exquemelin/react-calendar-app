import React from 'react'


import { useSelector } from 'react-redux';


import { FatPointItem } from './FatPointItem';


export const FatPointList = () => {

    // Obtenemos del store todos los points que tenemos
    const { points } = useSelector(state => state.fat);

    console.log("Point List");

    return (

        <div>

            <h3>Listado de Pruebas</h3>

            {
                ( points.length > 0)
                    ? ( points.map( (point, index) => (
                            <FatPointItem 
                                key={point.id}
                                index={ index }
                                { ...point }
                            />
                        ))
                        
                    )
                    : ( <div>No existen puntos de inspección</div> )
            }           

        </div>

    );

};
