import React from 'react';

import { connect } from 'react-redux';
import * as actions from '../../../store/actions/';

import Button from '../../UI/Button/Button';

import './SelectionModal.scss';

const SelectionModal = props => {
    console.log(props.show);
    return (
        props.show ? 
            <div className='modal-container'>
                <div className="modal-container__button">
                    <Button btnType='Success' clicked={ () => props.clickOnBusiness()}>Negocio</Button>
                    <Button btnType='Success' clicked={ () => props.clickOnCustomer()}>Cliente</Button>
                </div>
            </div>: null
    );

}

const mapStateToProps = state => {
    return {
        businessCliked: state.selectionModal.businessCliked,
        customerCliked: state.selectionModal.customerCliked
    }
}

const mapDispatchToProps = dispatch => {
    return {
        clickOnBusiness: () => dispatch(actions.clickOnBusiness()),
        clickOnCustomer: () => dispatch(actions.clickOnCustomer())

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectionModal);
