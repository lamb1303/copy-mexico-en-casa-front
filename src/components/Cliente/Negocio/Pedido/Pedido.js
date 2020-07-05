import React, { useState, useEffect } from 'react'
import Button from '../../../UI/Button/Button';
import Backdrop from '../../../UI/Backdrop/Backdrop';
import classes from './Pedido.module.scss'
import * as actions from '../../../../store/actions';
import { ReactComponent as Deliver } from '../../../../assets/pedido/delivery.svg';
import { ReactComponent as ToTake } from '../../../../assets/pedido/toTake.svg';
import { ReactComponent as Send } from '../../../../assets/pedido/send.svg';
import { ReactComponent as Cash } from '../../../../assets/pedido/commerce-and-shopping.svg';
import { ReactComponent as CreditCard } from '../../../../assets/pedido/business-and-finance.svg';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';

const Pedido = props => {

    useEffect(() => {
        const geo = navigator.geolocation
        if (!geo) {
            setError('Geolocation is not supported')
            return
        }
        const watcher = geo.getCurrentPosition(onChangePosition, onError)
        return () => geo.clearWatch(watcher)

    }, [])
    const [envio, enviarPedido] = useState(null);
    const [pagoEfectivo, pagoPedido] = useState(null);
    const [iva, pagoEnvio] = useState(0);
    const [position, setPosition] = useState({});
    const [error, setError] = useState(null);
    const date = new Date();
    const [dishes, setDishes] = useState(props.productCount);

    const insrtNota = (event, orden) => {

        orden.comment = event.target.value;
        //Get the index of the selected order 
        const index = dishes.findIndex(ord => ord.name === orden.name);
        //Get all dishes that are not the selected order
        let listOfDishes = dishes.filter(ord => ord.name !== orden.name);
        //Insert modified order in the list of dishes
        listOfDishes.splice(index, 0, orden);
        //Update dishes with List of dishes 
        setDishes(listOfDishes);

    }


    const onChangePosition = ({ coords }) => {
        setPosition({
            latitude: coords.latitude,
            longitude: coords.longitude
        })
    }

    const onError = (error) => {
        setError(error.message)
    }

    const mostrarOrden = dishes.map(
        (orden, id) => {
            if (orden.amount === 0) {
                return null
            }
            return (
                <div key={orden.name} className={classes.row}>
                    <div className={classes.column}>
                        <img
                            className={classes.pedidos_image}
                            src={orden.img} alt={orden.name} />
                    </div>

                    <div className={classes.name}>
                        <h4 >{orden.name} </h4>
                        <TextField
                            key={orden.name}
                            type='text'
                            label="Notas:"
                            value={orden.comment ? orden.comment : ''}
                            onChange={(event) => {
                                insrtNota(event, orden)
                            }} />
                    </div>

                    <div className={classes.amount} >
                        <h4>
                            {orden.amount}
                        </h4>
                    </div>

                </div>
            )
        }
    )

    const metodoEntrega = (
        <div className={classes.sectionSize}>
            {
                (props.selectedNegocio.delivery.isToGo && props.selectedNegocio.delivery.isToTake) &&
                <>
                    <div className={classes.modal_deliver}>
                        <Deliver
                            className={[classes.pedidos_image, classes.centerItems].join(' ')}
                            onClick={() => {
                                enviarPedido(false);
                                pagoEnvio(0)
                            }} />
                        <h3>
                            Servicio a Domicilio
                        </h3>
                    </div>
                    <div className={classes.modal_noDeliver}>
                        <ToTake
                            className={[classes.pedidos_image, classes.centerItems].join(' ')}
                            onClick={() => {
                                enviarPedido(true);
                                pagoEnvio(0)
                            }} />
                        <h3>
                            Pedido para Recoger
                        </h3>
                    </div>
                </>
            }
            {
                (props.selectedNegocio.delivery.isToGo && !props.selectedNegocio.delivery.isToTake) &&
                <div className={classes.modal_onlyDeliver}>
                    <Deliver
                        className={[classes.pedidos_image, classes.centerItems].join(' ')}
                        onClick={() => {
                            enviarPedido(false);
                            pagoEnvio(0)
                        }} />
                    <h3>
                        Servicio a Domicilio
                        </h3>
                </div>

            }
            {
                (props.selectedNegocio.delivery.isToTake && !props.selectedNegocio.delivery.isToGo) &&
                <div className={classes.modal_onlyDeliver}>
                    <ToTake
                        className={[classes.pedidos_image, classes.centerItems].join(' ')}
                        onClick={() => enviarPedido(true)} />
                    <h3>
                        Pedido para Recoger
                        </h3>
                </div>
            }

        </div>
    )

    const payment = (
        <>
            <div className={classes.sectionSize}>
                {
                    (props.selectedNegocio.payment.cash && props.selectedNegocio.payment.creditCard) &&
                    <>
                        <div className={classes.modal_noDeliver}>
                            <Cash
                                className={[classes.pedidos_image, classes.centerItems].join(' ')}
                                onClick={() => {
                                    pagoPedido(true);

                                }} />
                            <h3>
                                Efectivo
                        </h3>
                        </div>
                        <div className={classes.modal_deliver}>
                            <CreditCard
                                className={[classes.pedidos_image, classes.centerItems].join(' ')}
                                onClick={() => {
                                    pagoPedido(false);

                                }
                                } />
                            <h3>
                                Tarjeta
                        </h3>
                        </div>
                    </>
                }

                {
                    (props.selectedNegocio.payment.cash && !props.selectedNegocio.payment.creditCard) &&
                    <div className={classes.modal_onlyDeliver}>
                        <Cash
                            className={[classes.pedidos_image, classes.centerItems].join(' ')}
                            onClick={() => {
                                pagoPedido(true);
                            }
                            } />
                        <h3>
                            Efectivo
                        </h3>
                    </div>
                }

                {
                    (!props.selectedNegocio.payment.cash && props.selectedNegocio.payment.creditCard) &&
                    <div className={classes.modal_onlyDeliver}>
                        <CreditCard
                            className={[classes.pedidos_image, classes.centerItems].join(' ')}
                            onClick={() => {
                                pagoPedido(false);
                            }
                            } />
                        <h3>
                            Tarjeta
                        </h3>
                    </div>
                }
                <Button
                    clicked={() => enviarPedido(null)}>Regresar</Button>
            </div>

        </>
    )

    const acceptCancel = (
        <>
            <div className={[classes.modal_onlyDeliver, classes.sectionSize].join(' ')} >
                <Send
                    className={[classes.pedidos_image, classes.centerItems].join(' ')}
                    onClick={() => {
                        props.sendOrder(orderToSend);
                        props.cerrarModal();
                    }} />
                <h3>
                    Enviar
                </h3>
            </div>
            <Button clicked={() => {
                props.cerrarModal();
                props.cancelOrder();
            }
            }>Cancelar</Button>

        </>
    )
    const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }
    const orderDate = (new Intl.DateTimeFormat('en-US', options).format(date));
    const total = props.orderPrice + iva

    const orderToSend = {
        location: position,
        orderDate: orderDate,
        dishes: dishes,
        idBusiness: localStorage.getItem("businessId"),
        idCustomer: props.idCustomer,
        stage: "receivedOrders",
        isToTake: envio,
        isCash: pagoEfectivo,
        total: total
    }

    return (
        <>
            <Backdrop
                show={props.openOrder}
                clicked={() => props.cerrarModal()} />

            <div className={classes.modal}>
                <h2>MI ORDEN</h2>
                {
                    mostrarOrden &&
                    mostrarOrden
                }
                <h2>TOTAL: ${total} </h2>
                {
                    envio == false && <h3 style={{justifyContent: "center"}}
                    >Se realizará un cargo extra por servicio a domicilio.</h3>
                }
                {
                    (pagoEfectivo == null && envio == null) &&
                    metodoEntrega
                }
                {
                    (envio != null && pagoEfectivo == null) &&
                    payment
                }
                {pagoEfectivo != null &&
                    acceptCancel}
            </div>
        </>
    )

}

const mapStateToProps = state => {
    return {
        productCount: state.cliente.productCount,
        openOrder: state.cliente.openOrder,
        selectedNegocio: state.negocio.selectedNegocio,
        idCustomer: state.home.id,
        selectedProd: state.cliente.selectedProduct
    }
}
const mapDispatchToProps = {
    cerrarModal: actions.CloseOrderModal,
    onOpenOptions: (name) => (actions.OpenSelectedProduct(name)),
    cancelOrder: actions.checkoutCancel,
    onCloseOptions: () => (actions.CloseSelectedProduct()),
    sendOrder: actions.checkout,

}
export default connect(mapStateToProps, mapDispatchToProps)(Pedido);