import { fetchConToken } from "../helpers/fetch";
import { types } from "../types/types";
import { panelStartAddNew } from "./panels";
import { pointLoading } from "./points";
import { uiCloseFatPointModal } from "./ui";


// Action para cargar los datos del cuadro en el store fat
export const fatPanelLoad = ( panel ) => ({
    type: types.fatSetActive,
    payload: panel,
});

// Función para cargar los fat points en su store
export const fatPointsLoad = ( points ) => {

    return async ( dispatch ) => {

        console.log("Hacemos el dispatch de los fat points")

        // Cargamos los points en el store de las fat
        dispatch( pointsLoad( points ) );

        console.log( points );
    
        // // Finalizamos el arranque de las pruebas
        // dispatch( fatStarted() );

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

// Action para añadir un fat point
const pointAdd = ( point ) => ({
    type: types.fatAddPoint,
    payload: point
})

// Action para actualizar un point
const pointUpdate = ( point, index ) => ({
    type: types.fatUpdatePoint,
    payload: {
        point,
        index,
    }
});

// Función que iniciará la creación de todos los puntos de inspección de un nuevo cuadro en la DB
export const fatStartNew = ( panel ) => {

    return async ( dispatch, getState )  => {
        
        // Tomamos el state auth del store y lo desestructuramos para utilizar la información
        const { uid, name } = getState().auth;
        
        // Creamos una variable para obtener el fat point de la DB o crear uno nuevo
        let fatPoint = {}
        
        // // Creamos una variable array para ir almacenando los fat points
        // let fat = [];
        
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
                points.map( async function (point) {
                    
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
                    );

                    // Añadimos el fat point al store
                    dispatch( pointAdd( fatPoint ) )
                    
                    // Finalizamos el arranque de las pruebas aunque se vuelva a repetir
                    dispatch( fatStarted() )

                });
                                 
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

    // Si nos llega una respuesta afirmativa, devolvemos los datos del test
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
                const { checked, ready } = await fatCheck( points );

                // Si están todos probados lo marcaremos en el store
                if ( checked ) {

                    // Hacemos el dispatch de la acción que pondrá el checked a true
                    dispatch( panelChecked( checked, ready ) );

                }
                
            }
            
        } catch (error) {
            console.log( error );
        }      

    }

};

// Action para borrar el fat point activo
export const clearActiveFatPoint = () => ({
    type: types.fatClearActivePoint,
});

// Action para activar un fat point
export const setActiveFatPoint = ( point, index ) => ({
    type: types.fatSetActivePoint,
    payload: {
        point,
        index,
    }
});



// Función para comprobar si un cuadro ya se terminó de probar
const fatCheck = ( points ) => {

    // Declaramos una variable en true que cambiaremos en cuanto haya una sola prueba sin hacer
    let checked = true;

    // Declaramos una variable en true que cambiaremos en cuanto haya una sola prueba que no esté ok
    let ready = true;

    // Revisamos cada uno de los puntos para ver si están todos probados
    points.map( (pt) => (

        // Si hay alguno que aún no se haya probado se pasa la variable a false
        ( pt.status === "pending" )
            ? ( checked = false )
            : ( "" ),

        // Si hay alguno que esté KAO se pasa la variable a false
        ( pt.result === "KAO")
            ? ( ready = false )
            : ( "" )

    ));       

    // Devolvemos el estado de la variable que nos marcará si las pruebas ya se han hecho o no
    return { checked, ready };

};

// Action para poner el estado del panel en probado
const panelChecked = ( checked, ready ) => ({
    type: types.fatPanelChecked,
    payload: {
        checked,
        ready
    }
})

