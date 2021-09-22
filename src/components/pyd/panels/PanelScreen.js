import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';


import { Navbar } from '../../ui/Navbar'


import { panelStartLoading } from '../../../actions/panels'
import { PanelList } from './PanelList';
import { AddPanelFab } from '../../ui/AddPanelFab';
import { PanelModal } from './PanelModal';


export const PanelScreen = () => {

    // Declaramos la variable dispatch para lanzar las acciones al store
    const dispatch = useDispatch();

    // Obtenemos del store todos los cuadros que tenemos
    const { panels } = useSelector(state => state.panel);

    // Utilizamos el useEffect para ver cuando se carga la página y solicitar los cuadros a la DB
    useEffect(() => {

        // Hacemos el dispatch de la carga de los cuadros
        dispatch( panelStartLoading() );
        
    }, [ dispatch ]);

    
    return (

        <div>

            <Navbar />
            
            <h1>Números de Serie</h1>
            <p></p>

            {
                ( panels.length > 0 ) 
                    ? ( <PanelList /> )
                    : ( <div></div> )
            }

            <AddPanelFab />

            <PanelModal />

        </div>
    )
}
