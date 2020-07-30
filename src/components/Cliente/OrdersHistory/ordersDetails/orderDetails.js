import React, { useEffect } from 'react'
import "./orderDetails.scss"
import { connect } from 'react-redux';
import { ReactComponent as PinLoc } from './../../../Negocio/assets/pin.svg';
import { ReactComponent as Phone } from './../../../Negocio/assets/phone.svg';
import * as actions from '../../../../store/actions'
import Prepare from './../../../../assets/orden/Prepare.svg'
import Deliver from './../../../../assets/orden/ready.svg'
import Received from './../../../../assets/orden/received.svg'
import GoForFood from './../../../../assets/orden/goForFood.svg'
import FoodLove from './../../../../assets/orden/FoodLove.svg'
import Button from '../../../UI/Button/Button';

const OrderDetails = props => {
    const { clientGetBusinessInfo, idBusiness, businessInfo, stage, isToTake } = props

    useEffect(() => {
        clientGetBusinessInfo(idBusiness)
    }, [clientGetBusinessInfo, idBusiness]);

    const businessName = businessInfo.businessName
    const lat = businessInfo.lat
    const lng = businessInfo.lng
    const mobile = businessInfo.mobile
    let statusAnimation;
    switch (stage) {
        case 'Recibida por el negocio':
            statusAnimation = <object alt className="negocio_imagen" data={Received} >Recibida </object>
            break;

        case 'Preparando tu pedido':
            statusAnimation = <object className="negocio_imagen" data={Prepare} > Preparada</object>
            break;

        case !isToTake && 'Tu pedido esta listo!':
            statusAnimation = <object className="negocio_imagen" data={Deliver} >Lista</object>
            break;

        case isToTake && 'Tu pedido esta listo!':
            statusAnimation = <object className="negocio_imagen" data={GoForFood} >Lista</object>
            break;

        case 'Pedido Entregado':
            statusAnimation = <object className="negocio_imagen" data={FoodLove} >Entregado</object>
            break;

        default: statusAnimation = <object className="negocio_imagen" data={Received} >Recibida</object>
            break;
    }

    return (
        <div className="modal" onLoad={window.scroll(-50, 50)}>
            <h2>Negocio: {businessName}</h2>
            {
                statusAnimation
            }
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