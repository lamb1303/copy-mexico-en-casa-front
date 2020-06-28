import React, { Fragment, useState, useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { loadForm } from '../../../../../store/utility'

import * as actions from '../../../../../store/actions';

import Button from '../../../../UI/Button/Button';
import AlertComponent from '../../../../UI/Alert/Alert';
import Spinner from '../../../../UI/Spinner/Spinner';
import Backdrop from '../../../../UI/Backdrop/Backdrop';
import { TextField, InputAdornment } from '@material-ui/core';
import ImageUpload from '../../../../UI/ImageUpload/ImageUpload';


import NoImage from '../../../assets/no_image_food.svg';

import './AddProduct.scss';

const AddProduct = props => {

    const [selectedImage, setSelectedImage] = useState(NoImage);
    const [foodName, setFoodName] = useState("");
    const [foodNameError, setFoodNameError] = useState("");
    const [price, setPrice] = useState("");
    const [priceError, setPriceError] = useState("");
    const [desc, setDesc] = useState("");
    const [descError, setDescError] = useState("");
    const { isProductAdded, changeIsProductAdded, isAlert } = props;


    const uploadImage = (_, pickedFile, fileIsValid) => {
        if (fileIsValid) {
            setSelectedImage(pickedFile);
        }
    }

    const handleInput = (id, value) => {

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

    const saveProduct = () => {
        if (!foodNameError && !priceError && !descError) {
            const foodProduct = {
                idBusiness: props.id,
                name: foodName,
                desc: desc,
                price: price,
                file: selectedImage,
            }

            const formData = loadForm(foodProduct);

            props.addProduct(formData);
        }
    }

    const clearField = useCallback(() => {
        if (isProductAdded && !isAlert) {
            setFoodName("");
            setFoodNameError("");
            setPrice("");
            setPriceError("");
            setDesc("");
            setDescError("");
            setSelectedImage(NoImage);
            changeIsProductAdded();
        }

    }, [isProductAdded, changeIsProductAdded, isAlert]);

    useEffect(() => {
        clearField()
    }, [clearField])

    return (
        <Fragment>
            <div className="addProduct">

                    <div className="addProduct-container">
                        <h3>Crear un nuevo platillo</h3>
                        <ImageUpload
                            center
                            id='image'
                            btnType='Success'
                            onInput={(_, pickedFile, fileIsValid) => uploadImage(_, pickedFile, fileIsValid)}
                            message='CAMBIAR IMAGEN'
                            img={selectedImage}
                        />

                        <div className="addProduct-container-info">
                            <TextField
                                required
                                name='nameFood'
                                className="addProduct-container-info__name"
                                error={foodNameError ? true : false}
                                value={foodName}
                                onChange={(event) => handleInput("foodName", event.target.value)}
                                label="Nombre del platillo"
                                variant="outlined"
                                helperText={foodNameError}
                            />

                            <TextField
                                required
                                name='price'
                                className='addProduct-container-info__price'
                                error={priceError ? true : false}
                                value={price}
                                onChange={(event) => handleInput("price", event.target.value)}
                                label="Precio del platillo"
                                variant="outlined"
                                helperText={priceError}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                }}
                            />
                        </div>

                        <div className="addProduct-container__desc">
                            <TextField
                                required
                                name='desc'
                                multiline
                                error={descError ? true : false}
                                value={desc}
                                onChange={(event) => handleInput("desc", event.target.value)}
                                label="Descripción del platillo"
                                rows={4}
                                variant="outlined"
                                helperText={descError}
                            />
                        </div>
                        <Button
                            btnType={(foodNameError || priceError || descError) || (!foodName || !price || !desc) ? 'Danger' : 'Success'}
                            disabled={(foodNameError || priceError || descError) || (!foodName || !price || !desc)} clicked={() => saveProduct()}
                        >
                            GUARDAR
                </Button>
                    </div>
                </div>
            <div>
                {isAlert &&
                    <AlertComponent
                        title={props.alertType}
                        isActive={isAlert}
                        closeAlert={() => props.updateAddProductAlert()}>
                        {props.message}
                    </AlertComponent>
                }
            </div>
            {props.loading && (
                <Fragment>
                    <Backdrop show={true} />
                    <Spinner />
                </Fragment>)}
        </Fragment>
    );

}

const mapStateToProps = state => {
    return {
        loading: state.products.loading,
        isProductAdded: state.products.isProductAdded,
        isAlert: state.products.isAlert,
        alertType: state.products.alertType,
        message: state.products.message,
        id: state.home.id,
    }
}

const mapDispatchToProps = {
    addProduct: actions.addProduct,
    updateAddProductAlert: actions.updateAddProductAlert,
    changeIsProductAdded: actions.changeIsProductAdded,

}

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);