// Función que finalizará las primera inspección de un cuadro.
export const fatFinish = ( panel, ready ) => {

    // Desestructuramos el panel en una nueva variable para cambiarle los datos
    const { ...newPanel } = panel;

    return async ( dispatch, getState ) => {

        // Tomamos del state el auth del store y lo desestructuramos para utilizar el id del usuario
        const { uid, name } = getState().auth;
        
        // Si el cuadro está listo, cambiamos el estado a ready, de lo contrario a tested
        if ( ready ) {

            // Cambiamos el estado del panel a ready
            newPanel.status = 'ready'
            
        } else {

            // Cambiamos el estado del panel a tested
            newPanel.status = 'tested';
    
        }
        
        // Usamos la función try-catch para lanzar una petición a la db para actualizar el panel a probado
        try {

            // Actualizamos los datos del panel en la DB
            const resp = await fetchConToken( `panels/${ panel.id }`, newPanel, `PUT` );
            const body = await resp.json();

            console.log( body );

            // Si todo fue bien, tendremos un ok en el body
            if ( body.ok ) {

                // Devolvemos un true
                return true;
                
            } else {

                // Si hubo algún problema lanzamos un mensaje de error
                console.log('Ha habido un error en la Base de Datos')
                console.log( body );

                // Devolvemos false
                return false;

            }
            
        } catch (error) {
            console.log(error)
        }
        
    }


}

// Action que limpia el store fat
export const fatClean = () => ({
    type: types.fatClean,
});

// Función que iniciará la carga de todos los puntos de inspección con status KAO
export const fatStartRev = ( panel ) => {

    return async ( dispatch, getState )  => {
        
        // Tomamos el state auth del store y lo desestructuramos para utilizar la información
        const { uid, name } = getState().auth;
        
        // Creamos una variable para obtener el fat point de la DB o crear uno nuevo
        let fatPoint = {}
        
        try {
            
            // Hacemos una petición para obtener los points de la base de datos y almacenamos la respuesta es una variable
            const respPoints = await fetchConToken( 'points' );
            const bodyPoints = await respPoints.json();
            
            // Si la información llegó correctamente pasaremos a cargar los fat points
            if ( bodyPoints.ok ) {
                
                // Almacenamos en una variable todos los puntos de inspección
                const points = bodyPoints.points;

                // Hacemos el dispatch para meterlos al store de points y tener la información a mano              
                dispatch( pointLoading( points ) );

                // Hacemos la petición para obtener los fat points del cuadro
                const respFat = await fetchConToken( `tests/panel/${ panel.id }` );
                const bodyFat = await respFat.json();
               
                // Si todo salió bien hacemos el dispatch de los puntos hacia el store
                if ( bodyFat.ok ) {

                    // Almacenamos en una variable todos los fat points
                    const fatPoints = bodyFat.fat;

                    // Hacemos la comprobación del estado de los fat points
                    const { checked, ready } = await fatCheck( fatPoints );

                    // Si están todos probados lo marcaremos en el store
                    if ( checked ) {

                        // Hacemos el dispatch de la acción que pondrá el checked a true
                        dispatch( panelChecked( checked, ready ) );

                    }

                    // Hacemos el dispatch para meter los puntos en el store
                    dispatch( pointsLoad( fatPoints ) );

                    // Hacemos el dispatch para indicar que se terminó la carga de datos
                    dispatch( fatStarted() );
                    
                } else {

                    // Si no fue bien lanzamos un mensaje de error
                    console.log('No se han recuperado los fat points de la DB');

                }
                                 
            } else {

                // Si no fue bien lanzamos un mensaje de error
                console.log('No se han podido recuperar los points de la DB');

            }

        } catch (error) {
            console.log(error);
        };
        
    };

};

