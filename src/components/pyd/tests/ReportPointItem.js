import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fatPointUpdate } from '../../../actions/fat';


export const ReportPointItem = ( fat ) => {

    // Declaramos la variable dispatch para lanzar las acciones al store
    const dispatch = useDispatch();

    // Obtenemos del store todos los points que tenemos
    const { points } = useSelector(state => state.point);

    // Desestructuramos el point para extraer el index, y el resto dejarlo como un objeto
    let { index, ...newFat } = fat;

    // Buscamos en el store el point correspondiente para extraer la información
    const point = points.find( (pt) => (
        pt.id === fat.pointId
    ));

    // console.log( point );

    // Función que usaremos cuando se pinche en el botón OK
    const handleOk = () => {

        // Creamos una nueva variable con el point, y le añadimos el resultado
        newFat = {
            ...newFat,
            result: "OK",
            status: "Reviewed"
        }

        // Hacemos el dispatch de la acción que actualizará el point
        // Le damos la información del nuevo punto, y el índice de su posición
        dispatch( fatPointUpdate( newFat, index ) );

    }

    // Función que usaremos cuando se pinche en el botón KAO
    const handleKAO = () => {

        // Creamos una nueva variable con el point, y le añadimos el resultado
        newFat = {
            ...newFat,
            result: "KAO",
            status: "Checked"
        }

        // Hacemos el dispatch de la acción que actualizará el point
        // Le damos la información del nuevo punto, y el índice de su posición
        dispatch( fatPointUpdate( newFat, index ) );

    }

    // Función que usaremos cuando se pinche en el botón NA
    const handleNA = () => {

        // Creamos una nueva variable con el point, y le añadimos el resultado
        newFat = {
            ...newFat,
            result: "NA",
            status: "Reviewed"
        }

        // Hacemos el dispatch de la acción que actualizará el point
        // Le damos la información del nuevo punto, y el índice de su posición
        dispatch( fatPointUpdate( newFat, index ) );

    }



    return (

        <div>
            
            <p></p>

            <div className="col-2 pyd-serials-list">

                <span> { point.step } </span>

            </div>
            <div className="col-3 pyd-serials-list">

                <span> { point.category } </span>

            </div>
            <div className="col pyd-serials-list">

                <span> { point.description } </span>

            </div>
            <div className="col pyd-serials-list">

                <span> { fat.nonConformity } </span>

            </div>
            {/* <div className="row">

                {
                    ( fat.status === "Reviewed" && fat.result !== "OK" )
                        ? ( <div></div> )
                        : ( <button 
                                className="btn ok-button"
                                onClick={ handleOk }
                            >
                                <h3>OK</h3>
                            </button>
                        )
                }

                {
                    ( fat.status === "Reviewed" && fat.result !== "KAO" )
                        ? ( <div></div> )
                        : ( <button 
                                className="btn kao-button"
                                onClick={ handleKAO }
                            >
                                <h3>KAO</h3>
                            </button>
                        )
                }

                {
                    ( fat.status === "Reviewed" && fat.result !== "NA" )
                        ? ( <div></div> )
                        : ( <button 
                                className="btn na-button"
                                onClick={ handleNA }
                            >
                                <h3>NA</h3>
                            </button>
                        )
                }               

            </div> */}

            {/* <div className="col-2">

                <span> { panel.project } </span>

            </div>
            <div className="col-2">

                <span> { panel.client } </span>

            </div> */}

            


        </div>

    );

};

