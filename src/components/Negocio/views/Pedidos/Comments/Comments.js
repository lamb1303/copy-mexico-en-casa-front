import React, { useEffect } from 'react';
import { connect } from 'react-redux'

import * as actions from '../../../../../store/actions/';

import Backdrop from '../../../../UI/Backdrop/Backdrop';
import Button from '../../../../UI/Button/Button';

import './Comments.scss';
import { ReactComponent as User } from '../../../assets/user.svg';
import { ReactComponent as Phone } from '../../../assets/phone.svg';
import { ReactComponent as PinLoc } from '../../../assets/pin.svg';
import { ReactComponent as Money } from '../../../assets/money.svg';
import { ReactComponent as Ref } from '../../../assets/reference.svg';


const Comments = props => {
    const { getClientNamePhone } = props;
    const selectedOrder = props.selectedOrder;

    useEffect(() => {
        if (selectedOrder.idCustomer) {
            getClientNamePhone(selectedOrder.idCustomer)
        }
    }, [getClientNamePhone, selectedOrder]);

    const dishes = Object.keys(selectedOrder.orderList).map(prodId => {
        return (
            <div key={prodId} className='pedidoDesc'>
                <h4>{selectedOrder.orderList[prodId].amount}</h4>
                <p><i>{selectedOrder.orderList[prodId].name}</i></p>
                <p><i>{selectedOrder.orderList[prodId].comment}</i></p>
            </div>
        )
    })

    return (
        <>
            <Backdrop show clicked={() => props.closeViewComments()} />
            <div className='comments'>
                <div className='comments-header'>
                    <h3>Informaci&oacute;n</h3>
                </div>
                <div className='comments-customerInfo'>

                    <div className='comments-customerInfo__name'>
                        <p>
                            <User className='comments__icon' />
                            <b>Nombre del cliente:</b>
                            <span> {props.client.name} {props.client.apellidos}</span>
                        </p>
                        <p>
                            <Phone className='comments__icon' />
                            <b>Telef&oacute;no:</b>
                            <span> {props.client.telefono}</span>
                        </p>
                        <p>
                            <Money className='comments__icon' />
                            <b>A Cobrar:</b>
                            <span> {selectedOrder.total} </span>
                        </p>
                        {selectedOrder.reference !== '' &&
                            <p>
                                <Ref className='comments__icon' />
                                <b>Referencia: </b>
                                <span>{selectedOrder.reference}</span></p>
                        }
                    </div>
                    <hr />
                </div>
                <div className='comments-header'>
                    <h3>Comentarios</h3>
                </div>
                <div className='comments-dishes'>
                    {dishes}
                </div>
                <hr />
                <div className='comments__buttons'>
                    {!selectedOrder.isToTake && <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`https://www.google.com/maps/search/?api=1&query=${selectedOrder.location.lat},${selectedOrder.location.lng}`}>
                        <Button btnType='Danger'><PinLoc className='comments__icon'/> Destino</Button>
                    </a>}
                    <Button btnType='Success' clicked={() => props.closeViewComments()}>Regresar</Button>


                </div>
            </div>
        </>
    );
}

const mapStateToProps = state => {
    return {
        client: state.cliente.cliente,
        selectedOrder: state.orders.selectedOrder,
    }
}

const mapDispatchToProps = {
    closeViewComments: actions.closeViewComments,
    getClientNamePhone: actions.getClientNamePhone,


}

export default connect(mapStateToProps, mapDispatchToProps)(Comments);