// Función que iniciará la carga de todos los puntos de inspección con status KAO
export const startReport = ( panel ) => {

    return async ( dispatch, getState ) => {

        // Usamos una función try-catch porque vamos a hacer solicitudes a la DB
        try {

            // Hacemos una peticion para obtner los points de la base de datos y almacenamos la respuesta en una variable
            const respPoints = await fetchConToken( 'points' );
            const bodyPoints = await respPoints.json();

            // Si la información llegó correctamente pasamos a cargar los fat points en el store
            if ( bodyPoints.ok ) {

                // Hacemos el dispatch para meter los points en su store y tener la información a mano
                dispatch( pointLoading( bodyPoints.points ) );

                // Hacemos la petición para obtener los fat points del cuadro
                const respFat = await fetchConToken( `tests/panel/${ panel.id }` );
                const bodyFat = await respFat.json();

                // Si todo salió bien hacemos el dispatch de los fat points hacia su store
                if ( bodyFat.ok ) {

                    // Almacenamos en una variable aquellos fat points que tengan el resultado KAO
                    const fatPoints = bodyFat.fat.filter( (pt) => {
                        return pt.result === "KAO"
                    });

                    // Hacemos el dispatch para meter los fat points a su store
                    dispatch( pointsLoad( fatPoints ) );

                    // Hacemos el dispatch para indicar que terminó la carga de los fat points
                    dispatch( fatStarted() );

                } else {

                    // Si no fue bien la carga de fat points lanzamos un mensaje
                    console.log('No se han recuperado los fat points de la DB');
                }

            } else {

                // Si no fue bien la carga de los points lanzamos un mensaje
                console.log('No se han podido recuperar los points de la DB');
                
            }
            
        } catch (error) {
            console.log( error );
        }

    }

}

// Action para añadir las categorias y los steps al store
const loadCategories = ( categories, steps ) => ({
    type: types.fatLoadCategories,
    payload: {
        categories,
        steps,
    }
});

// Función que iniciará la carga de todos los puntos de inspección de un cuadro que sean de aplicación
export const startCertificate = ( panel ) => {

    return async ( dispatch, getState) => {

        // Usamos una función try-catch porque vamos a hacer solicitudes a la DB
        try {

            // Hacemos una petición para obtener los points de la DB y almacenarlos en su store
            const respPoints = await fetchConToken( 'points' );
            const bodyPoints = await respPoints.json();

            // Si la información llegó correctamente pasamos a cargar los fat points
            if ( bodyPoints.ok ) {

                // Hacemos el dispatch para meter los points en su store
                dispatch( pointLoading( bodyPoints.points ) );

                // Hacemos la petición para obtener los fat points del cuadro
                const respFat = await fetchConToken( `tests/panel/${ panel.id }` );
                const bodyFat = await respFat.json();

                // Si todo salió bien hacemos el dispath de los fat points hacia su store
                if ( bodyFat.ok ) {

                    // Almacenamos en una variable aquellos fat points que sean de aplicación
                    const fatPoints = bodyFat.fat.filter( (pt) => {
                        return ( pt.result === "OK" || pt.result === "KAO" )
                    });

                    // Enviamos los points y los fatPoints a una función que nos devolverá las categorías y su estado
                    const data = await getSteps( bodyPoints.points, fatPoints );
                    
                    // Hacemos el dispatch para meter los fat points a su store
                    dispatch( pointsLoad( fatPoints ) );
                    
                    // Hacemos el dispatch para meter las categorías al store
                    dispatch( loadCategories( data.categories, data.steps ));
                    
                    // Hacemos el dispatch para indicar que terminó la carga de los fat points
                    dispatch( fatStarted() );

                } else {

                    // Si no fue bien la carga de fat points lanzamos un mensaje
                    console.log('No se han recuperado los fat points de la DB');

                }

            } else {

                // Si no fue bien la carga de los points lanzamos un mensaje
                console.log('No se han podido recuperar los points de la DB');

            }
            
        } catch (error) {
            console.log( error );
        }

    }
    
}

