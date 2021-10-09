import { findRenderedComponentWithType } from "react-dom/test-utils";


// Tomamos la url base del enviroment
const baseUrl = process.env.REACT_APP_API_URL


// Información para las fetch hacia ASANA
// url base
const asanaUrl = 'https://app.asana.com/api/1.0';

// TODO: ocultar la key de ASANA
// Autorización
const authorization = `Bearer ${ASANA_API}`;
// me
const me = {
    "gid": "1144573007538297",
    "email": "iballesteros@pydautomatizacion.es",
    "name": "Iván Chao",
    "photo": {
        "image_21x21": "https://s3.amazonaws.com/profile_photos/1144573007538297.qFevIHfRaPsL0Ld2MH51_21x21.png",
        "image_27x27": "https://s3.amazonaws.com/profile_photos/1144573007538297.qFevIHfRaPsL0Ld2MH51_27x27.png",
        "image_36x36": "https://s3.amazonaws.com/profile_photos/1144573007538297.qFevIHfRaPsL0Ld2MH51_36x36.png",
        "image_60x60": "https://s3.amazonaws.com/profile_photos/1144573007538297.qFevIHfRaPsL0Ld2MH51_60x60.png",
        "image_128x128": "https://s3.amazonaws.com/profile_photos/1144573007538297.qFevIHfRaPsL0Ld2MH51_128x128.png"
    },
    "resource_type": "user",
    "workspaces": [
        {
            "gid": "1143339169851116",
            "name": "pydautomatizacion.es",
            "resource_type": "workspace"
        }
    ]
}
// Workspace 
const workspace = {
    "gid": "1143339169851116",
    "name": "pydautomatizacion.es",
    "resource_type": "workspace"
}
// Team de pruebas
const team = {
    "gid": "1201131651798820",
    "name": "Tests",
    "resource_type": "team"
}

// Creamos un fecth en el que no vamos a usar el token
// Va a recibir el argumento, por ejemplo '/auth', que será el endpoint
// Luego va la data, y por úlitmo el método, que si no viene usaremos el GET por defecto
const fetchSinToken = ( endpoint, data, method = 'GET' ) => {

    // Montamos la url completa y la pasamos a una variable
    const url = `${ baseUrl }/${ endpoint }`; // localhost:4010/api/

    // Si el método es un GET lo lanzamos directamente
    if ( method === 'GET' ) {

        return fetch( url );

    } else {

        // Si no es un GET, tendremos que pasarle más configuraciones
        return fetch( url, {
            method,
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify( data ),
        });

    }

}

// Creamos una función para hacer el fecth, pero esta vez con token
const fetchConToken = ( endpoint, data, method = 'GET' ) => {

    // Montamos la url completa y la pasamos a una variable
    const url = `${ baseUrl }/${ endpoint }`; // localhost:4010/api/

    // Obtenemos el token del local storage para comprobar si es válido
    // Si viniese un null, ponemos las '' para mandar un string vacío por defecto y evitar el null
    const token = localStorage.getItem('token') || '';

    // Si el método es un GET lo lanzamos añadiendo los headers
    if ( method === 'GET' ) {

        return fetch( url, {
            method,
            headers: {
                'x-token': token,
            }
        } );

    } else {

        // Si no es un GET, tendremos que pasarle más configuraciones
        return fetch( url, {
            method,
            headers: {
                'Content-type': 'application/json',
                'x-token': token,
            },
            body: JSON.stringify( data ),
        });

    }

}

