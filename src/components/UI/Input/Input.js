import React from 'react';
import classes from './Input.module.scss';

const Input = props => {

    const rules = (value, type) => {
        switch (type) {
            case 'text': return value.length > 5;
            case 'password': return value.length >= 8;
            case 'email': return /^\S+@\S+\.\S+$/.test(value);
            case 'number': return value.length >= 10;
            default: return false;
        }
    }

    const handleInput = (value) => {

        if (props.input.type === 'number' && value.length >= 11) return;

        const input = {
            ...props.input
        };

        if (!input.touched) input.touched = true;

        input.value = value;
        input.isValid = rules(value, input.type);

        props.setValue(input);
    }

    let isValidStyle;
    if (props.input.isValid) isValidStyle = 'good';
    else {
        if (!props.input.touched) isValidStyle = ''
        else isValidStyle = 'bad'
    }


    return (
        <div className={classes.formElement} >
            <label>{props.input.label}</label>
            {props.input.element === 'input' &&
                <input
                    className={classes[isValidStyle]}
                    type={props.input.type}
                    placeholder={props.input.placeholder}
                    value={props.input.value}
                    onChange={(event) => handleInput(event.target.value)}
                />}
            {props.input.element === 'textarea' &&
                <textarea
                    className={classes[isValidStyle]}
                    placeholder={props.input.placeholder}
                    value={props.input.value}
                    onChange={(event) => handleInput(event.target.value)}
                />}
        </div>
    )
};

export default Input;