// Función para obtener los steps y las categories de los fat points
const getSteps = async ( points, fatPoints ) => {

    // Declaramos dos variables para ir almacenando la información
    let steps = [];
    let categories = [];

    // Modificamos los fat points para añadirles la categoría y el step
    const newFatPoints = await fatPoints.map( (pt) => {

        // Desestructuramos el punto creando una nueva variable para poder modificarlo
        // y meterle más información
        const { ...point } = pt;

        // Buscamos la información de su point correspondiente y la tenemos a mano
        const data = points.filter( (dt) => {
            return dt.id === pt.pointId
        });

        // Devolvemos el fat point pero añadiéndole la categoría y el paso al que pertenece
        return {
            ...point,
            step: data[0].step,
            category: data[0].category,
        }

    })

    // Hacemos un map de los points para ir sacando steps y categories únicos
    await newFatPoints.map( pt => {

        // Almacenamos en una variable la categoría del punto
        const step = pt.step;

        // Si la categoría no está incluída en el array de categorías la añadimos
        if ( !steps.includes( step ) ) {
            steps.push( step );
        }

        // Almacenamos en una variable el step del punto
        const category = pt.category

        // Si el step no está incluído en el array de steps lo añadimos
        if ( !categories.includes( category) ){
            categories.push( category );
        }

    });

    categories = await checkCategories( categories, newFatPoints);

    return {
        steps,
        categories,
    }

    console.log(`=====STEPS=====`);
    console.log(steps);
    console.log(`=====CATEGORIES=====`);
    console.log(categories);
    

}

// Declaramos una función para comprobar si las categorías ya están listas o no
const checkCategories = ( categories, points ) => {

    // Declaramos una variable que va a ser un array de objetos
    let results = [];

    // Hacemos un map de las categorías para introducirlas en el array objetivo
    categories.map( async (cat) => {

        // Hacemos una comprobación de cada categoría para ver si está OK
        const ok = await checkPoints( points.filter( (pt) => {
            return pt.category === cat
        }));

        // Devolvemos el resultado de la categoría
        results.push({ category: cat, result: ok });

    })

    // Devolvemos el array results
    return results;

}

// Declaramos una función para comprobar si todos los puntos están OK
const checkPoints = ( points ) => {

    // Declaramos una variable en true que cambiaremos en cuanto un solo point esté KAO
    let ok = true;

    // Hacemos un map de los puntos
    points.map( (pt) => (

        // Si el punto está KAO pasamos el ok a false
        ( pt.result === "KAO" )
            ? ( ok = false )
            : ("")

    ));

    // Devolvemos el ok
    return ok;

}

// Funcion para crear el certificado en pdf
export const createReport = ( panel, points ) => {

    return async ( dispatch ) => {

        // Al lanzar una petición al backend lo hacemos con un try-catch
        try {
            
            // Creamos una variable con los datos que vamos a enviar en la petición
            const data = {
                panel,
                points
            }
            
            // Hacemos la llamada al backend para hacer el report en pdf
            const resp = await fetchConToken( `reports/report`, data, 'POST' );
            // Y decodificamos la respuesta para su descarga
            const hajk = await resp.blob().then( blob => download(blob) );

            // En función de la respuesta que nos llegue devolvemos el valor true o false
            if ( resp.status === 200 ) {
                return true
            } else {
                return false
            }
            
        } catch (error) {
            console.log(error)
        }

    };

}

// Funcion para crear el certificado en pdf
export const createCertificate = async ( panel, categories ) => {

    // Al lanzar una petición al backend lo hacemos con un try-catch
    try {
            
        // Creamos una variable con los datos que vamos a enviar en la petición
        const data = {
            panel,
            categories
        }
        
        // Hacemos la llamada al backend para hacer el certificate en pdf
        const resp = await fetchConToken( `reports/certificate`, data, 'POST' );
        // Y decodificamos la respuesta para su descarga
        const hajk = await resp.blob().then( blob => download(blob) );

        // En función de la respuesta que nos llegue devolvemos el valor true o false
        if ( resp.status === 200 ) {
            return true
        } else {
            return false
        }
        
    } catch (error) {
        console.log(error)
    }

}

// Función copiada de la red para descargar el archivo
function download(blob, filename) {

    console.log("DOWNLOAD")
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    // the filename you want
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }