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
    const photoBusiness = businessInfo.photoBusiness
    const mobile = businessInfo.mobile
    return (
        <div className="modal" onLoad={window.scroll(-50, 50)}>
            <h2>Negocio: {businessName}</h2>
            <img className="negocio_imagen" src={photoBusiness}/>
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