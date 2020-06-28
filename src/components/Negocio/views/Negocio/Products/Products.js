import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import * as actions from '../../../../../store/actions';

import Product from './Product';

import classes from './Products.module.css';

const Products = props => {

    const { id, getProducts, editProductMode, isEditAlert } = props;

    useEffect(() => {
        if (id && !editProductMode && !isEditAlert) {
            getProducts(id);
        }
    }, [id, getProducts, editProductMode, isEditAlert]);

    let products;
    const productsEmpty = (
        <div className={classes.emptyList} >
            <p>No hay platillos agregados</p>
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

                    return <Product
                        key={prod.name}
                        id={prod.name}
                        name={prod.name}
                        img={prod.url}
                        desc={prod.desc}
                        price={prod.price}
                    />
                }));
    } else {
        if (!props.products) products = productsEmpty
        if (props.products.length < 1) products = productsEmpty
    }

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

const mapDispatchToProps = {
    getProducts: actions.getProducts,
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);