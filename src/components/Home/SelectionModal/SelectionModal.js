import React from 'react';
import { NavLink } from 'react-router-dom';

import Button from '../../UI/Button/Button';

import './SelectionModal.scss';

const SelectionModal = props => {
    return (
        props.show ? 
            <div className='modal-container'>
                <div className="modal-container__button">
                    <Button btnType='Success'><NavLink to='/Registro'>Negocio</NavLink></Button>
                    <Button btnType='Success'><NavLink to='/RegistroCliente'>Cliente</NavLink></Button>
                </div>
            </div>: null
    );

}


export default SelectionModal;
