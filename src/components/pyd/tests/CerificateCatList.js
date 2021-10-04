import React from 'react'


import { useSelector } from 'react-redux';
import { CertificateCatItem } from './CertificateCatItem';


import { FatPointItem } from './FatPointItem';
import { FatReviewPointItem } from './FatReviewPointItem';
import { ReportPointItem } from './ReportPointItem';


export const CerificateCatList = () => {
    
    // Obtenemos del store las categorías y los steps
    const { categories, steps } = useSelector(state => state.fat);

    return (

        <div>

            <h3>Listado de Deficiencias</h3>

            {
                ( categories.length > 0 )
                    ? ( categories.map( (cat, index) => (

                                <CertificateCatItem 
                                    key={ cat.map }
                                    index={ index }
                                    { ...cat }
                                /> 
                                
                            )
                        )
                    )
                    : ( <div>No existen categorías inspeccionadas</div> )
            }

            {/* {
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
            }            */}

        </div>

    );

};
