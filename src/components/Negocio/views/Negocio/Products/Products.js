import React from 'react'
import classes from './Products.module.css';
import { connect } from 'react-redux';
import Product from './Product';

const Products = props => {
    return (
        <div className={classes.products}>
            {props.products && props.products
                .map(prod => {

                    return <Product
                        key={prod.name}
                        id={prod.name}
                        name={prod.name}
                        img={prod.img}
                        desc={prod.description}
                        price={prod.price}
                    />
                })}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        products: state.products.products
    }
}

export default connect(mapStateToProps)(Products);