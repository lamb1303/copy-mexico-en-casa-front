import React, { useState, useEffect, useCallback } from 'react'
import Button from '../../../UI/Button/Button';
import Backdrop from '../../../UI/Backdrop/Backdrop';
import classes from './Pedido.module.scss';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import * as actions from '../../../../store/actions';
import { ReactComponent as Close } from '../../../../assets/cliente/close.svg';
import { ReactComponent as Deliver } from '../../../../assets/pedido/delivery.svg';
import { ReactComponent as ToTake } from '../../../../assets/pedido/toTake.svg';
import { ReactComponent as Send } from '../../../../assets/pedido/send.svg';
import { ReactComponent as Cash } from '../../../../assets/pedido/commerce-and-shopping.svg';
import { ReactComponent as CreditCard } from '../../../../assets/pedido/business-and-finance.svg';
import { connect } from 'react-redux';
import { ReactComponent as MapLogo } from '../../../../assets/map.svg';
import { ReactComponent as SearchPosition } from '../../../../assets/searchPosition.svg';
import TextField from '@material-ui/core/TextField';
import ShowMap from '../../../UI/ShowMap/ShowMap';
import axios from 'axios';

const baseObject = {
    isValid: false,
    touched: false,
    value: ''
}

const Pedido = props => {
    const { client } = props;
    const [clientDirection, getDirection] = useState(null)
    useEffect(useCallback(() => {
        if (clientDirection === null) {
            axios
                .get(
                    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${client.geolocation.lat}&lon=${client.geolocation.lng}`
                )
                .then((resp) => {
                    getDirection(resp.data.address)
                })
                .catch((err) => { });
        }
    }, [clientDirection, client.geolocation.lat, client.geolocation.lng]), []);

    const getLocationByBrowser = () => {
        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
        }
        navigator.geolocation.getCurrentPosition((coords) => {
            setCoordinates({
                lat: coords.coords.latitude,
                lng: coords.coords.longitude
            });
        }, (err) => {
            window.alert("No se pudo obtener tu locación actual, verifica permisos de locación en tu dispositivo")
        }, options);
    }

    const getLocation = () => {
        if (props.geolocation) { setShowBackdrop(true); return }
        if (direction.value.length > 5) {
            const street = direction.value.trim().replace(/ /g, '+');
            street.replace('#', '');
            axios.get(`https://nominatim.openstreetmap.org/search?q=${street}&format=json&polygon_geojson=1&addressdetails=1`)
                .then(resp => {
                    if (Object.keys(resp.data).length > 0) {
                        setCoordinates({
                            lat: resp.data[0].lat,
                            lng: resp.data[0].lon
                        })
                    } else getLocationByBrowser();
                    setShowBackdrop(true)
                })
                .catch(err => { });
        } else {
            getLocationByBrowser();
            setShowBackdrop(true)
        }
    }
    const getCoordinatesFromMap = (currentPosition, address) => {
        setCoordinates(currentPosition);
        props.onSetCoordinates(currentPosition);
        setDirection({
            ...direction,
            value: address,
            isValid: rules(address, 'text')
        })
        setShowBackdrop(false);
    }

    const [reference, setReference] = useState('')
    const [showBackdrop, setShowBackdrop] = useState(false);
    const [coordinates, setCoordinates] = useState();
    const [envio, enviarPedido] = useState(null);
    const [pagoEfectivo, pagoPedido] = useState(null);
    const [iva, pagoEnvio] = useState(0);
    const [direction, setDirection] = useState(baseObject);
    const [actualLoc, isActualLoc] = useState(false);
    const [otherLoc, isOtherLoc] = useState(false);
    const [dishes, setDishes] = useState(props.productCount);

    const rules = (value, type) => {
        switch (type) {
            case 'text': return value.length > 2;
            default: return false;
        }
    }

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
                            inputProps={{
                                maxLength: 150,
                            }}
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
            <h3>Selecciona método de entrega.</h3>
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
                            A Domicilio
                        </h3>
                    </div>
                    <div className={classes.modal_noDeliver}>
                        <ToTake
                            className={[classes.pedidos_image, classes.centerItems].join(' ')}
                            onClick={() => {
                                enviarPedido(true);
                                pagoEnvio(0);
                                getLocationByBrowser();
                            }} />
                        <h3>
                            Recoger Pedido
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
                        onClick={() => {
                            getLocationByBrowser();
                            enviarPedido(true);
                        }} />
                    <h3>
                        Recoger Pedido
                        </h3>
                </div>
            }

        </div>
    )

    const selectLocation = (
        <>
            <div className={classes.sectionSize}>
                {/* <TextField
                    disabled
                    label="Estas en:"
                    variant="outlined" /> */}
                <h3 style={{ justifyContent: "center" }}
                >Se realizará un cargo extra por servicio a domicilio.</h3>
                <>
                    <div className={classes.modal_deliver}>
                        <MapLogo
                            className={[classes.pedidos_image, classes.centerItems].join(' ')}
                            onClick={() => {
                                getLocationByBrowser();
                                isActualLoc(true);
                                setDirection(baseObject);
                            }
                            } />
                        <h3>
                            Usar actual
                        </h3>
                    </div>
                    <div className={classes.modal_noDeliver}>
                        <SearchPosition
                            className={[classes.pedidos_image, classes.centerItems].join(' ')}
                            onClick={() => {
                                getLocation();
                            }} />
                        <h3>
                            Nueva ubicación
                        </h3>
                    </div>
                </>
                {direction.value !== '' &&
                    <>
                        <hr />
                        <span><b>Ubicación de Registro</b></span>
                        <FormControl style={{ width: "90%" }} disabled>
                            <Input className="MuiInputBase" value={clientDirection.road + ', ' + clientDirection.postcode + ', ' + clientDirection.city + ', ' + clientDirection.state + ', ' + clientDirection.country} />
                        </FormControl>
                        <hr />
                        <span>Ubicación Seleccionada</span>
                        <FormControl style={{ width: "90%" }} disabled>
                            <Input
                                className="MuiInputBase"
                                type='text'
                                value={direction.value}
                                disabled
                                onChange={(event) => (event.target.value)} />
                        </FormControl>
                        <hr />
                        <span>Ingresar Referencia</span>
                        <FormControl style={{ width: "90%" }}>
                            <TextField
                                inputProps={{
                                    maxLength: 150,
                                }}
                                className={classes.modal_textField}
                                type='text'
                                value={reference}
                                label="Calle, color de casa, número, etc..."
                                onChange={(event) => (setReference(event.target.value))} />
                        </FormControl>
                        <hr />
                    </>
                }
            </div>
            {
                direction.value !== '' &&
                <Button
                    clicked={() => isOtherLoc(true)}>Continuar</Button>

            }
            <Button
                clicked={() => enviarPedido(null)}>Regresar</Button>
        </>
    )

    const formatDate = date => {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()},${strTime}`;
    }

    const payment = (
        <>
            <div className={classes.sectionSize}>
                <h3>Selecciona método de pago.</h3>
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
                    clicked={() => {
                        isActualLoc(false);
                        isOtherLoc(false);
                    }}>Regresar</Button>
            </div>

        </>
    )

    const auxPayment = (
        <>
            <div className={classes.sectionSize}>
                <h3>Selecciona método de pago.</h3>
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
                    clicked={() => {
                        enviarPedido(null)
                    }}>Regresar</Button>
            </div>

        </>
    )

    const acceptCancel = (
        <>
            <div className={[classes.modal_onlyDeliver, classes.sectionSize].join(' ')} >
                <h3>
                    Presiona la imagen para enviar.
                </h3>
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
    const date = new Date();
    const orderDate = formatDate(date);
    const total = props.orderPrice + iva
    let orderToSend = {
        geolocation: coordinates,
        orderDate: orderDate,
        dishes: dishes,
        idBusiness: localStorage.getItem("businessId"),
        businessName: localStorage.getItem("businessName"),
        idCustomer: props.idCustomer,
        stage: "receivedOrders",
        isToTake: envio,
        isCash: pagoEfectivo,
        total: total,
        reference: reference
    }

    return (
        <>
            <Backdrop
                show={props.openOrder}
               />

            <div className={classes.modal}>
                <h2>Orden de: {client.name} <Close style={{
                    height: "3vh",
                    position: "absolute",
                    right: "3vw"
                }}
                    onClick={() => props.cerrarModal()}/></h2>

                {
                    mostrarOrden &&
                    mostrarOrden
                }
                <h2>TOTAL: ${total} </h2>
                {
                    (envio == null) &&
                    metodoEntrega
                }
                {
                    (envio === false && !actualLoc && !otherLoc) &&
                    selectLocation
                }
                {
                    (envio === false && actualLoc && pagoEfectivo === null) &&
                    payment
                }
                {
                    (envio === false && otherLoc && pagoEfectivo === null) &&
                    payment
                }
                {
                    (envio === true && pagoEfectivo === null) &&
                    auxPayment
                }
                {
                    (pagoEfectivo !== null) &&
                    acceptCancel
                }
            </div>
            {showBackdrop && (
                <ShowMap
                    coordinates={coordinates}
                    getCoords={(currentPosition, address) => getCoordinatesFromMap(currentPosition, address)}
                    closeBackdrop={() => setShowBackdrop(false)}
                />
            )}
        </>
    )

}

const mapStateToProps = state => {
    return {
        productCount: state.cliente.productCount,
        openOrder: state.cliente.openOrder,
        selectedNegocio: state.negocio.selectedNegocio,
        idCustomer: state.home.id,
        selectedProd: state.cliente.selectedProduct,
        client: state.cliente.cliente
    }
}
const mapDispatchToProps = {
    cerrarModal: actions.CloseOrderModal,
    onOpenOptions: (name) => (actions.OpenSelectedProduct(name)),
    cancelOrder: actions.checkoutCancel,
    onCloseOptions: () => (actions.CloseSelectedProduct()),
    sendOrder: actions.checkout,
    onSetCoordinates: (coords) => actions.setClientCoord(coords)
}
export default connect(mapStateToProps, mapDispatchToProps)(Pedido);