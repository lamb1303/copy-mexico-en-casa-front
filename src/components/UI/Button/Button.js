import React from 'react';
import classes from './Button.module.scss';

const button = (props) => (
    <button
        style={props.style}
        disabled={props.disabled}
        onClick={props.clicked}
        className={[classes.Button, classes[props.btnType]].join(' ')}
    >{props.children}</button>
);

export default button;