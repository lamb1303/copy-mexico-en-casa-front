import React, { Fragment } from 'react'
import classes from './Product.module.scss';
import { ReactComponent as Edit } from '../../../assets/edit.svg';
import { ReactComponent as Delete } from '../../../assets/trash.svg'
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

    const handleShowProduct = () => {
        if (!props.editMode) {
            editProduct();
        }
    }

    const deleteProduct = () => {
        if (window.confirm('¿Deseas eliminar este producto?')) {

            const prodToDelete = {
                idBusiness: props.idBusiness,
                name: props.name,
                url: props.img,
            }

            props.deleteProduct(prodToDelete);

        }
    }

    return (
        <Fragment>
            <hr />
            <div className={classes.product} onClick={() => handleShowProduct()}>
                <div className={classes.showedOptions} >
                    <img className={classes.product_image} src={props.img} alt={`imagen de ${props.name}`} />
                    <div className={classes.product_desc} >
                        {props.desc}
                        <div>
                            ${props.price}
                        </div>
                    </div>
                    {props.editMode &&
                        <div>
                            <Edit onClick={() => editProduct()} className={classes.editIcon} />
                            <Delete onClick={() => deleteProduct()} className={classes.editIcon} />
                        </div>
                    }
                </div>
            </div>
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        editMode: state.negocio.editMode,
        idBusiness: state.home.id,
    }
}

const mapDispatchToProps = {
    openEditProduct: actions.openEditProduct,
    deleteProduct: actions.deleteProduct,

}


export default connect(mapStateToProps, mapDispatchToProps)(Product);