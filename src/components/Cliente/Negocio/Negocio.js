import React, { Component } from 'react';
import classes from './Negocio.module.scss';
import Button from '../../UI/Button/Button';
import Product from './Products/Product/Product';
import Pedido from './Pedido/Pedido';
import * as actions from '../../../store/actions'
import { connect } from 'react-redux';

class Negocio extends Component {

       
    componentDidMount() {
        if (localStorage.getItem("businessId")) {
            this.props.getProducts(localStorage.getItem("businessId"))
        }  
        
        if (Object.keys(this.props.selectedNegocio).length == 0) {
            this.props.getSelectedBusiness(localStorage.getItem("businessId"))
        }
    }

    componentWillUnmount() {
        localStorage.removeItem("businessId")
    }

    

    render() {
        const products = Object.values(this.props.products).map(
            prod => {

                let selected = false
                if (this.props.selectedProd === prod.name) {
                    selected = true
                }
                const productCount = this.props.productCount.find(p => p.name === prod.name);
                let count = 0;
                if (productCount) {
                    count = productCount.count
                }

                return <Product
                    key={prod.key}
                    name={prod.name}
                    img={prod.img}
                    desc={prod.description}
                    selected={selected}
                    count={count}
                    price={prod.price}
                />
            })
        const imageUrl = 'https://c8.alamy.com/compes/t20754/la-ilustracion-muestra-una-casa-pequena-hecho-en-un-estilo-de-dibujos-animados-aislado-sobre-fondo-blanco-t20754.jpg';
        return (
            <>
                <div className={classes.negocio} >
                    <img className={classes.negocio_imagen} src={imageUrl} alt='Foto del negocio' />
                    <div className={classes.amount} >${this.props.orderPrice}</div>
                    <div className={classes.products} >
                         {products}
                    </div>
                   
                    <Button btnType='Success' clicked={() => this.props.openModal()} >Ver pedido</Button>
                    {
                        this.props.openOrder &&
                        <Pedido
                            total={this.props.orderPrice}
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
        products: state.negocio.products,
        selectedProd: state.cliente.selectedProduct,
        productCount: state.cliente.productCount,
        selectedNegocio: state.negocio.selectedNegocio
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getProducts: (id) => dispatch(actions.getProducts(id)),
        openModal: () => dispatch(actions.OpenOrderModal()),
        getSelectedBusiness: (idBusiness)=> dispatch(actions.getSelectedBusiness(idBusiness))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Negocio);