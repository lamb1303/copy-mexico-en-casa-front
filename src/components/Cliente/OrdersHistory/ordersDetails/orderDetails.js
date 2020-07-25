import React, { useEffect } from 'react'
import "./orderDetails.scss"
import { connect } from 'react-redux';
import { ReactComponent as PinLoc } from './../../../Negocio/assets/pin.svg';
import { ReactComponent as Phone } from './../../../Negocio/assets/phone.svg';
import * as actions from '../../../../store/actions'
import Button from '../../../UI/Button/Button';

const OrderDetails = props => {
    const { clientGetBusinessInfo, idBusiness, businessInfo } = props

    useEffect(() => {
        clientGetBusinessInfo(idBusiness)
    }, [clientGetBusinessInfo, idBusiness]);

    const businessName = businessInfo.businessName
    const lat = businessInfo.lat
    const lng = businessInfo.lng
    let photoBusiness = businessInfo.photoBusiness
    const mobile = businessInfo.mobile

    if(photoBusiness === 'empty') photoBusiness = 'https://firebasestorage.googleapis.com/v0/b/catalogocovid2020.appspot.com/o/imagen_mexico_en_casa.png?alt=media&token=39bc7063-cb25-4be4-85e3-a6a24c55b7bd';
    return (
        <div className="modal" onLoad={window.scroll(-50, 50)}>
            <h2>Negocio: {businessName}</h2>
            <img className="negocio_imagen" src={photoBusiness} alt="photoBusiness"/>
            <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}>
                <Button btnType='Success'><PinLoc className='comments__icon' /> Mostrar Ubicación</Button>
            </a>
            <a
                target="_blank"
                rel="noopener noreferrer"
                href={`tel:${mobile}`}>
                <Button btnType='Danger'><Phone className='comments__icon' /> Marcar</Button>
            </a>
            <Button style={{
                width: "33%",
                borderRadius: "2em",
            }} clicked={props.showBackDrop} btnType='Success'>Regresar</Button>
        </div>


    )
}
const mapStateToProps = state => {
    return {
        businessInfo: state.cliente.businessInfo,
    }
}

const mapDispatchToProps = {
    clientGetBusinessInfo: actions.clientGetBusinessInfo
}
export default connect(mapStateToProps, mapDispatchToProps)(OrderDetails);