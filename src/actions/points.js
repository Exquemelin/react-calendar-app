import { fetchConToken } from "../helpers/fetch";
import { types } from "../types/types";



// Función que iniciará la carga de cuadros desde la DB
export const pointStartLoading = () => {

    return async ( dispatch ) => {

        try {

            // Lanzamos la petición del get panles a la DB.
            // Al ser una petición GET solo hay que enviar el endpoint
            const resp = await fetchConToken( 'points' );
            const body = await resp.json();

            // Almacenamos los cuadros en una variable
            const points = body.points

            // Hacemos el dispatch que cargará los cuadros en el store
            dispatch( pointLoading( points ) );
            
        } catch (error) {
           console.log(error); 
        };
        
    };
    
};

// Action para hacer la carga de los cuadros en el store
export const pointLoading = ( points ) => ({
    type: types.pointLoading,
    payload: points,
});

// Función que iniciará la creación de un nuevo punto en la DB
export const pointStartAddNew = ( point ) => {

    return async ( dispatch, getState )  => {

        // Tomamos el state auth del store y lo desestructuramos para utilizar la información
        const { uid, name } = getState().auth;

        try {

            // Hacemos la petición de grabación en la base de datos y almacenamos la respuesta en una variable
            const resp = await fetchConToken( 'points', point, 'POST');
            const body = await resp.json()

            console.log(body);

            if ( body.ok ) {

                // Hacemos dispatch del cuadro para introducirlo en el store
                point.id = body.point.id;
                // Los datos del user los obtenemos del store
                point.user = {
                    id: uid,
                    name: name,
                };

                // Hacemos el dispatch del cuadro para pasarlo al store
                dispatch( pointAddNew( point ) );

            };
            
        } catch (error) {
            console.log(error);
        };
        
    };

};

// Action para añadir un nuevo cuadro al store
// Solo lo vamos a utilizar aquí, así que no es necesario exportarlo
const pointAddNew = ( point ) => ({
    type: types.pointAddNew,
    payload: point,
});