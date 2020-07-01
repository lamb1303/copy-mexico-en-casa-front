import React, { Component } from 'react';
import classes from './Negocio.module.scss';
import Button from '../../UI/Button/Button';
import Product from './Products/Product/Product';
import Pedido from './Pedido/Pedido';
import * as actions from '../../../store/actions'
import { connect } from 'react-redux';

class Negocio extends Component {
    componentDidMount() {
        this.isToGo = this.props.location.isToGo
        this.isToTake = this.props.location.isToTake
        this.cash = this.props.location.cash
        this.creditCard = this.props.location.creditCard


        if (this.props.location.photoBusiness) {
            localStorage.setItem("img", this.props.location.photoBusiness)
        }
        if (localStorage.getItem("businessId")) {
            this.props.getProducts(localStorage.getItem("businessId"))
        }

        if (Object.keys(this.props.selectedNegocio).length === 0) {
            this.props.getSelectedBusiness(localStorage.getItem("businessId"))
        }
    }

    componentWillUnmount() {
        localStorage.removeItem("businessId")
        localStorage.removeItem("img")
    }

    handleOptions = () => {
        if (this.props.isOpen) {
            if (this.props.name === this.props.selectedProd) {
                this.props.onCloseOptions()
            } else {
                this.props.onCloseOptions()
                this.props.onOpenOptions(this.props.name)
            }
        } else {
            this.props.onOpenOptions(this.props.name)
        }
    }

    render() {
        let initialCount = 0;
        const imageUrl = localStorage.getItem("img")
        const products = Object.values(this.props.products)
            .map(prod => {
                let selected = false
                if (this.props.selectedProd === prod.name) {
                    selected = true
                }
                const productCount = this.props.productCount.find(p => p.name === prod.name);
                let amount = 0;

                if (productCount) {
                    amount = productCount.amount
                    initialCount = amount
                }

                return <Product
                    key={prod.key}
                    name={prod.name}
                    img={prod.url}
                    desc={prod.desc}
                    selected={selected}
                    amount={amount}
                    price={prod.price}
                />
            })

        return (
            <>
                <div className={classes.negocio} >
                    <img className={classes.negocio_imagen} src={imageUrl} alt='' />
                    <div className={classes.amount} >${this.props.orderPrice}</div>
                    <div className={classes.products} >
                        {products}
                    </div>

                    <Button
                        disabled={
                            initialCount > 0 ? false : true
                        }
                        btnType={
                            initialCount > 0 ? "Success" : "Danger"
                        } clicked={() => {
                            this.props.openModal();
                            this.handleOptions()
                        }} >Ver pedido</Button>

                    {
                        (this.props.openOrder) &&
                        <Pedido
                            businessId={localStorage.getItem("businessId")}
                            orderPrice={this.props.orderPrice}
                            isToGo={this.isToGo}
                            isToTake={this.isToTake}
                            creditCard={this.creditCard}
                            cash={this.cash}
                            productCount={this.props.productCount}
                        />
                    }

                </div>
            </>

        )
    }
}


const mapStateToProps = state => {
    return {
        orderPrice: state.cliente.orderPrice,
        openOrder: state.cliente.openOrder,
        products: state.products.products,
        selectedProd: state.cliente.selectedProduct,
        productCount: state.cliente.productCount,
        selectedNegocio: state.negocio.selectedNegocio,
        isOpen: state.cliente.openProduct,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getProducts: (id) => dispatch(actions.getProducts(id)),
        openModal: () => dispatch(actions.OpenOrderModal()),
        getSelectedBusiness: (idBusiness) => dispatch(actions.getSelectedBusiness(idBusiness)),
        onCloseOptions: () => dispatch(actions.CloseSelectedProduct()),
        onOpenOptions: (name) => dispatch(actions.OpenSelectedProduct(name))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Negocio);