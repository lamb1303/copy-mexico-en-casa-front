import React, { Component } from 'react';
import classes from './Negocio.module.scss';
import Button from '../../UI/Button/Button';
import Products from './Products/Products';
import Pedido from './Pedido/Pedido';
import * as actions from '../../../store/actions'
import { connect } from 'react-redux';
import axios from 'axios'

class Negocio extends Component {

    state = {
        products: {}
    }
    componentDidMount() {
        //id product
        axios.get(`${process.env.REACT_APP_API_URL}/products/businessProducts`).then(
            response => {
                const products = response.data.products
                const updatedProducts = Object.keys(products).map(
                    igKey => {
                        return [...Array(products[igKey])].map((_, i) => {
                           console.log(_)
                       })
                   }
               )
            }
        ).catch(e => console.log(e))
    }
    render() {
        // const products = Object.keys(this.state.products).map(
        //     product => {
        //         console.log(product)
        //     }
        // )
        const imageUrl = 'https://c8.alamy.com/compes/t20754/la-ilustracion-muestra-una-casa-pequena-hecho-en-un-estilo-de-dibujos-animados-aislado-sobre-fondo-blanco-t20754.jpg';
        return (
            <>
                <div className={classes.negocio} >
                    <img className={classes.negocio_imagen} src={imageUrl} alt='Foto del negocio' />
                    <div className={classes.amount} >${this.props.orderPrice}</div>
                   
                    <Button btnType='Success' clicked={() => this.props.abrirModal()} >Ver pedido</Button>
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
        openOrder: state.cliente.openOrder
    }
}

const mapDispatchToProps = dispatch => {
    return {
        abrirModal: () => dispatch(actions.OpenOrderModal())

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Negocio);