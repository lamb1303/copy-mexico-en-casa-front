import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../../../store/actions';

import Button from '../../../../UI/Button/Button';
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

    const uploadImage = (pickedFile, fileIsValid) => {
        if (fileIsValid) {
            setSelectedImage(pickedFile)
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
                    setPriceError("Solo valores númericos")
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
            const food = {
                idBusiness: props.idBusiness,
                name: foodName,
                price: price,
                desc: desc
            }
            props.addProduct(food);
            
        }
    }

    return (
        <Fragment>
            <div className="addProduct">

                <div className="addProduct-container">
                    <h3>Crear un nuevo platillo</h3>
                    <ImageUpload
                        from='editProd'
                        center
                        id='image'
                        btnType='Success'
                        onInput={(_, pickedFile, fileIsValid) => uploadImage(pickedFile, fileIsValid)}
                        message='CAMBIAR IMAGEN'
                        img={selectedImage}
                    />

                    <div className="addProduct-container-info">
                        <TextField
                            className="addProduct-container-info__name"
                            required
                            error={foodNameError ? true : false}
                            value={foodName}
                            onChange={(event) => handleInput("foodName", event.target.value)}
                            label="Nombre del platillo"
                            defaultValue=""
                            variant="outlined"
                            helperText={foodNameError}
                        />


                        <TextField
                            className='addProduct-container-info__desc'
                            required
                            error={priceError ? true : false}
                            value={price}
                            onChange={(event) => handleInput("price", event.target.value)}
                            label="Precio del platillo"
                            defaultValue=""
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
                            multiline
                            error={descError ? true : false}
                            value={desc}
                            onChange={(event) => handleInput("desc", event.target.value)}
                            label="Descripción del platillo"
                            rows={4}
                            defaultValue=""
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
        </Fragment>
    );

}

const mapStateToProps = state => {
    return {
        isProductAdded: state.registro.isProductAdded,
        idBusiness: state.home.idBusiness,
    
    }
}

const mapDispatchToProps = {

    addProduct: actions.addProduct,


}

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);