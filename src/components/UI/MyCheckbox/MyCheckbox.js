import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import './MyCheckbox.scss'

const MyCheckbox = (props) => {

    
    return (
        <FormControlLabel
            control={
                <Checkbox
                    checked={true}
                    //onChange={handleChange}
                    name= {props.name}
                />
            }
            label={props.label}
        />
    )
}

export default MyCheckbox