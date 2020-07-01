export {
    registrarNuevoCliente,
    registroNuevoNegocio,
    goToPersonal,
    goToInfoNegocio,
    goToNegPago,
    goToPrivacidad,
    goToWelcome,
    setPersonalData,
    handleHorario,
    isOpen,
    setNegocioData,
    pagoEfectivo,
    pagoTarjeta,
    entregaDomicilio,
    entregaNegocio,
    verifyEmailExist,
    setBCoordinates,
    setClientCoordinates,
    setErrorMessage
} from './registro'

export {
    burguerHandler
} from './header'


export {
    login,
    joinToUs,
    joinToUsClosed,
    setLocalTokenStored,
    updateHomeAlert,
    getUserType,
    logOut,
} from './home'

export {
    OpenSelectedProduct,
    CloseSelectedProduct,
    AddOneToSelectedProduct,
    OpenOrderModal,
    CloseOrderModal,
    checkout,
    DelOneToSelectedProduct,
    getBusinesses,
    clienteSelectedBusiness,
    getSelectedBusiness,
    getClient,
    updateClient,
    updateClientPassword,
    setClientError
} from './cliente'

export {
    getProducts,
    addProduct,
    updateAddProductAlert,
    accessDeny,
    changeIsProductAdded,
    updateProduct,
    closeEditProductAlert,
    errorMessageEditProductAlert,
    deleteProduct,
} from './products'

export {
    openEditNegocio,
    closeEditNegocio,
    changeEditMode,
    saveChanges,
    closeEditMode,
    openEditProduct,
    clickAddProduct,
    closeEditProduct,
    readyButtonSelected,
    ordersButtonSelected,
    prepareButtonSelected,
    checkPreparingOrder,
    checkReceivedOrder,
    empezarPedido,
    terminarPedido,
    getPedidoNegocioId,
    getPedidoPreparing,
    getPedidoReady,
    loadNegocio,
    getNegocioDetails,
    cancelEdit,
    EditBusinessWithPhoto,
    EditBusinessWithoutPhoto,
    updateBusiness,
} from './negocio'