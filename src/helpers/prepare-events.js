import moment from "moment";


// Creamos una función para transformar las fechas de los eventos de string a date
export const prepareEvents = ( events ) => {    
    
    // pasamos todos los eventos por un .map para ir haciendo los cambios
    return events.map(

        // Por cada evento e hacemos lo siguiente
        (e) => ({
            ...e,
            end: moment( e.end ).toDate(),
            start: moment( e.start).toDate(),
        })
        
    );

}