import React, { Fragment } from 'react';
import addToCar from '../../../../../assets/cliente/addtocar.PNG';
import classes from './Product.module.scss';
import Hidden from './HiddenOptions';
import * as actions from '../../../../../store/actions';
import { connect } from 'react-redux';

const Product = props => {

    let showed_Prod = 'slide';
    if (props.selected) {
        showed_Prod = 'slide_out'
    }

    const handleOptions = () => {
        if (props.isOpen) {
            if (props.name === props.selectedProd) {
                props.onCloseOptions()
            } else {
                props.onCloseOptions()
                props.onOpenOptions(props.name)
            }
        } else {
            props.onOpenOptions(props.name)
        }
    }

    const editProduct = () => {
        const prodToEdit = {
            name: props.name,
            img: props.img,
            desc: props.desc,
            price: props.price
        }
        props.openEditProduct(prodToEdit);
    }

    const handleShowProduct = () => {
        if (!props.editMode) {
            editProduct();
        }
    }

    return (
        <Fragment>
            <hr />
            <div className={classes.product} >
                <div className={[classes.showedOptions, classes[showed_Prod]].join(' ')}>
                    <div className={[classes.showedOptions, classes[showed_Prod]].join(' ')} onClick={() => handleShowProduct()}>
                        <img className={classes.product_image} src={props.img} alt={`imagen de ${props.name}`} />
                        <div className={classes.product_desc} >
                            {props.desc}
                            <div>
                                ${props.price}
                            </div>
                        </div>
                    </div> <img
                        className={classes.product_addToCar}
                        src={addToCar}
                        alt='add to car'
                        onClick={() => handleOptions()}
                    />
                </div>

                <Hidden
                    selected={props.selected}
                    product={props.name}
                    amount={props.amount}
                    price={props.price}
                    img={props.img} />
            </div>
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        isOpen: state.cliente.openProduct,
        selectedProd: state.cliente.selectedProduct
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOpenOptions: (name) => dispatch(actions.OpenSelectedProduct(name)),
        onCloseOptions: () => dispatch(actions.CloseSelectedProduct()),
        openEditProduct: (prodToEdit) => dispatch(actions.openEditProduct(prodToEdit))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);