// Creamos un fetch para lanzar a ASANA las peticiones
const fetchAsana = async ( params ) => {

    // Desestructuramos los parámetros para poder utilizarlos
    const { number, client, description, engineering, workshop } = params;

    // Preparamos la información del proyecto para poder lanzarla
    const projectData = {
        number,
        client,
        description,
        owner: null,
        team: team.gid,
    }

    // Creamos una variable sections con las primeras secciones fijas
    // Luego iremos añadiendo el resto según se vayan necesitando
    const sections = [
        { 
            name: "Referencia",
            tasks: [
                {
                    assignee: null,
                    followers: [],
                    name: "Jefe de Proyecto",
                    notes: "Iván Chao Ballesteros",
                    workspace: workspace.gid,
                }
            ]
        },
    ];

    // Creamos una variable con la sección de ingeniería
    const design = { 
        name: "Diseño",
        tasks: [
            {
                assignee: null,
                followers: [],
                name: "DISEÑO INGENIERÍA - Entradas de datos para el desarrollo de la Ingeniería",
                notes: "Debemos recopilar los datos necesarios previamente a la realización de la ingeniería y esquemas eléctricos. Comprobaremos que tenemos toda la información listada en las subtareas, y la que nos falté se deberá solicitar al cliente.",
                subtasks: [
                    {
                        assignee: null,
                        followers: [],
                        name: "Disponibilidad del Software y herramientas necesarias para la ejecución",
                        notes: 'Comprobamos si disponemos de todos los programas necesarios para desarrollar la ingeniería',
                        workspace: workspace.gid,
                    },
                    {
                        assignee: null,
                        followers: [],
                        name: "Norma Aplicable (IEC 61439, 2014/35/UE, Otra)",
                        notes: 'Tenemos que consultar la normativa de aplicación en este proyecto',
                        workspace: workspace.gid,
                    }
                ],
                workspace: workspace.gid,
            },
            {
                assignee: null,
                followers: [],
                name: "DISEÑO INGENIERÍA - Validación de la ingeniería por parte del cliente",
                notes: 'Se enviará la ingeniería al cliente para su validación. En caso afirmativo, se guardará el correo en formato pdf, y se subirá a esta tarea. marcándose ya como finalizada. A partir de este punto los esquemas pasan a versión "V" de validados.',
                workspace: workspace.gid,
            },
            {
                assignee: null,
                followers: [],
                name: "DISEÑO INGENIERÍA - Aprobación final del diseño",
                notes: 'Una vez finalizadas las pruebas FAT, y comprobado el correcto funcionamiento del diseño, se dará este por aprobado. Se marcará la tarea como finalizada. Los esquemas se pasar a a versión "AB" de As Built.',
                workspace: workspace.gid,
            }
        ]
    }

    // Si lleva diseño de ingeniería, añadimos su sección
    if ( engineering ) {

        // Añadimos las secciones de diseño
        sections.push( design )

    }

    // Creamos una variable con la sección de taller y un cuadro
    const production = { 
        name: "Taller",
        tasks: [
            {
                assignee: null,
                followers: [],
                name: "2021/0XXX",
                notes: "Fabricación del cuadro según ingeniería",
                subtasks: [
                    {
                        assignee: null,
                        followers: [],
                        name: "Montaje",
                        notes: '',
                        workspace: workspace.gid,
                    },
                    {
                        assignee: null,
                        followers: [],
                        name: "Embarrado",
                        notes: '',
                        workspace: workspace.gid,
                    },
                    {
                        assignee: null,
                        followers: [],
                        name: "Cableado",
                        notes: '',
                        workspace: workspace.gid,
                    },
                    {
                        assignee: null,
                        followers: [],
                        name: "Remates",
                        notes: '',
                        workspace: workspace.gid,
                    },
                    {
                        assignee: null,
                        followers: [],
                        name: "Pruebas",
                        notes: '',
                        workspace: workspace.gid,
                    },
                    {
                        assignee: null,
                        followers: [],
                        name: "Ampliaciones/Modificaciones",
                        notes: '',
                        workspace: workspace.gid,
                    },
                    {
                        assignee: null,
                        followers: [],
                        name: "Peforex",
                        notes: '',
                        workspace: workspace.gid,
                    },
                    
                ],
                workspace: workspace.gid,
            },
            
        ]
    }

    // Si lleva fabricación, añadimos la sección de taller
    if ( workshop ) {

        // Añadimos la sección de taller
        sections.push( production );

    }

    // Añadimos el resto de secciones
    sections.push( { name: "O.T." },
    { name: "Calidad" },
    { name: "Automatización" },
    { name: "Administración" },
    { name: "Taller" } );

    // const defaultsections = [
    //     { 
    //         name: "Referencia",
    //         tasks: [
    //             {
    //                 assignee: null,
    //                 followers: [],
    //                 name: "Jefe de Proyecto",
    //                 notes: "Iván Chao Ballesteros",
    //                 workspace: workspace.gid,
    //             }
    //         ]
    //     },
    //     { 
    //         name: "Diseño",
    //         tasks: [
    //             {
    //                 assignee: null,
    //                 followers: [],
    //                 name: "DISEÑO INGENIERÍA - Entradas de datos para el desarrollo de la Ingeniería",
    //                 notes: "Debemos recopilar los datos necesarios previamente a la realización de la ingeniería y esquemas eléctricos. Comprobaremos que tenemos toda la información listada en las subtareas, y la que nos falté se deberá solicitar al cliente.",
    //                 subtasks: [
    //                     {
    //                         assignee: null,
    //                         followers: [],
    //                         name: "Disponibilidad del Software y herramientas necesarias para la ejecución",
    //                         notes: 'Comprobamos si disponemos de todos los programas necesarios para desarrollar la ingeniería',
    //                         workspace: workspace.gid,
    //                     },
    //                     {
    //                         assignee: null,
    //                         followers: [],
    //                         name: "Norma Aplicable (IEC 61439, 2014/35/UE, Otra)",
    //                         notes: 'Tenemos que consultar la normativa de aplicación en este proyecto',
    //                         workspace: workspace.gid,
    //                     }
    //                 ],
    //                 workspace: workspace.gid,
    //             },
    //             {
    //                 assignee: null,
    //                 followers: [],
    //                 name: "DISEÑO INGENIERÍA - Validación de la ingeniería por parte del cliente",
    //                 notes: 'Se enviará la ingeniería al cliente para su validación. En caso afirmativo, se guardará el correo en formato pdf, y se subirá a esta tarea. marcándose ya como finalizada. A partir de este punto los esquemas pasan a versión "V" de validados.',
    //                 workspace: workspace.gid,
    //             },
    //             {
    //                 assignee: null,
    //                 followers: [],
    //                 name: "DISEÑO INGENIERÍA - Aprobación final del diseño",
    //                 notes: 'Una vez finalizadas las pruebas FAT, y comprobado el correcto funcionamiento del diseño, se dará este por aprobado. Se marcará la tarea como finalizada. Los esquemas se pasar a a versión "AB" de As Built.',
    //                 workspace: workspace.gid,
    //             }
    //         ]
    //     },
    //     { name: "O.T." },
    //     { name: "Calidad" },
    //     { name: "Automatización" },
    //     { name: "Administración" },
    //     { name: "Taller" },
    // ]
    
    // TODO: Eliminar
    console.log('ASANA')

    // const resp = await fetch( asanaUrl, {
    //     method: 'GET',
    //     headers: {
    //         'Authorization': authorization,
    //     },
    // })

    // Creamos el proyecto y almacenamos la respuesta para poder usar sus datos
    const project = await createProject( projectData );

    // Definimos una variable para ir almacenando la información de las secciones
    let newSections = [];

    // Definimos una variable para ir almacenando el gid de la sección creada para la siguiente
    let prevSection = null;

    // TODO: borrar
    console.log( projectData );
    console.log( sections );

    // Hacemos el map para crear las secciones
    // TODO: Ver de ordenar las secciones
    // await sections.map( async (item) => {

    //     // Creamos la sección
    //     const section = await createSection( project.gid, item, prevSection );

    //     // Añadimos la sección al array
    //     newSections.push( section );

    //     // Al macenamos su gid para la siguiente
    //     prevSection = section.gid;

    //     console.log( prevSection );
        
    //     // Hacemos el return de la sección
    //     return section;

    // });

    // Hacemos un bucle para recorrer todas las secciones en orden y crearlas
    for ( var i = 0; i < sections.length; i++ ) {

        // Creamos la sección
        const newSection = await createSection( project.gid, sections[i], prevSection );

        // Añadimos la sección al array
        newSections.push( newSection );

        // Al macenamos su gid para la siguiente
        prevSection = newSection.gid;

    }

    // console.log( project );


    // console.log( newSections );
    

    

}

