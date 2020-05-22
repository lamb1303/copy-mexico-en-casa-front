import React from 'react';
import classes from './Table.module.css';

const Days = () => {
    const days = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
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

    const handleChange = (event, day) => {
        console.log(day);
        console.log(event.target.value);
    }

    return (
        days.map(day => {
            return (
                <div className={classes.days} key={day} >
                    <input type='checkbox' />
                    <label className={classes.day} >{day}</label>
                    <div className={classes.box}>
                        <select onChange={(e) => handleChange(e, day)} >
                            {option}
                        </select>
                    </div>
                    <div> - </div>
                    <div className={classes.box}>
                        <select onChange={(e) => handleChange(e, day)} >
                            {option}
                        </select>
                    </div>
                </div>
            )
        })
    )
};

const Table = () => {
    return <div className={classes.table} >
        <div>Horario de Trabajo</div>
        <Days />
    </div>
}

export default Table;