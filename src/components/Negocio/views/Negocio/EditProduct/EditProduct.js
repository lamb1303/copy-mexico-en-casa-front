import React, { Fragment, useState } from 'react';
import Backdrop from '../../../../UI/Backdrop/Backdrop';
import { connect } from 'react-redux';
import * as actions from '../../../../../store/actions';
import Button from '../../../../UI/Button/Button';
import ImageUpload from '../../../../UI/ImageUpload/ImageUpload';

import classes from './EditProduct.module.scss';

const EditProduct = props => {

    const [title, setTitle] = useState(props.selectedProduct.name)
    const [selectedImage, setSelectedImage] = useState(props.selectedProduct.img)
    const [description, setDescription] = useState(props.selectedProduct.desc)
    const [price, setPrice] = useState(props.selectedProduct.price)
    const [changed, setChanged] = useState(false);

    let header = (
        <Fragment>
            <span className={classes.prodName} >{title}</span>
            <div className={classes.imgProd}>
                <img
                    src={selectedImage}
                    alt={title}
                />
            </div>
        </Fragment>
    );

    let body = (
        <Fragment>
            <p>{description}</p>
            <span>${price}</span>
        </Fragment>
    );

    const handleImage = (pickedFile, fileIsValid) => {
        if (fileIsValid) {
            setSelectedImage(pickedFile)
            setChanged(true);
        }
    }

    const handleTitle = (event) => {
        setTitle(event.target.value);
        setChanged(true);
    }
    const handleDesc = (event) => {
        setDescription(event.target.value);
        setChanged(true);
    }
    const handlePrice = (event) => {
        // if (event.target.value < 1) {
        //     return;
        // }
        setPrice(event.target.value);
        setChanged(true);
    }

    const handleUpdate = () => {
        if (changed) {
            //spinner de haciendo update
            if (isNaN(price)) {
                //Message that price is not numerical
                console.log('Price is not numeric');
                return;
            }
            if (title !== '' && description !== '' && price > 0) {
                //update the product
                const newProduct = {
                    name: title,
                    description: description,
                    price: price,
                    img: selectedImage
                };
                console.log('update product');
                console.log(newProduct)
                props.closeEdit()

            } else {
                console.log('revisa tus entradas');
            }
        } else {
            console.log('No changes detected');
            props.closeEdit()
        }
    }

    const handleCloseEdit = () => {
        if (changed) {
            if (window.confirm('Guardar cambios antes de salir?')) {
                console.log('handle update');
                handleUpdate()
            } else {
                console.log('Saliendo sin guardar');
                props.closeEdit()
            }
        } else {
            console.log('No changes detected');
            props.closeEdit()
        }
    }

    if (props.editMode) {
        header = (<Fragment>
            <input
                className={classes.editTitle}
                value={title}
                onChange={(event) => handleTitle(event)}
            />
            <div className={classes.imgProd}>
                <ImageUpload
                    from='editProd'
                    center
                    id='image'
                    btnType='Danger'
                    onInput={(_, pickedFile, fileIsValid) => handleImage(pickedFile, fileIsValid)}
                    message='CAMBIAR IMAGEN'
                    img={selectedImage}
                />
            </div>
        </Fragment>);

        body = (
            <Fragment>
                <textarea
                    value={description}
                    onChange={(event) => handleDesc(event)}
                />
                <div className={classes.changePrice}>
                    <span>$</span>
                    <input
                        min='1'
                        pattern="\d*"
                        type='number'
                        value={price}
                        onChange={(event) => handlePrice(event)}
                    />
                </div>
            </Fragment>
        )
    }

    return (
        <Fragment>
            <Backdrop show clicked={() => handleCloseEdit()} />
            <div className={classes.modal}>

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
        selectedProduct: state.negocio.selectedProduct,
        showSidebar: state.negocio.showSidebar
    }
}

const mapDispatchToProps = dispatch => {
    return {
        closeEdit: () => dispatch(actions.closeEditProduct())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);