// Función para crear un proyecto
const createProject = async ( projectData ) => {

    // Formamos la url a la que tenemos que llamar
    const url = `${ asanaUrl }/projects` 

    // Desestructuramos el proyecto para usar la información
    const { number, description, owner, team } = projectData;

    // Preparamos el nombre del proyecto
    const name = `${ number } - ${ description }`

    // Preparamos la información que hay que enviar
    const newData = {
        data: {
            archived: false,
            color: "dark-green",
            // "current_status": {
            //     "author": {
            //     "name": "Greg Sanchez"
            //     },
            //     "color": "green",
            //     "created_by": {
            //     "name": "Greg Sanchez"
            //     },
            //     // "html_text": "",
            //     "text": "The project is moving forward according to plan...",
            //     "title": "Status Update - Jun 15"
            // },
            // "current_status": null,
            //   "custom_fields": {
            //     "4578152156": "Not Started",
            //     "5678904321": "On Hold"
            //   },
            default_view: "list",
            due_date: null,
            due_on: null,
            //   "followers": "12345,23456",
            // "html_notes": "",
            is_template: false,
            name: name,
            notes: "",
            owner: me.gid, // TODO: Cambiar por el owner que entra por parámetros
            public: true,
            start_on: null,
            team: team
        }
    }

    // Como hay que hacer un fetch, tenemos que pasarlo por un try-catch
    try {
        
        // Almacenamos la respuesta en una variable para luego devolver la información que nos interese
        const resp = await fetch( url, {
            method: 'POST',
            headers: {
                'Authorization': authorization,
            },
            body: JSON.stringify( newData )
        });

        // Pasamos el body por el json
        const body = await resp.json();

        // Si todo fue bien devolvemos la información que nos devolvió la API
        if ( resp.ok ) {

            // Devolvemos el body con la información
            return body.data;

        } else {

            // Si hubo algún error imprimimos un mensaje en consola
            console.log('No se pudo crear el proyecto');

        }

    } catch (error) {
        console.log( error );
    }

}

