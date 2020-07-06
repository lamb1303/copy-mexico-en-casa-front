import React, { Fragment } from 'react';
import classes from './Sidebar.module.css';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import Backdrop from '../Backdrop/Backdrop';
import Buttons from '../Buttons/Buttons';

const Sidebar = (props) => {

    let isVisible = "slide_out";
    if (props.showSidebar) {
        isVisible = "slide_in"
    }

    return (
        <Fragment>
            {props.showSidebar && <Backdrop show={props.showSidebar} clicked={() => props.onCloseSidebar()} />}
            <div className={[classes.images, classes[isVisible]].join(' ')} >
                <Buttons />
            </div>
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        showSidebar: state.header.sidebarOpen
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCloseSidebar: () => dispatch(actions.burguerHandler())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);