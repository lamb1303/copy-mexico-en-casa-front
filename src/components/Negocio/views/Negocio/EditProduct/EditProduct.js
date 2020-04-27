import React, { Fragment } from 'react';
import Backdrop from '../../../../UI/Backdrop/Backdrop';
import { connect } from 'react-redux';
import * as actions from '../../../../../store/actions';
import Button from '../../../../UI/Button/Button';
import classes from './EditProduct.module.scss';

const EditProduct = props => {
    return (
        <Fragment>
            <Backdrop show={props.editMode} clicked={() => props.closeEdit()} />
            <div className={classes.modal}>
                <div className={classes.header}>
                    <span>{props.selectedProduct.name}</span>
                    <div className={classes.imgProd}>
                        <img
                            src={props.selectedProduct.img}
                            alt={props.selectedProduct.name}
                        />
                    </div>
                </div>
                <div className={classes.body} >
                    <p>{props.selectedProduct.desc}</p>
                    <span>${props.selectedProduct.price}</span>
                </div>
                <div className={classes.bottom} >
                    <Button
                        btnType='Success'
                        clicked={() => props.closeEdit()} >GUARDAR</Button>
                </div>
            </div>
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        editMode: state.negocio.editMode,
        selectedProduct: state.negocio.selectedProduct
    }
}

const mapDispatchToProps = dispatch => {
    return {
        closeEdit: () => dispatch(actions.closeEditProduct())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);