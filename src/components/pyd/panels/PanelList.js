import React from 'react'
import { useDispatch, useSelector } from 'react-redux';


import { PanelItem } from './PanelItem';


export const PanelList = () => {

    // Declaramos la variable dispatch para lanzar las acciones al store
    const dispatch = useDispatch();

    // Obtenemos del store todos los cuadros que tenemos
    const { panels } = useSelector(state => state.panel);

    return (

        <div>

            <h2> Listado de cuadros </h2>
            {
                panels.map( panel => (
                    <PanelItem 
                        key={panel.id}
                        { ...panel }
                    />
                ))
            }

        </div>

    )

}
