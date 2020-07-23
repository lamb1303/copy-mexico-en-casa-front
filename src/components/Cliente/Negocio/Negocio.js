import React, { Component } from 'react';
import classes from './Negocio.module.scss';
import Button from '../../UI/Button/Button';
import Product from './Products/Product/Product';
import Pedido from './Pedido/Pedido';
import * as actions from '../../../store/actions'
import { connect } from 'react-redux';
import EditProduct from '../../Negocio/views/Negocio/EditProduct/EditProduct'

class Negocio extends Component {
    componentDidMount() {
        this.isToGo = this.props.location.isToGo
        this.isToTake = this.props.location.isToTake
        this.cash = this.props.location.cash
        this.creditCard = this.props.location.creditCard

        if (!this.props.client) {
            const id = this.props.id
            this.props.getClient(id);
        }

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
        let imageUrl = localStorage.getItem("img")
        if(imageUrl === 'empty') imageUrl = 'https://firebasestorage.googleapis.com/v0/b/catalogocovid2020.appspot.com/o/imagen_mexico_en_casa.png?alt=media&token=39bc7063-cb25-4be4-85e3-a6a24c55b7bd';
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
                    {this.props.editProductMode && <EditProduct />}
                    <img className={classes.negocio_imagen} src={imageUrl} alt='' />
                    <div className={classes.amount} >${this.props.orderPrice}</div>
                    <div className={classes.products} >
                        {products}
                    </div>

                    <Button
                        disabled={
                            this.props.totalAmount > 0 ? false : true
                        }
                        btnType={
                            this.props.totalAmount > 0 ? "Success" : "Danger"
                        } clicked={() => {
                            this.props.openModal();
                            this.handleOptions();
                        }} >Mostrar orden</Button>

                    {
                        (this.props.openOrder) &&
                        <Pedido
                            orderPrice={this.props.orderPrice}
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
        editMode: state.negocio.editMode,
        editProductMode: state.products.editProductMode,
        totalAmount: state.cliente.totalAmount,
        id: state.home.id,
        client: state.cliente.cliente,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getProducts: (id) => dispatch(actions.getProducts(id)),
        openModal: () => dispatch(actions.OpenOrderModal()),
        getSelectedBusiness: (idBusiness) => dispatch(actions.getSelectedBusiness(idBusiness)),
        onCloseOptions: () => dispatch(actions.CloseSelectedProduct()),
        onOpenOptions: (name) => dispatch(actions.OpenSelectedProduct(name)),
        getClient: (id) => dispatch(actions.getClient(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Negocio);