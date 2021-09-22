import { fetchConToken } from "../helpers/fetch";
import { types } from "../types/types";



// Función que iniciará la carga de cuadros desde la DB
export const panelStartLoading = () => {

    return async ( dispatch ) => {

        try {

            // Lanzamos la petición del get panles a la DB.
            // Al ser una petición GET solo hay que enviar el endpoint
            const resp = await fetchConToken( 'panels' );
            const body = await resp.json();

           // Almacenamos los cuadros en una variable
            const panels = body.panels

            // Hacemos el dispatch que cargará los cuadros en el store
            dispatch( panelsLoaded( panels ) );
            
        } catch (error) {
           console.log(error); 
        }
        
    }
    
};

// Action para hacer la carga de los cuadros en el store
const panelsLoaded = ( panels ) => ({
    type: types.panelLoading,
    payload: panels,
});

// Función que iniciará la creación de un nuevo cuadro en la DB
export const panelStartAddNew = ( panel ) => {

    return async ( dispatch, getState )  => {

        // Tomamos el state auth del store y lo desestructuramos para utilizar la información
        const { uid, name } = getState().auth;

        try {

            // Hacemos la petición de grabación en la base de datos y almacenamos la respuesta en una variable
            const resp = await fetchConToken( 'panels', panel, 'POST');
            const body = await resp.json()

             if ( body.ok ) {

                // Hacemos dispatch del cuadro para introducirlo en el store
                panel.id = body.panel.id;
                // Los datos del user los obtenemos del store
                panel.user = {
                    id: uid,
                    name: name,
                }
                // Establecemos el estado inicial del panel
                panel.status = "pending";

                // Hacemos el dispatch del cuadro para pasarlo al store
                dispatch( panelAddNew( panel ) );

            }
            
        } catch (error) {
            console.log(error);
        };
        
    };

};

// Action para añadir un nuevo cuadro al store
// Solo lo vamos a utilizar aquí, así que no es necesario exportarlo
const panelAddNew = ( panel ) => ({
    type: types.panelAddNew,
    payload: panel,
});