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
            if (orden.amount == 0) {
                return null
            }
            return (
                <div key={orden.name}>
                    <div className={classes.left}>
                        <img
                            className={classes.pedidos_image}
                            src={orden.img} alt={orden.name} />
                    </div>

                    <div className={classes.center}>
                        <h4 style={{margin: "0"}}>{orden.name} </h4>
                    </div>

                    <div className={classes.right} >
                        <h4 style={{margin: "0"}}>
                            {orden.amount}
                        </h4>
                    </div>

                </div>
            )
        }
    )

    const metodoEntrega = (
        <div>
            <div>
                <h2>METODO DE ENTREGA</h2>
            </div>
            {
                (props.isToGo && props.isToTake) &&
                <>
                    <div className={classes.modal_deliver}>
                        <Deliver
                            className={[classes.pedidos_image, classes.pedidos_image_deliver].join(' ')}
                            onClick={() => {
                                enviarPedido(true);
                                pagoEnvio(35)
                            }} />Pedido para Entregar
                     </div>
                    <div className={classes.modal_noDeliver}>
                        <ToTake
                            className={[classes.pedidos_image, classes.pedidos_image_deliver].join(' ')}
                            onClick={() => {
                                enviarPedido(false);
                                pagoEnvio(0)
                            }} />Pedido para Recoger
                     </div>
                </>
            }
            {
                (props.isToGo && !props.isToTake) &&
                <div className={classes.modal_onlyDeliver}>
                    <Deliver
                        className={[classes.pedidos_image, classes.pedidos_image_deliver].join(' ')}
                        onClick={() => {
                            enviarPedido(true);
                            pagoEnvio(35)
                        }} />Pedido para Entregar
                     </div>
            }
            {
                (props.isToTake && !props.isToGo) &&
                <div className={classes.modal_onlyDeliver}>
                    <ToTake
                        className={[classes.pedidos_image, classes.pedidos_image_deliver].join(' ')}
                        onClick={() => enviarPedido(false)} />Pedido para Recoger
                 </div>
            }

        </div>
    )

    const payment = (
        <div>
            <div>
                <h2>METODO DE PAGO</h2>
            </div>
            {
                (props.cash && props.creditCard) &&
                <>
                    <div className={classes.modal_noDeliver}>
                        <Cash
                            className={[classes.pedidos_image, classes.pedidos_image_deliver].join(' ')}
                            onClick={() => {
                                pagoPedido(true);
                                verComent(false);
                            }} />Efectivo
                        </div>
                    <div className={classes.modal_deliver}>
                        <CreditCard
                            className={[classes.pedidos_image, classes.pedidos_image_deliver].join(' ')}
                            onClick={() => {
                                pagoPedido(false);
                                verComent(false);
                            }
                            } />Tarjeta
                    </div>
                </>
            }

            {
                (props.cash && !props.creditCard) &&
                <div className={classes.modal_onlyDeliver}>
                    <Cash
                        className={[classes.pedidos_image, classes.pedidos_image_deliver].join(' ')}
                        onClick={() => {
                            verComent(false);
                            pagoPedido(true);
                        }
                        } />Efectivo
                    </div>
            }

            {
                (!props.cash && props.creditCard) &&
                <div className={classes.modal_onlyDeliver}>
                    <CreditCard
                        className={[classes.pedidos_image, classes.pedidos_image_deliver].join(' ')}
                        onClick={() => {
                            verComent(false);
                            pagoPedido(false);
                        }
                        } />Tarjeta
                    </div>
            }

            <Button
                clicked={() => enviarPedido(null)}>Regresar</Button>
        </div>
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

    const location = (
        <div>
            <div>
                <h2>Referencia</h2>
            </div>
            <div className={classes.centerInput} >
                <TextField
                    type='text'
                    label="Entre calles, color porton, etc:"
                    value={ref}
                    onChange={(event) => {
                        insrtRef(event.target.value)
                    }} />
            </div>
            <Button
                clicked={() => verComent(true)}>Continuar</Button>
        </div>

    )

    const comentarios = (
        <div>
            <div>
                <h3>Envia tus notas sobre el pedido para el Chef.</h3>
            </div>
            <div className={classes.centerInput} >
                <TextField
                    type='text'
                    label="Ingredientes extra, condimentos, etc:"
                    value={nota}
                    onChange={(event) => {
                        insrtNota(event.target.value)
                    }} />
            </div>
            {
                acceptCancel
            }
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
        stage: "receiveOrders",
        total: total
    }

    return (
        <>
            <Backdrop
                show={props.openOrder}
                clicked={() => props.cerrarModal()} />

            <div className={classes.modal}>
                <h2 style={{
                    borderBottomStyle: "solid",
                    margin: "0"
                }}>MI ORDEN</h2>

                {
                    mostrarOrden &&
                    mostrarOrden
                }
                {/* <h3>TOTAL: ${total} </h3> */}


                {/* {
                    (pagoEfectivo == null && envio == null) &&
                    metodoEntrega
                }
                {
                    (envio != null && pagoEfectivo == null) &&
                    payment
                } */}
            </div>
        </>


    )
}

const mapStateToProps = state => {
    return {
        productCount: state.cliente.productCount,
        openOrder: state.cliente.openOrder
    }
}
const mapDispatchToProps = {
    cerrarModal: actions.CloseOrderModal,
    sendOrder: actions.checkout

}
export default connect(mapStateToProps, mapDispatchToProps)(Pedido);