import React, { useState, Fragment } from 'react';
import classes from './Negocio.module.scss';
import Products from './Products/Products';
import { connect } from 'react-redux';
import { NavLink }  from 'react-router-dom';
import { ReactComponent as Camera } from '../../assets/camera.svg'
import Button from '../../../UI/Button/Button';
import * as actions from '../../../../store/actions';
import EditProduct from './EditProduct/EditProduct';
import AddProduct from './AddProduct/AddProduct';

const Negocio = props => {
    const imageUrl = 'https://c8.alamy.com/compes/t20754/la-ilustracion-muestra-una-casa-pequena-hecho-en-un-estilo-de-dibujos-animados-aislado-sobre-fondo-blanco-t20754.jpg';
    const [desc, setDesc] = useState(props.selectedNegocio.desc);


    let blur = '';
    let negocio = '';
    if (props.editMode) {
        blur = 'blur';
        negocio = 'editSize'
    }

    const verifyChanges = () => {
        if (desc !== props.selectedNegocio.desc) {
            props.saveChanges(desc);
        } else {
            props.closeEditMode();
        }
    }

    return (
        <Fragment>
            {props.editProductMode && <EditProduct />}
            <div className={[classes.negocio, classes[negocio]].join(' ')} >
                <div className={classes.header} >
                    {props.editMode ? <Camera className={[classes.fotoNegocio, classes['camera']].join(' ')} /> : <img
                        className={[classes.fotoNegocio, classes[blur]].join(' ')}
                        alt='foto del negocio'
                        src={imageUrl}
                    />}
                    {props.editMode ? <textarea value={desc} onChange={(event) => setDesc(event.target.value)} />
                        : <p>{props.selectedNegocio.desc}</p>
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
        </Fragment>
    )
};

const mapStateToProps = state => {
    return {
        editMode: state.negocio.editMode,
        selectedNegocio: state.negocio.selectedNegocio,
        editProductMode: state.negocio.editProduct,
        addProductClicked: state.negocio.addProductClicked
    }
}

const mapDispatchToProps = {
        saveChanges: actions.saveChanges,
        closeEditMode: actions.closeEditMode,
        clickAddProduct: actions.clickAddProduct
}

export default connect(mapStateToProps, mapDispatchToProps)(Negocio); 