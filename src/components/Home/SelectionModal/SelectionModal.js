import React from 'react';
import { NavLink } from 'react-router-dom';

import Button from '../../UI/Button/Button';

import './SelectionModal.scss';

const SelectionModal = props => {
    return (
        props.show ?
            <div className='modal-container'>
                <div className="modal-container__button">
                    <NavLink to='/Registro'><Button btnType='Success'>Negocio</Button></NavLink>
                    <NavLink to='/RegistroCliente'><Button btnType='Success'>Cliente</Button></NavLink>
                </div>
            </div> : null
    );

}


export default SelectionModal;
