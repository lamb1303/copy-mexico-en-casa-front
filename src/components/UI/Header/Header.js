import React, { Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import classes from './Header.module.scss';
import { ReactComponent as Burguer } from './burguer.svg';
import { ReactComponent as Logo } from '../../../assets/logo.svg';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as actions from '../../../store/actions';

const Header = props => {

    const location = useLocation();

    let space = ""
    let displayB = true;
    const displayH = location.pathname !== '/Home';
    if (location.pathname === '/Registro' || location.pathname === '/RegistroCliente') {
        displayB = false
        space = 'space'
    }

    return (
        <Fragment>
            {displayH && <div className={[classes.header, classes[space]].join(' ')}>
                {displayB && <Burguer className={classes.header_burguer} onClick={() => props.onClickBurguer()} />}
                <div className={classes.header_title}>MÉXICO EN CASA</div>
                <NavLink to={{pathname: "/Home"}}>
                    <Logo className={classes.header_logo} alt='Mexico En Casa Logo' />
                </NavLink>

            </div>}
        </Fragment>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        onClickBurguer: () => dispatch(actions.burguerHandler()),
    }
}


export default connect(null, mapDispatchToProps)(Header);