// Función para crear una sección en un proyecto
const createSection = async ( project, section, prevSection ) => {

    // Montamos la url que hay que usar
    const url = `${ asanaUrl }/projects/${ project }/sections`;

    // Desestructuramos la variable section
    const { name, tasks } = section;

    // Preparamos la información que hay que enviar
    const data = {
        data: {
            insert_after: prevSection,
            name,
        }
    };

    // Para lanzar el fetch usaremos un try-catch
    try {
        
        // Hacemos el fetch de la creación de la sección y almacenamos la respuesta
        const resp = await fetch( url, {
            method: 'POST',
            headers: {
                'Authorization': authorization,
            },
            body: JSON.stringify( data )
        });
  
        // Decodificamos la respuesta para enviarla ya decodificada
        const body = await resp.json();
        
        // Si todo fue bien, avanzamos
        if ( resp.ok ) {

            // TODO: Eliminar
            console.log( tasks );
            
            // Si la sección tiene tareas habrá que crearlas. De lo contrario se devolverá ya la información
            if ( tasks !== undefined ) {
                
                // Declaramos una variable para almacenar el gid de la anterior tarea
                let prevTask = null;
                
                // Hacemos un bucle for para ir creando las tareas
                for ( var i = 0; i < tasks.length; i++) {
                    
                    // Llamamos a la función que va a crear la tarea y la almacenamos en una variable
                    const newTask = await createTask( project, body.data.gid, tasks[i], prevTask )
                    
                    // Pasamos el gid de la tarea a la variable previa
                    prevTask = newTask.gid
                    
                    //TODO: Eliminar
                    console.log( newTask );
                    
                }

                // Cuando acabe devolvemos la información
                return body.data;
                
            } 
                
            // Si no hay tareas que crear devolvemos la información
            return body.data;

        } else {

            // Si no fue bien, mostramos un mensaje en consola
            console.log( 'No se pudo crear la sección' );
        };

    } catch (error) {
        console.log( error );
    }

}

