import { fetchConToken } from "../helpers/fetch";
import { types } from "../types/types";
import { panelStartAddNew } from "./panels";
import { pointLoading } from "./points";


// Action para cargar los datos del cuadro en el store fat
export const fatPanelLoad = ( panel ) => ({
    type: types.fatSetActive,
    payload: panel,
});

// Función para cargar los fat points en su store
export const fatPointsLoad = ( points ) => {

    return async ( dispatch ) => {

        // Cargamos los points en el store de las fat
        dispatch( pointsLoad( points ) );
    
        // Finalizamos el arranque de las pruebas
        dispatch( fatStarted() );

    };

};

// Action para cargar los points en el store fat
const pointsLoad = ( points ) => ({
    type: types.fatLoadPoints,
    payload: points,
});

// Action para poner el starting en false
const fatStarted = () => ({
    type: types.fatStarting,
});

// Action para actualizar un point
const pointUpdate = ( point, index ) => ({
    type: types.fatUpdatePoint,
    payload: {
        point,
        index,
    }
});

// TODO: Revisar la función y adaptarla a las necesidades
// Función que iniciará la creación de todos los puntos de inspección de un nuevo cuadro en la DB
export const fatStartNew = ( panel ) => {

    console.log( "Arrancando uno nuevo");

    return async ( dispatch, getState )  => {

        // Tomamos el state auth del store y lo desestructuramos para utilizar la información
        const { uid, name } = getState().auth;

        // Creamos una variable para obtener el fat point de la DB o crear uno nuevo
        let fatPoint = {}
        
        // Creamos una variable array para ir almacenando los fat points
        let fat = [];
        
        try {

            // Hacemos una petición para obtener los points de la base de datos y almacenamos la respuesta es una variable
            const respPoints = await fetchConToken( 'points' );
            const bodyPoints = await respPoints.json();

            // Si la información llegó correctamente pasaremos a crear los fat points
            if ( bodyPoints.ok ) {

                // Almacenamos en una variable todos los puntos de inspección
                const points = bodyPoints.points;

                // Hademos el dispatch para meterlos al store de points y tener la información a mano
                dispatch( pointLoading( points ) );

                // Usamos la función map para ir creando los fat con la información que necesitamos
                points.map( async (point) => (

                    // Creamos el fat point y lo pasamos a la función que lo creará en la DB
                    fatPoint = await fatPointAddNew(
                        {
                            serial: panel.serial,
                            panelId: panel.id,
                            pointId: point.id,
                            status: "pending",
                            result: "pending",
                            technician: uid,
                            user: uid,
                        }
                    ),

                    // Añadimos el fat point a la lista para luego cargarlo en el store
                    fat.push( fatPoint ),

                    // Cargamos los fat points del cuadro en el store
                    dispatch( fatPointsLoad( fat ) )

                ));

            }

        } catch (error) {
            console.log(error);
        };
        
    };

};

// Función para crear un fat point en la DB
const fatPointAddNew = async ( point ) => {

    // Consultamos con la base de datos si existe un test para un punto y un panel concretos
    const resp = await fetchConToken( `tests/fat?panelId=${ point.panelId }&pointId=${ point.pointId }` );
    // const body = await resp.json();

    // Si nos llega una respusta afirmativa, devolvemos los datos del test
    if ( resp.status === 200 ) {

        // Hacemos el decode del body de la respuesta
        const body = await resp.json();

        // Devolvemos el fat point de la respuesta
        return body.fat[0];

    } else {

        // Si no existe el fat point lo creamos en la DB
        const resp = await fetchConToken( `tests/`, point, `POST`);
        const body = await resp.json();

        // Devolvemos el fat point que nos llegó de la DB
        return body.fat;

    }
    
};

// Función para actualizar un point
export const fatPointUpdate = ( point, index ) => {
    
    return async ( dispatch, getState ) => {

        // Tomamos los datos del usuario para introducir información en el punto
        const { uid, name } = getState().auth;

        // Cargamos el id del usuario como técnico de la prueba
        point.technician = uid;

        // Usamos una función try-catch para lanzar consultas al backend
        try {

            // Hacemos una petición para actualizar el fat point en la DB
            const resp = await fetchConToken( `tests/${ point.id }`, point, `PUT` );
            const body = await resp.json();

            // Si todo salió bien, hacemos el dispatch del punto hacia el store
            if ( body.ok ) {

                // Hacemos el dispatch para modificar el fat point en el store
                dispatch( pointUpdate( point, index ) );

                // Tomamos los datos de los fat points para evaluarlos
                const { points } = getState().fat;

                // Hacemos la comprobación del estado de los fat points
                const checked = await fatCheck( points );

                // Si están todos probados lo marcaremos en el store
                if ( checked ) {

                    // Hacemos el dispatch de la acción que pondrá el checked a true
                    dispatch( panelChecked() );

                }
                
            }
            
        } catch (error) {
            console.log( error );
        }      

    }

};

// Función para comprobar si un cuadro ya se terminó de probar
const fatCheck = ( points ) => {

    // Declaramos una variable en true que cambiaremos en cuanto haya una sola prueba sin hacer
    let checked = true;

    // Revisamos cada uno de los puntos para ver si están todos probados
    points.map( (pt) => (

        // Si hay alguno que aún no se haya probado se pasa la variable a false
        ( pt.status === "pending" )
            ? ( checked = false )
            : ( "" )

    ));       

    // Devolvemos el estado de la variable que nos marcará si las pruebas ya se han hecho o no
    return checked;

};

// Action para poner el estado del panel en probado
const panelChecked = () => ({
    type: types.fatPanelChecked,
})

// Action que limpia el store fat
export const fatClean = () => ({
    type: types.fatClean,
})