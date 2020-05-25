export {
    registrarNuevoCliente,
    registroNuevoNegocio,
    addProduct,
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
    setFotoId,
    setFotoNegocio
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
} from './home'

export {
    OpenSelectedProduct,
    CloseSelectedProduct,
    AddOneToSelectedProduct,
    OpenOrderModal,
    CloseOrderModal,
    OrderIsToGo,
    OrderToPickUp,
    CreditCardPayment,
    CashPayment,
    BackToDeliverOption,
    CancelOrder,
    checkout,
    DelOneToSelectedProduct,
} from './cliente'

// export {
//     getProducts,
// } from './products'

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
    getPedidoReady
} from './negocio'