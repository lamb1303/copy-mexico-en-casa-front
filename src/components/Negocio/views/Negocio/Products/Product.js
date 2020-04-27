import React, { Fragment } from 'react'
import classes from './Product.module.scss';
import { ReactComponent as Edit } from '../../../assets/edit.svg';
import { connect } from 'react-redux';
import * as actions from '../../../../../store/actions';

const Product = props => {

    const editProduct = () => {
        const prodToEdit = {
            name: props.name,
            img: props.img,
            desc: props.desc,
            price: props.price
        }
        props.openEditProduct(prodToEdit);
    }

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
                    {props.editMode && <Edit onClick={() => editProduct()} className={classes.editIcon} />}
                </div>
            </div>
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        editMode: state.negocio.editMode,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        openEditProduct: (prodToEdit) => dispatch(actions.openEditProduct(prodToEdit))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Product);