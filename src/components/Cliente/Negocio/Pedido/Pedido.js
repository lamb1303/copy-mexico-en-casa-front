import React from 'react'
import Button from '../../../UI/Button/Button';
import Backdrop from '../../../UI/Backdrop/Backdrop';
import classes from './Pedido.module.scss'
import * as actions from '../../../../store/actions';
import { ReactComponent as Deliver } from './home.svg';
import { ReactComponent as NoDeliver } from './noDeliver.svg';
import { ReactComponent as Cash } from './commerce-and-shopping.svg';
import { ReactComponent as CreditCard } from './business-and-finance.svg';
import { connect } from 'react-redux';

const Pedidos = props => {

    const imageUrl = 'https://c8.alamy.com/compes/t20754/la-ilustracion-muestra-una-casa-pequena-hecho-en-un-estilo-de-dibujos-animados-aislado-sobre-fondo-blanco-t20754.jpg';

    const head = (
        <>
            <div >
                <h2>VERIFICA TU ORDEN</h2>
                <hr />
                <h3>SUBTOTAL: ${props.total} </h3>
                <hr />
            </div>
        </>
    )

    const mostrarOrden = props.productCount.map(
        orden => {
            if (orden.count >= 1) {
                return (

                    <>
                        <div key={orden.name} className={classes.modal_body}>

                            <img className={classes.pedidos_image} src={imageUrl} />
                            <h4>{orden.name} </h4>

                        </div>
                        <div className={classes.modal_price} >

                            <h4>
                                {orden.count}
                            </h4>

                        </div>
                        <hr />
                    </>
                )
            }

        }
    )

    const deliver = (
        <>
            <div>
                <div>
                    <h2>METODO DE ENTREGA</h2>
                </div>
                <div className={classes.modal_noDeliver}>
                    <Deliver className={[classes.pedidos_image, classes.pedidos_image_deliver].join(' ')} onClick={() => props.orderToGo()} />Pedido Entregar
                </div>
                <div className={classes.modal_deliver}>
                    <NoDeliver className={[classes.pedidos_image, classes.pedidos_image_noDeliver].join(' ')} onClick={() => props.orderToPickUp()} />Pedido Recoger
                </div>
            </div>

        </>
    )

    const acceptCancel = (
        <>
            <div>
                <div className={classes.modal_deliver} >
                    <Button >ACEPTAR</Button>
                </div>
                <div className={classes.modal_noDeliver}>
                    <Button clicked={() => props.cancelOrder()}>CANCELAR</Button>
                </div>

            </div>
        </>
    )

    const payment = (
        <>
            <div>
                <div>
                    <h2>METODO DE PAGO</h2>
                </div>
                <div className={classes.modal_noDeliver}>
                    <Cash className={[classes.pedidos_image, classes.pedidos_image_deliver].join(' ')} onClick={() => props.cashPayment()} />Efectivo
                </div>
                <div className={classes.modal_deliver}>
                    <CreditCard className={[classes.pedidos_image, classes.pedidos_image_deliver].join(' ')} onClick={() => props.creditCardPayment()} />Tarjeta
                </div>
                <Button clicked={() => props.backToDelilver()} >Regresar</Button>
            </div>

        </>
    )

    const location = (
        <>
            <div>
                <div>
                    <h2>DIRECCION DE ENVIO</h2>
                </div>
                <div className={classes.centerInput} >
                    <input type="text" value="Calle del valle valle de calle"></input>
                </div>
                <Button clicked={() => props.backToDelilver()} >Regresar</Button>
                {
                    acceptCancel
                }
            </div>

        </>

    )

    return (
        <>
            <Backdrop show={props.openOrder} clicked={() => props.cerrarModal()} />

            <div className={classes.modal}>
                {head}
                {mostrarOrden}
                {
                    props.deliver === null &&
                    deliver
                }
                {
                    (props.deliver !== null && props.payment === null) &&
                    payment
                }
                {
                    props.payment != null &&
                    location
                }


            </div>
        </>


    )
}

const mapStateToProps = state => {
    return {
        productCount: state.cliente.productCount,
        openOrder: state.cliente.openOrder,
        deliver: state.cliente.deliver,
        payment: state.cliente.payment
    }
}
const mapDispatchToProps = {

    cerrarModal: actions.CloseOrderModal,
    orderToGo: actions.OrderIsToGo,
    orderToPickUp: actions.OrderToPickUp,
    cashPayment: actions.CashPayment,
    creditCardPayment: actions.CreditCardPayment,
    backToDelilver: actions.BackToDeliverOption,
    cancelOrder: actions.CancelOrder


}
export default connect(mapStateToProps, mapDispatchToProps)(Pedidos);