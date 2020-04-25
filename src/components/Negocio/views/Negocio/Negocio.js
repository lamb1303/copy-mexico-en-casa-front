import React from 'react';
import classes from './Negocio.module.scss';
import Products from './Products/Products';
import { connect } from 'react-redux';
import { ReactComponent as Camera } from '../../assets/camera.svg'

const Negocio = props => {
    const imageUrl = 'https://c8.alamy.com/compes/t20754/la-ilustracion-muestra-una-casa-pequena-hecho-en-un-estilo-de-dibujos-animados-aislado-sobre-fondo-blanco-t20754.jpg';

    let blur = ''
    if (props.editMode) {
        blur = 'blur';
    }

    return (
        <div className={classes.negocio} >
            <div className={classes.header} >
                {props.editMode && <div className={classes.camera} > <Camera /> </div>}
                <img
                    className={[classes.fotoNegocio, classes[blur]].join(' ')}
                    alt='foto del negocio'
                    src={imageUrl}
                />
                <p>Esta es la tienda de la señora tencha! donde vera las mejores tortas jaja</p>
            </div>
            <Products />
        </div>
    )
};

const mapStateToProps = state => {
    return {
        editMode: state.negocio.editMode
    }
}

export default connect(mapStateToProps)(Negocio);