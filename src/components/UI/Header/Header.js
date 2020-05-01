import React, { Fragment, useState } from 'react';
import classes from './Header.module.scss';
import { ReactComponent as Burguer } from './burguer.svg';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

const Header = props => {

    let displayB = false
    let space = ""
    if (window.location.pathname === 'Registro' || window.location.pathname === 'Registro' ) {
        displayB = true
        space = " space"
    }

    return (
        <Fragment>
            <div className={classes.header}>
                {displayB && <Burguer className={classes.header_burguer} onClick={() => props.onClickBurguer()} />}
                <div className={classes.header_title}>MÉXICO EN CASA</div>
                <img className={classes.header_logo} alt='Mexico En Casa Logo' src='../logo.png' />
            </div>
        </Fragment>
    )
}


const mapDispatchToProps = dispatch => {
    return {
        onClickBurguer: () => dispatch(actions.burguerHandler()),
    }
}


export default connect(null, mapDispatchToProps)(Header);