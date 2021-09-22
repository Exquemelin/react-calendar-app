
// Creamos un objeto para centralizar todos los types de las acciones de Redux
export const types = {

    // Interface de Usuario para trabajar el modal
    uiOpenModal: '[ui] Open Modal',
    uiCloseModal: '[ui] Close Modal',
    uiOpenPanelModal: '[ui] Open Panel Modal',
    uiClosePanelModal: '[ui] Close Panel Modal',
    uiOpenPointModal: '[ui] Open Point Modal',
    uiClosePointModal: '[ui] Close Point Modal',

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
    
    // Interface de los cuadros y los tipos de acciones
    panelLoading: '[panel] Loading Panels',
    panelAddNew: '[panel] Add New Panel',
    panelUpdate: '[panel] Update Panel',
    panelDelete: '[panel] Delete Panel',
    panelSetActive: '[panel] Set Active Panel',

    // Interface de los puntos de inspección y los tipos de acciones
    pointLoading: '[point] Loading Points',
    pointAddNew: '[point] Add New Point',
    pointUpdate: '[point] Update Point',
    pointDelete: '[point] Delete Point',
    pointSetActive: '[point] Set Active Point',

    // Interface de las pruebas FAT y los tipos de acciones
    fatStarting: '[fat] Loading FAT',
    fatClean: '[fat] Clean FAT',
    fatSetActive: '[fat] Set Active Panel',
    fatLoadPoints: '[fat] Load Points',
    fatUpdatePoint: '[fat] Update Point',
    fatPanelChecked: '[fat] Panel Checked',

}