// Función para crear tareas en las secciones
const createTask = async ( project, section, task, prevTask ) => {

    // Montamos la url que hay que usar para la tarea
    const url = `${ asanaUrl }/tasks`

    // Desestructuramos la tarea para usar su información
    const { assignee, followers, name, notes, subtasks, workspace} = task;

    // Metemos la información de la tarea en una variable para completarla
    const data = {
        data: {
            approval_status: "pending",
            assignee: assignee,
            assignee_status: "upcoming",
            completed: false,
            due_at: null,
            due_on: null,
            followers: followers,
            name: name,
            notes: notes,
            parent: null,
            projects: [
                project
            ],
            resource_subtype: "default_task",
            start_on: null,
            TAGS: [],
            workspace: workspace,
        }
    }   
                
    // Utilizaremos la función try-catch al tener que hacer una petición API
    try {

        // Hacemos la petición fetch y almacenamos la respuesta en una variable
        const resp = await fetch( url, {
            method: 'POST',
            headers:{
                'Authorization': authorization
            },
            body: JSON.stringify( data )
        })

        // Decodificamos la respuesta
        const body = await resp.json();

        // Si todo fue bien, tenemos que asignar la tarea a una sección
        if ( resp.ok ) {
            
            // Lanzamos la función para asignar la tarea a una sección
            await asignTask( section, body.data.gid, prevTask );
            
            // Si la sección tiene subtareas habrá que crearlas. De lo contrario se devolverá ya la información
            if ( subtasks !== undefined ) {
                
                // Declaramos una variable para almacenar el gid de la anterior tarea
                let prevTask = null;
                
                // Hacemos un bucle for para ir creando las tareas
                for ( var i = 0; i < subtasks.length; i++) {
                    
                    // Llamamos a la función que va a crear la tarea y la almacenamos en una variable
                    const newSubTask = await createNewSubTask( project, section, subtasks[i], body.data.gid, prevTask )
                    
                    // Pasamos el gid de la tarea a la variable previa
                    prevTask = newSubTask.gid
                    
                    //TODO: Eliminar
                    console.log( newSubTask );
                    
                }
                
            } 

        }

        // Y devolvemos la data para eliminar un nivel de información
        return body.data;
        
    } catch (error) {
        console.log( error );
    }

}

// Función para crear tareas en las secciones
const createSubTask = async ( project, section, task, parent, prevTask ) => {

    // Montamos la url que hay que usar para crear la subtarea
    const url = `${ asanaUrl }/tasks`

    // Desestructuramos la tarea para usar su información
    const { assignee, followers, name, notes, workspace} = task;

    // Metemos la información de la tarea en una variable para completarla
    const data = {
        data: {
            approval_status: "pending",
            assignee: assignee,
            assignee_status: "upcoming",
            completed: false,
            due_at: null,
            due_on: null,
            followers: followers,
            name: name,
            notes: notes,
            // parent: parent,
            projects: [
                project
            ],
            resource_subtype: "default_task",
            start_on: null,
            TAGS: [],
            workspace: workspace,
        }
    }   

    // TODO: Eliminar
    console.log( data );
                
    // Utilizaremos la función try-catch al tener que hacer una petición API
    try {

        // Hacemos la petición fetch y almacenamos la respuesta en una variable
        const resp = await fetch( url, {
            method: 'POST',
            headers:{
                'Authorization': authorization
            },
            body: JSON.stringify( data )
        })
        
        // Decodificamos la respuesta
        const body = await resp.json();

        // Si todo fue bien asignamos la subtarea a su tarea madre, si no, lanzamos un mensaje de error a la consola
        if ( resp.ok ) {

            // Asignamos la subtarea a su tarea madre
            await asignSubTask( parent, body.data.gid, prevTask )

        } else {

            // Lanzamos el error a la consola
            console.log( body );

        }

        // TODO: Eliminar
        console.log( body );

        // Y devolvemos la data para eliminar un nivel de información
        return body.data;
        
    } catch (error) {
        console.log( error );
    }

}

