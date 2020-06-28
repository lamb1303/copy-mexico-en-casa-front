import React, { useState, Fragment, useEffect, useCallback } from 'react';
import classes from './Negocio.module.scss';
import Products from './Products/Products';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { ReactComponent as Settings } from '../../../../assets/settings.svg'
import Button from '../../../UI/Button/Button';
import Spinner from '../../../UI/Spinner/Spinner';
import Backdrop from '../../../UI/Backdrop/Backdrop';
import * as actions from '../../../../store/actions';
import EditProduct from './EditProduct/EditProduct';
import AddProduct from './AddProduct/AddProduct';

const noImage = 'https://firebasestorage.googleapis.com/v0/b/catalogocovid2020.appspot.com/o/no_image_food.svg?alt=media&token=ad03d09e-b410-477c-b687-84b40c1aca27';

const Negocio = props => {

    const { getNegocioDetails, id, customer } = props;
    const [desc, setDesc] = useState(null);
    const [name, setName] = useState(null);
    const [businessImage, setBusinessImage] = useState();
    const [previewUrl, setPreviewUrl] = useState();

    const cancel = () => {
        setPreviewUrl(null);
        setBusinessImage(null);
        setName(null);
        setDesc(null);
        props.cancelEdit();
    }

    const handleSave = () => {

        if (businessImage) {
            const updates = {
                file: businessImage,
                businessDesc: desc ? desc : props.selectedNegocio.businessDesc,
                businessName: name ? name : props.selectedNegocio.businessName
            }
            props.editBusinessWithPhoto(updates, id)
        } else {

            if (name === '' || desc === '') return;

            const updates = {
                businessDesc: desc !== null ? desc : props.selectedNegocio.businessDesc,
                businessName: name !== null ? name : props.selectedNegocio.businessName
            }

            if (updates.businessDesc === props.selectedNegocio.businessDesc &&
                updates.businessName === props.selectedNegocio.businessName) return;

            props.editBusinessWithoutPhoto(updates, id);
        }
    }

    const getNegocio = useCallback(() => {
        getNegocioDetails(id)
    }, [getNegocioDetails, id])

    useEffect(() => {
        if (customer !== null) getNegocio()
    }, [getNegocio, customer])

    let negocioInfo = <Spinner />


    useEffect(() => {
        if (!businessImage) {
            return;
        };

        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result);
        };
        fileReader.readAsDataURL(businessImage);
    }, [businessImage]);

    let image;
    if (businessImage) {
        image = previewUrl
    } else {
        image = props.selectedNegocio.photoBusiness !== 'empty' ? props.selectedNegocio.photoBusiness : noImage
    }

    if (props.selectedNegocio) {
        negocioInfo = (
            <>
                <div className={classes.businessName} > {props.selectedNegocio.businessName} </div>
                <div className={classes.header} >
                    <img
                        className={classes.fotoNegocio}
                        alt='foto del negocio'
                        src={image}
                    />
                    <p>{props.selectedNegocio ? props.selectedNegocio.businessDesc : ''}</p>
                </div>
            </>
        );
    }

    if (props.editMode) {
        negocioInfo = (
            <>
                <div className={classes.editBusinessName} >
                    <NavLink to='/editBusiness' > <Settings /> </NavLink>
                    <input
                        type='text'
                        value={name !== null ? name : props.selectedNegocio.businessName}
                        onChange={(event) => setName(event.target.value)} />
                </div>
                <div className={classes.header} >
                    <input onChange={(event) => setBusinessImage(event.target.files[0])} type='file' style={{ display: 'none' }} id='cambiarFotoNegocio' />
                    <label htmlFor='cambiarFotoNegocio' >
                        <img
                            className={classes.fotoNegocio}
                            alt='foto del negocio'
                            src={image}
                        />
                    </label>
                    <textarea
                        className={classes.textArea}
                        value={desc !== null ? desc : props.selectedNegocio.businessDesc}
                        onChange={(event) => setDesc(event.target.value)} />
                </div>
            </>
        )
    }

    return (
        <Fragment>
            {props.editProductMode && <EditProduct />}
            {props.loading && (
                <>
                    <Backdrop show={props.loading} />
                    <Spinner />
                </>
            )}
            {!props.loading && (
                <Fragment>
                    <div className={classes.negocio} >
                        {props.selectedNegocio ? (
                            <>
                                {negocioInfo}
                                <Products />
                            </>
                        ) : <Spinner />}
                    </div>
                    {props.editMode && (
                        <div className={classes.save}>
                            <Button clicked={() => handleSave()} btnType='Success' >GUARDAR</Button>
                            <Button btnType='Success' ><NavLink to='/addProduct'>+</NavLink></Button>
                            <Button clicked={() => cancel()} btnType='Success' >CANCELAR</Button>
                        </div>)}

                    {props.addProductClicked && (<AddProduct />)}
                </Fragment>
            )}
        </Fragment>
    )
};

const mapStateToProps = state => {
    return {
        editMode: state.negocio.editMode,
        selectedNegocio: state.negocio.selectedNegocio,
        editProductMode: state.negocio.editProduct,
        addProductClicked: state.negocio.addProductClicked,
        id: state.home.id,
        loading: state.negocio.loading,
        customer: state.home.isCustomer
    }
}

const mapDispatchToProps = {
    closeEditMode: actions.closeEditMode,
    clickAddProduct: actions.clickAddProduct,
    getNegocioDetails: actions.getNegocioDetails,
    cancelEdit: actions.cancelEdit,
    editBusinessWithoutPhoto: actions.EditBusinessWithoutPhoto,
    editBusinessWithPhoto: actions.EditBusinessWithPhoto,
}

export default connect(mapStateToProps, mapDispatchToProps)(Negocio); 