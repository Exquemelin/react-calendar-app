
// Creamos un objeto para centralizar todos los types de las acciones de Redux
export const types = {

    // Interface de Usuario para trabajar el modal
    uiOpenModal: '[ui] Open Modal',
    uiCloseModal: '[ui] Close Modal',

    // Interface de eventos y los tipos de acciones
    eventSetActive: '[event] Set Active',
    eventLogout: '[event] Clear Events',
    eventStartAddNew: '[event] Start add new',
    eventAddNew: '[event] Add New',
    eventClearActiveEvent: '[event] Clear Active',
    eventUpdate: '[event] Event Updated',
    eventDelete: '[event] Event Delete',
    eventLoaded: '[event] Events Loaded',

    // Interface de autenticación y los tipos de acciones
    authCheckin: '[auth] Checking login state',
    authCheckingFinish: '[auth] Finish Checking login state',
    authStartLogin: '[auth] Start login',
    authLogin: '[auth]Login',
    authStartRegister: '[auth] Start register',
    authStartTokenRenew: '[auth] Start token renew',
    authStartLogout: '[auth] Logout',
    

}