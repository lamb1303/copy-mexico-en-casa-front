export {
    registrarNuevoCliente,
    registroNuevoNegocio,
    addProduct,
    addProductClosed
} from './registro'

export {
    burguerHandler
} from './header'


export {
    login,
    joinToUs,
    joinToUsClosed,
    setLocalTokenStored,
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