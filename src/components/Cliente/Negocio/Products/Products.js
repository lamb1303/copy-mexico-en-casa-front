import React from 'react';
import Product from './Product/Product';
import classes from './Products.module.css';
import { connect } from 'react-redux';

const Products = props => {



    return (
        <div className={classes.products} >
            {props.products && props.products.
                map(prod => {

                    let selected = false
                    if (props.selectedProd === prod.name) {
                        selected = true
                    }
                    const productCount = props.productCount.find(p => p.name === prod.name);
                    let count = 0;
                    if (productCount) {
                        count = productCount.count
                    }

                    return <Product
                        key={prod.name}
                        name={prod.name}
                        img={prod.img}
                        desc={prod.description}
                        selected={selected}
                        count={count}
                        price={prod.price}
                    />
                })}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        products: state.products.products,
        selectedProd: state.cliente.selectedProduct,
        productCount: state.cliente.productCount
    }
}

export default connect(mapStateToProps)(Products);