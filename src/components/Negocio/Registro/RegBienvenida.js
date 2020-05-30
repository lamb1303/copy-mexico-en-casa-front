import React from 'react';
import Card from '../../UI/Card/Card';
import * as actions from '../../../store/actions';
import Button from '../../UI/Button/Button';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import classes from './RegBienvenida.module.css';

const RegBienvenida = props => {
    return <div className={classes.bienvenida} >
        <Card>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </Card>
        <div className={classes.buttons} >
            <Button btnType='Success' clicked={() => props.goToPersonal()} >
                CONTINUAR
            </Button>
            <Button btnType='Danger' >
                <NavLink to='/Home' activeClassName={classes.active} >
                    CANCELAR
                </NavLink>
            </Button>
        </div>
    </div>
};

const mapDispatchToProps = dispatch => {
    return {
        goToPersonal: () => dispatch(actions.goToPersonal())
    }
}

export default connect(null, mapDispatchToProps)(RegBienvenida);