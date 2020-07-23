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
import './OrdersHistory.scss'
class OrderHistory extends Component {

    state = {
        showBackdrop: false,
        idBusiness: null
    }
    componentDidMount() {
        this.props.clientGetOrders(this.props.idCustomer);

    }

    setBackdropHandler() {
        this.setState({ showBackdrop: !this.state.showBackdrop })
    }

    render() {

        const orders = this.props.orders.map(res => {
            const isToTake = res.isToTake
            const isCash = res.isCash
            let stage = res.stage
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
            if (res.stage === "receivedOrders") {
                stage = "Recibida por el negocio."
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
                    {orders &&
                        orders}
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