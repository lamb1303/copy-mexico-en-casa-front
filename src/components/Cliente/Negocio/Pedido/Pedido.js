import React, { useState, useEffect } from 'react'
import Button from '../../../UI/Button/Button';
import Backdrop from '../../../UI/Backdrop/Backdrop';
import classes from './Pedido.module.scss'
import * as actions from '../../../../store/actions';
import { ReactComponent as Deliver } from '../../../../assets/pedido/delivery.svg';
import { ReactComponent as ToTake } from '../../../../assets/pedido/toTake.svg';
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
    const [coment, verComent] = useState(null);
    const [ref, insrtRef] = useState("");
    const [nota, insrtNota] = useState("");
    const [position, setPosition] = useState({});
    const [error, setError] = useState(null);
    const date = new Date();

    const onChangePosition = ({ coords }) => {
        setPosition({
            latitude: coords.latitude,
            longitude: coords.longitude
        })
    }

    const onError = (error) => {
        setError(error.message)
    }

    const mostrarOrden = props.productCount.map(
        orden => {
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
                        <h4>{orden.name} </h4>
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
        <div style={{marginTop: "16px"}}>
            {
                (props.selectedNegocio.delivery.isToGo && props.selectedNegocio.delivery.isToTake) &&
                <>
                    <div className={classes.modal_deliver}>
                        <Deliver
                            className={[classes.pedidos_image, classes.centerItems].join(' ')}
                            onClick={() => {
                                enviarPedido(true);
                                pagoEnvio(35)
                            }} />
                        <h3>
                            Pedido para Entregar
                        </h3>
                    </div>
                    <div className={classes.modal_noDeliver}>
                        <ToTake
                            className={[classes.pedidos_image, classes.centerItems].join(' ')}
                            onClick={() => {
                                enviarPedido(false);
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
                            enviarPedido(true);
                            pagoEnvio(35)
                        }} />
                    <h3>
                        Pedido para Entregar
                        </h3>
                </div>

            }
            {
                (props.selectedNegocio.delivery.isToTake && !props.selectedNegocio.delivery.isToGo) &&
                <div className={classes.modal_onlyDeliver}>
                    <ToTake
                        className={[classes.pedidos_image, classes.centerItems].join(' ')}
                        onClick={() => enviarPedido(false)} />
                    <h3>
                        Pedido para Recoger
                        </h3>
                </div>
            }

        </div>
    )

    const payment = (
        <>
            <div style={{marginTop: "16px"}}>
                {
                    (props.selectedNegocio.payment.cash && props.selectedNegocio.payment.creditCard) &&
                    <>
                        <div className={classes.modal_noDeliver}>
                            <Cash
                                className={[classes.pedidos_image, classes.centerItems].join(' ')}
                                onClick={() => {
                                    pagoPedido(true);
                                    verComent(false);
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
                                    verComent(false);
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
                                verComent(false);
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
                                verComent(false);
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
        <div style={{ marginTop: "3em" }}>
            <div className={classes.modal_deliver} >
                <Button
                    clicked={() => {
                        props.sendOrder(orderToSend);
                        props.cerrarModal()
                    }}>Enviar</Button>
            </div>
            <div className={classes.modal_noDeliver}>
                <Button >Cancelar</Button>
            </div>

        </div>
    )

    const comentarios = (
            <div className={classes.centerInput} >
                <TextField
                    type='text'
                    label="Ingredientes extra, condimentos, etc:"
                    value={nota}
                    onChange={(event) => {
                        insrtNota(event.target.value)
                    }} />
            </div>
     

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

    const dishes = (props.productCount.map(dishes => {
        return {
            name: dishes.name,
            amount: dishes.amount,
            comment: nota
        }
    }))
    //idCustomer
    const user = JSON.parse(localStorage.getItem("user"))
    const idClient = (user.id)
    const total = props.orderPrice + iva

    const orderToSend = {
        location: position,
        orderDate: orderDate,
        dishes: dishes,
        idBusiness: localStorage.getItem("businessId"),
        idClient: idClient,
        creditCard: props.creditCard,
        stage: "receivedOrders",
        total: total
    }

    return (
        <>
            <Backdrop
                show={props.openOrder}
                clicked={() => props.cerrarModal()} />

            <div className={classes.modal}>
                <h2 style={{

                    margin: "0"
                }}>MI ORDEN</h2>

                {
                    mostrarOrden &&
                    mostrarOrden
                }
                <h2 style={{
                    color: "#482856",
                    color: "rgb(72, 40, 86)",
                    border: "1px solid #ccc",
                    margin: "0 auto"
                }}>TOTAL: ${total} </h2>


                {
                    (pagoEfectivo == null && envio == null) &&
                    metodoEntrega
                }
                {
                    (envio != null && pagoEfectivo == null) &&
                    payment
                }
            </div>
        </>


    )

}


const mapStateToProps = state => {
    return {
        productCount: state.cliente.productCount,
        openOrder: state.cliente.openOrder,
        selectedNegocio: state.negocio.selectedNegocio
    }
}
const mapDispatchToProps = {
    cerrarModal: actions.CloseOrderModal,
    sendOrder: actions.checkout

}
export default connect(mapStateToProps, mapDispatchToProps)(Pedido);