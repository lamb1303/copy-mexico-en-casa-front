import React from 'react';
import Card from '../../UI/Card/Card';
import Button from '../../UI/Button/Button';
import * as actions from '../../../store/actions';

import classes from './AvisoPrivacidad.module.css';
import { connect } from 'react-redux';


const AvisoPrivacidad = props => {
    return (
        <div className={classes.aviso} >
            <div className={classes.header} >
                <span>Aviso de Privacidad</span>
            </div>
            <div className={classes.message} >
                <Card>
                    <span>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </span>

                </Card>
            </div>
            <div className={classes.buttons} >
                <Button btnType='Success' >
                    CONTINUAR
                </Button>
                <Button btnType='Danger' clicked={() => props.goToNegPago()} >
                    CANCELAR
                </Button>
            </div>
        </div>
    )
};

const mapDispatchToProps = dispatch => {
    return {
        goToNegPago: () => dispatch(actions.goToNegPago())
    }
}

export default connect(null, mapDispatchToProps)(AvisoPrivacidad);