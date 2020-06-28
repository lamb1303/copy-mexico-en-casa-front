import React, { useState, Fragment, useEffect, useCallback } from 'react';
import classes from './Negocio.module.scss';
import Products from './Products/Products';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { ReactComponent as Camera } from '../../assets/camera.svg'
import Button from '../../../UI/Button/Button';
import Spinner from '../../../UI/Spinner/Spinner';
import * as actions from '../../../../store/actions';
import EditProduct from './EditProduct/EditProduct';
import AddProduct from './AddProduct/AddProduct';
import AlertComponent from '../../../UI/Alert/Alert';


const Negocio = props => {

    const { getNegocioDetails, id, customer } = props;

    const getNegocio = useCallback(() => {
        getNegocioDetails(id);
    }, [getNegocioDetails, id])

    useEffect(() => {
        if (customer !== null) getNegocio()
    }, [getNegocio, customer])

    const [desc, setDesc] = useState('');

    const verifyChanges = () => {
        if (desc !== props.selectedNegocio.businessDesc) {
            props.saveChanges(desc);
        } else {
            props.closeEditMode();
        }
    }

    let blur = '';
    let negocio = '';
    if (props.editMode) {
        blur = 'blur';
        negocio = 'editSize'
    }


    return (
        <Fragment>
            {props.editProductMode && <EditProduct />}
            {props.loading ? <Spinner /> : (
                <Fragment>
                    <div className={[classes.negocio, classes[negocio]].join(' ')} >
                        <div className={classes.header} >
                            {props.editMode ? <Camera className={[classes.fotoNegocio, classes['camera']].join(' ')} /> : <img
                                className={[classes.fotoNegocio, classes[blur]].join(' ')}
                                alt='foto del negocio'
                                src={props.selectedNegocio ? props.selectedNegocio.photoBusiness : ''}
                            />}
                            {props.editMode ? <textarea value={desc} onChange={(event) => setDesc(event.target.value)} />
                                : <p>{props.selectedNegocio ? props.selectedNegocio.businessDesc : ''}</p>
                            }
                        </div>
                        <Products />
                    </div>
                    {props.editMode && (
                        <div className={classes.save}>
                            <Button clicked={() => verifyChanges()} btnType='Success' >GUARDAR</Button>
                            <Button btnType='Success' ><NavLink to='/addProduct'>AGREGAR COMIDA</NavLink></Button>
                        </div>)}

                    {props.addProductClicked && (<AddProduct />)}
                    <div>
                        {props.isAlert &&
                            <AlertComponent
                                title={props.alertType}
                                isActive={props.isAlert}
                                closeAlert={() => props.closeEditProductAlert()}>
                                {props.message}
                            </AlertComponent>}
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
};

const mapStateToProps = state => {
    return {
        editMode: state.negocio.editMode,
        selectedNegocio: state.negocio.selectedNegocio,
        editProductMode: state.products.editProductMode,
        addProductClicked: state.negocio.addProductClicked,
        id: state.home.id,
        customer: state.home.isCustomer,
        loading: state.negocio.loading,
        isAlert: state.products.isEditAlert,
        alertType: state.products.alertType,
        message: state.products.message,
    }
}

const mapDispatchToProps = {
    saveChanges: actions.saveChanges,
    closeEditMode: actions.closeEditMode,
    clickAddProduct: actions.clickAddProduct,
    getNegocioDetails: actions.getNegocioDetails,
    getProducts: actions.getProducts,
    closeEditProductAlert: actions.closeEditProductAlert,
}

export default connect(mapStateToProps, mapDispatchToProps)(Negocio); 