import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import OrderDetails from './ordersDetails/orderDetails'
import { ReactComponent as Delivery } from './../../../assets/pedido/delivery.svg';
import { ReactComponent as NoDelivery } from './../../../assets/local.svg';
import { ReactComponent as Cash } from './../../../assets/efectivo.svg';
import { ReactComponent as CreditCard } from './../../../assets/tarjeta.svg';
import { ReactComponent as NoFood } from './../../../assets/no-eating.svg';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Button from '../../UI/Button/Button';
import * as STAGES from '../../../store/Util/enums/stageType';
import openSocket from 'socket.io-client';
import './OrdersHistory.scss'
class OrderHistory extends Component {

    state = {
        showBackdrop: false,
        idBusiness: null,
        listOfOrderIds: [],
        stage: 'Recibida por el negocio',
    }
    componentDidMount() {
        const socket = openSocket(process.env.REACT_APP_SOCKET);
        socket.on('client-update-order-status-preparing', data => {
            if (data.clientIds.includes(this.props.idCustomer)) {
                this.setState({
                    stage: 'Preparando tu pedido',
                    listOfOrderIds: data.orderId
                })
            }
        })

        socket.on('client-update-order-status-ready', data => {
            if (data.clientIds.includes(this.props.idCustomer)) {
                this.setState({
                    stage: 'Tu pedido esta listo!',
                    listOfOrderIds: data.orderId
                })
            }
        })

        socket.on('client-update-order-status-delivered', data => {
            if (data.clientIds.includes(this.props.idCustomer)) {
                this.setState({
                    stage: 'Tu pedido fue entregado',
                    listOfOrderIds: data.orderId
                })
            }
        })

        this.props.clientGetOrders(this.props.idCustomer);

    }

    setBackdropHandler() {
        this.setState({ showBackdrop: !this.state.showBackdrop })
    }

    formatStage(stage) {
        switch (stage) {
            case STAGES.receivedOrders: return 'Recibida por el negocio';
            case STAGES.prepareOrders: return 'Preparando tu pedido';
            case STAGES.readyOrders: return 'Tu pedido esta listo!';
            case STAGES.deliveredOrders: return 'Pedido Entregado';
            default: return this.state.stage;
        }
    }

    compare(a, b) {
        const dateA = new Date(a);
        const dateB = new Date(b);
        const orderDateA = `${dateA.getHours()}${dateA.getMinutes()}${dateA.getSeconds()}`;
        const orderDateB = `${dateB.getHours()}${dateB.getMinutes()}${dateB.getSeconds()}`;

        return parseInt(orderDateA) < parseInt(orderDateB) ? 1 : -1;
    }

    render() {
        const orderedOrders = [...this.props.orders].sort((a, b) => this.compare(a.orderDate, b.orderDate));
        const orders = orderedOrders.map(res => {
            const isToTake = res.isToTake
            const isCash = res.isCash
            let stage = this.formatStage(res.stage);
            const total = res.total
            const dish = res.dishes.map(dish => {
                return (
                    <div key={res.orderId + Math.random()} className="container">
                        <div className="orderDesc" >
                            <img className="product_image " src={dish.img} alt={dish.name}></img>
                            <div className="orderResume">
                                <p><b>Platillo:</b> {dish.name}</p>
                                <p><b>Cantidad:</b> {dish.amount}</p>
                                {dish.comment !== undefined &&
                                    <p><b>Nota:</b> {dish.comment}</p>}
                            </div>
                        </div>
                    </div>

                )
            }
            )

            if (this.state.listOfOrderIds.length > 0) {
                if (this.state.listOfOrderIds.includes(res.orderId)) {
                    stage = this.state.stage
                }
            }
            return (
                <div key={res.orderId + Math.random()} className="showCard" >
                    <span><b>Status:</b> {stage}</span>
                    {dish}
                    <span><b>Total:</b> ${total}</span>
                    <div className="container">
                        <div className="first">
                            {
                                isToTake &&
                                <NoDelivery className="showCard_noDeliver" />
                            }
                            {
                                !isToTake &&
                                <Delivery className="showCard_deliver" />
                            }
                        </div>
                        <div className="second">
                            {
                                isCash &&
                                <Cash className="showCard_cash" />
                            }
                            {
                                !isCash &&
                                <CreditCard className="creditCard" />
                            }
                        </div>
                        <Button btnType='Success' clicked={() => {
                            this.setBackdropHandler();
                            this.setState({ idBusiness: res.idBusiness })
                        }
                        }>Ver detalle</Button>
                    </div>
                </div>

            )
        })

        return (
            <>
                <Backdrop
                    show={this.state.showBackdrop}
                    clicked={() => this.setBackdropHandler()} />
                <div key={Math.random() + .21} className="orderContainer">
                    {orders && orders}
                    {this.props.orders.length === 0 &&
                        <>
                            <NoFood className="noFood"></NoFood>
                            <h4 className="noFoodInfo">Sin pedidos.</h4>
                        </>
                    }
                </div>
                {
                    this.state.showBackdrop &&
                    <OrderDetails className="showCard"
                        idBusiness={this.state.idBusiness}
                        showBackDrop={() => this.setBackdropHandler()} />
                }
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        orders: state.cliente.orders,
        idCustomer: state.home.id,
        openOrder: state.cliente.openOrder,
    }
}

const mapDispatchToProps = {
    clientGetOrders: actions.clientGetOrders
}


export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory);