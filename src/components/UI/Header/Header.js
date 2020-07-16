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
    const displayH = location.pathname !== '/Home' && location.pathname !== '/Mission' && location.pathname !== '/';
    if (location.pathname === '/Registro' || location.pathname === '/RegistroCliente') {
        displayB = false
        space = 'space'
    }

    return (
        <Fragment>
            {displayH && <div className={[classes.header, classes[space]].join(' ')}>
                {displayB && <Burguer className={classes.header_burguer} onClick={() => props.onClickBurguer()} />}
                <div className={classes.header_title}>MÉXICO EN CASA</div>
                <NavLink
                    to={{ pathname: "/Home" }}
                    onClick={props.isCustomer ? () => props.clientClickLogo(): null}>
                    <Logo className={classes.header_logo} alt='Mexico En Casa Logo' />
                </NavLink>

            </div>}
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        isCustomer: state.home.isCustomer
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onClickBurguer: () => dispatch(actions.burguerHandler()),
        clientClickLogo: ()=> dispatch(actions.ClientClickLogo())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Header);