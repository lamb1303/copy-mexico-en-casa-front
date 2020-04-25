import React, { Fragment } from 'react'
import classes from './Product.module.scss';

const Product = props => {
    return (
        <Fragment>
            <hr />
            <div className={classes.product} >
                <div className={classes.showedOptions} >
                    <img className={classes.product_image} src={props.img} alt={`imagen de ${props.name}`} />
                    <div className={classes.product_desc} >
                        {props.desc}
                        <div>
                            ${props.price}
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}


export default Product;