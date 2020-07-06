import React from 'react';

import classes from './Schedule.module.css';

const Schedule = props => {

    const options = () => {
        let arr = [], i, j;
        for (i = 0; i < 24; i++) {
            for (j = 0; j < 2; j++) {
                let hour = (i <= 9 ? "0" + i : i) + ":" + (j === 0 ? "00" : 30 * j);
                arr.push(<option key={Math.random() * (10 - 1) + 2} value={hour}>{hour}</option>)
            }
        }
        return arr
    }

    const option = options();

    

    return (
        <div className={classes.table} >
            <div>Horario de Trabajo</div>
            {props.days && props.days.map(day => {
                return <div className={classes.days} key={day.id} >
                    <input
                        type='checkbox'
                        checked={day.abierto}
                        onChange={(event) => props.setOpen(event.target.checked, day.id)}
                    />
                    <label className={classes.day} >{day.dia}</label>
                    <div className={classes.box}>
                        <select
                            value={day.horaAbierto.length > 0 ? day.horaAbierto : ""}
                            onChange={(event) => props.handleOpen(event.target.value, day)}
                        >
                            {option}
                        </select>
                    </div>
                    <div> - </div>
                    <div className={classes.box}>
                        <select
                            value={day.horaCerrado.length > 0 ? day.horaCerrado : ""}
                            onChange={(event) => props.handleClose(event.target.value, day)}
                        >
                            {option}
                        </select>
                    </div>
                </div>

            })}
        </div>
    )
}

export default Schedule;