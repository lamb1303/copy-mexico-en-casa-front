import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../../store/actions';

import { loadForm } from '../../../../../store/utility'
import { TextField, InputAdornment } from '@material-ui/core';
import Spinner from '../../../../UI/Spinner/Spinner';
import Backdrop from '../../../../UI/Backdrop/Backdrop';
import Button from '../../../../UI/Button/Button';
import ImageUpload from '../../../../UI/ImageUpload/ImageUpload';

import classes from './EditProduct.module.scss';

const EditProduct = props => {

    const [foodName, setFoodName] = useState(props.selectedProduct.name)
    const [selectedImage, setSelectedImage] = useState(props.selectedProduct.img)
    const [desc, setDesc] = useState(props.selectedProduct.desc)
    const [price, setPrice] = useState(props.selectedProduct.price)
    const [changed, setChanged] = useState(false);

    const [foodNameError, setFoodNameError] = useState();
    const [priceError, setPriceError] = useState();
    const [descError, setDescError] = useState();

    const originalNameProduct = props.selectedProduct.name;

    let header = (
        <Fragment>
            <div className={classes.viewImg}>
                <img
                    className={classes.viewImg}
                    src={selectedImage}
                    alt={foodName}
                />
            </div>
        </Fragment>
    );

    let body = (
        <Fragment>
            <div className={classes.prodInfo}>
                <h1>{foodName}</h1>
                <p>{desc}</p>
                <div className={classes.priceFormat}>
                    <span>${price}</span>
                </div>
            </div>
        </Fragment>
    );

    const handleImage = (pickedFile, fileIsValid) => {
        if (fileIsValid) {
            setSelectedImage(pickedFile)
            setChanged(true);
        }
    }

    const handleInput = (id, value) => {
        setChanged(true);
        switch (id) {
            case 'foodName':
                value === "" ? setFoodNameError("Campo requerido") : setFoodNameError("");
                setFoodName(value)
                break;
            case 'price':
                if (value === "") {
                    setPriceError("Campo requerido")
                } else if (isNaN(value)) {
                    setPriceError("Solo números")
                } else if (value <= 0) {
                    setPriceError("precio debe de ser mayor o igual a 0")
                } else {
                    setPriceError("")
                };
                setPrice(value)
                break;
            case 'desc':
                value === "" ? setDescError("Campo requerido") : setDescError("");
                setDesc(value)
                break;
            default: break;

        }
    }

    const handleUpdate = () => {
        if (changed) {
            //spinner de haciendo update

            if (!foodNameError && !priceError && !descError) {
                //update the product
                const product = {
                    idBusiness: props.id,
                    originalNameProduct: originalNameProduct,
                    name: foodName,
                    desc: desc,
                    price: price,
                    file: selectedImage,
                };

                const formData = loadForm(product);
                props.updateProduct(props.id, formData);
                // props.closeEdit();

            }
        } else {
            props.closeEdit()
        }
    }

    const handleCloseEdit = () => {
        if (changed) {
            if (window.confirm('Guardar cambios antes de salir?')) {
                handleUpdate()
            } else {
                props.closeEdit()
            }
        } else {
            props.closeEdit()
        }
    }

    if (props.editMode) {
        header = (<Fragment>
            <div className={classes.imgProd}>
                <ImageUpload
                    from={classes.imgProd}
                    center
                    id='image'
                    btnType='Success'
                    onInput={(_, pickedFile, fileIsValid) => handleImage(pickedFile, fileIsValid)}
                    message='CAMBIAR IMAGEN'
                    img={selectedImage}
                />
            </div>
        </Fragment>);

        body = (
            <Fragment>
                <div className={classes.flexItems}>
                    <TextField
                        required
                        name='nameFood'
                        className={classes.editTitle}
                        error={foodNameError ? true : false}
                        value={foodName}
                        onChange={(event) => handleInput("foodName", event.target.value)}
                        label="Nombre"
                        variant="outlined"
                        helperText={foodNameError}
                    />

                    <TextField
                        required
                        name='price'
                        className={classes.changePrice}
                        value={price}
                        error={priceError ? true : false}
                        type='number'
                        pattern="\d*"
                        min='1'
                        onChange={(event) => handleInput("price", event.target.value)}
                        label="Precio"
                        variant="outlined"
                        helperText={priceError}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                    />
                </div>
                <TextField
                    required
                    name='desc'
                    className={classes.textarea}
                    multiline
                    value={desc}
                    error={descError ? true : false}
                    onChange={(event) => handleInput("desc", event.target.value)}
                    label="Descripción del platillo"
                    rows={4}
                    variant="outlined"
                    helperText={descError}
                />
            </Fragment>
        )
    }

    return (
        <Fragment>
            <Backdrop show clicked={() => handleCloseEdit()} />
            <div className={classes.modal}>
            {props.loading && (
                <Fragment>
                    <Backdrop show={true} />
                    <Spinner />
                </Fragment>)}

                <div className={classes.header}>
                    {header}
                </div>
                <div className={classes.body} >
                    {body}
                </div>
                {props.editMode && <div className={classes.bottom} >
                    <Button
                        disabled={!changed}
                        btnType={changed ? 'Success' : 'Danger'}
                        clicked={() => handleUpdate()} >GUARDAR</Button>
                </div>}
            </div>
        </Fragment >
    )
}

const mapStateToProps = state => {
    return {
        editMode: state.negocio.editMode,
        selectedProduct: state.products.selectedProduct,
        showSidebar: state.negocio.showSidebar,
        id: state.home.id,
        loading: state.products.loading,
    }
}

const mapDispatchToProps = {
    closeEdit: actions.closeEditProduct,
    updateProduct: actions.updateProduct,

}

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);