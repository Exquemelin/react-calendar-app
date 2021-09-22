import React from 'react'


import { useSelector } from 'react-redux';


import { FatPanelItem } from './FatPanelItem';


export const FatPanelsList = () => {

    // Obtenemos del store todos los cuadros que tenemos
    const { panels } = useSelector(state => state.panel);

    return (

        <div>

            <h2> Listado de cuadros </h2>
            {
                panels.map( panel => (
                    <FatPanelItem 
                        key={panel.id}
                        { ...panel }
                    />
                ))
            }

        </div>

    );

};
