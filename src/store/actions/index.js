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
    checkoutCancel,
    DelOneToSelectedProduct,
    getBusinesses,
    clienteSelectedBusiness,
    getSelectedBusiness,
    getClient,
    updateClient,
    updateClientPassword,
    setClientError,
    getClientNamePhone,
    closeAlertClient,
    ClientClickLogo,
    setClientCoord,
    clientGetOrders,
    clientGetOrdersSuccess
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
    loadNegocio,
    getNegocioDetails,
    cancelEdit,
    EditBusinessWithPhoto,
    EditBusinessWithoutPhoto,
    updateBusiness,
} from './negocio'

export {
    readyButtonSelected,
    ordersButtonSelected,
    prepareButtonSelected,
    checkPreparingOrder,
    checkDeliveringOrder,
    checkReceivedOrder,
    empezarPedido,
    terminarPedido,
    entregarPedido,
    getPedidoNegocioId,
    getPedidoPreparing,
    getPedidoReady,
    openViewComments,
    closeViewComments,
    closeAlert,
} from './orders'