// Función para crear tareas en las secciones
const createNewSubTask = async ( project, section, task, parent, prevTask ) => {

    // Montamos la url que hay que usar para crear la subtarea
    const url = `${ asanaUrl }/tasks/${ parent }/subtasks`

    // Desestructuramos la tarea para usar su información
    const { assignee, followers, name, notes, workspace} = task;

    // Metemos la información de la tarea en una variable para completarla
    const data = {
        data: {
            approval_status: "pending",
            assignee: assignee,
            assignee_status: "upcoming",
            completed: false,
            due_at: null,
            due_on: null,
            followers: followers,
            name: name,
            notes: notes,
            // parent: parent,
            // projects: [
            //     project
            // ],
            resource_subtype: "default_task",
            start_on: null,
            TAGS: [],
            workspace: workspace,
        }
    }   

    // TODO: Eliminar
    console.log( data );
                
    // Utilizaremos la función try-catch al tener que hacer una petición API
    try {

        // Hacemos la petición fetch y almacenamos la respuesta en una variable
        const resp = await fetch( url, {
            method: 'POST',
            headers:{
                'Authorization': authorization
            },
            body: JSON.stringify( data )
        })
        
        // Decodificamos la respuesta
        const body = await resp.json();

        // Si todo fue bien asignamos la subtarea a su tarea madre, si no, lanzamos un mensaje de error a la consola
        if ( resp.ok ) {

            // Asignamos la subtarea a su tarea madre
            await asignSubTask( parent, body.data.gid, prevTask )

        } else {

            // Lanzamos el error a la consola
            console.log( body );

        }

        // await asignTask( section, body.data.gid, prevTask )

        // TODO: Eliminar
        console.log( body );

        // Y devolvemos la data para eliminar un nivel de información
        return body.data;
        
    } catch (error) {
        console.log( error );
    }

}

// Función para asignar una tarea a una sección
const asignTask = async ( section, gid, prevTask) => {

    // Formamos la url que vamos a lanzar
    const url = `${ asanaUrl }/sections/${ section }/addTask`

    // Preparamos la información a enviar
    const newData = {
        data: {
            insert_after: prevTask,
            task: gid,
        }
    }

    // Como hay que hacer un fetch, vamos a usar un try-catch
    try {

        // Hacemos el fetch y almacenamos la respusta en una variable
        const resp = await fetch( url, {
            method: 'POST',
            headers: {
                'Authorization': authorization,
            },
            body: JSON.stringify( newData ),
        })

        // Si no vino OK, lanzamos un mensaje de error
        if ( !resp.ok ) {
            
            // Lanzamos un mensaje de error a la consola
            console.log( resp );

        }
        
    } catch (error) {
        console.log( error );
    }

}

// Función para asignar una subtarea a la tarea para ordenarlas
const asignSubTask = async ( parent, subtask, prevTask ) => {

    // Montamos la url para asignar la subtarea
    const url = `${ asanaUrl }/tasks/${ subtask }/setParent`

    // Preparamos la información que hay que enviar
    const data = {
        data: {
            insert_after: prevTask,
            parent: parent,
        }
    }

    // Como vamos a hacer un fetch, usamos un try-catch
    try {

        // Hacemos el fetch y almacenamos la respuesta en una variable
        const resp = fetch( url, {
            method: 'POST',
            headers: {
                Authorization: authorization,
            },
            body: JSON.stringify( data ),
        });

        // Decodificamos la respuesta
        const body = resp.JSON();

        // Si algo salió mal, enviamos un mensaje por la consola
        if ( !resp.ok ) {

            // Lanzamos el mensaje a la consola
            console.log( body );

        }
        
    } catch (error) {
        console.log(error);
    }

}

// Exportamos las funciones
export {
    fetchSinToken,
    fetchConToken,
    fetchAsana,
}