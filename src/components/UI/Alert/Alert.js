import React, { useEffect, useState } from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';

import './Alert.scss';


//posible title values: 
//Error
//Warning
//Info
//Success



const AlertComponent = props => {
    const { isActive, closeAlert } = props
    const [isActived, setIsActived] = useState(isActive);


    useEffect(() => {
        if (isActive) {
            setTimeout(() => {
                if (isActived) {
                    closeAlert();
                }
            }, 3000);
            setIsActived(false);
        }


    }, [setIsActived, isActived, isActive, closeAlert])


    return (
        < Alert className={`alert ${props.clase}`
        } severity={props.title.toLowerCase()} >
            <AlertTitle>{props.title}</AlertTitle>
            {props.children}
        </Alert >
    )
}


export default AlertComponent;