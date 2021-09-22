import React from 'react'
import { useDispatch } from 'react-redux';
import { fatPanelLoad } from '../../../actions/fat';


export const FatPanelItem = ( panel ) => {

    // Declaramos la variable dispatch para lanzar las acciones al store
    const dispatch = useDispatch();

    const handleClick = ({ target }) => {

        console.log( panel.serial );

        // Cargamos los datos del cuadro en el store de las fat para tenerlos a meno
        dispatch( fatPanelLoad( panel ) );

    }

    return (

        <div className="row pyd-serials-list" onClick={ handleClick }>

            <div className="col-2">

                <span> { panel.serial } </span>

            </div>
            <div className="col-3">

                <span> { panel.name } </span>

            </div>
            <div className="col-3">

                <span> { panel.type } </span>

            </div>
            <div className="col-2">

                <span> { panel.project } </span>

            </div>
            <div className="col-2">

                <span> { panel.client } </span>

            </div>

        </div>

    )

}
