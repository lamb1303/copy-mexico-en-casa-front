import React from 'react'
import { connect } from 'react-redux';
import Product from './Product';
import Button from '../../../../UI/Button/Button';
import { NavLink } from 'react-router-dom';

import classes from './Products.module.css';

const Products = props => {

    let products;
    const productsEmpty = (
        <div className={classes.emptyList} >
            <span>AGREGAR NUEVO PLATILLO</span>
            <Button btnType='Success' >
                <NavLink to='/addProduct'>AGREGAR COMIDA</NavLink>
            </Button>
        </div>
    )

    if (!props.products) products = productsEmpty
    if (props.products.length < 1) products = productsEmpty
    else products = (
        props.products && props.products
            .map(prod => {
                return <Product
                    key={prod.name}
                    id={prod.name}
                    name={prod.name}
                    img={prod.url}
                    desc={prod.description}
                    price={prod.price}
                />
            }))

    return (
        <div className={classes.products}>
            {products}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        products: state.negocio.products
    }
}

export default connect(mapStateToProps)(Products);