import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

import classes from './Table.module.css';
const Days = props => {

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

    const handleClose = (value, day) => {
        if (day.horaAbierto === "") {
            props.horario(value, 'cerrado', day.id)
        } else {
            if (day.horaAbierto < value) {
                props.horario(value, 'cerrado', day.id)
            } else {
                console.log('El horario de cerrado debe ser mayor al horario de abierto')
            }
        }
    }

    const handleOpen = (value, day) => {
        if (day.horaCerrado === "") {
            props.horario(value, 'abierto', day.id)
        } else {
            if (day.horaCerrado > value) {
                props.horario(value, 'abierto', day.id)
            } else {
                console.log('El horario de abierto debe ser menor al horario de cerrado')
            }
        }
    }


    return (
        props.days.map(day => {
            return (
                <div className={classes.days} key={day.id} >
                    <input
                        type='checkbox'
                        checked={day.abierto}
                        onChange={(event) => props.isOpen(event.target.checked, day.id)}
                    />
                    <label className={classes.day} >{day.dia}</label>
                    <div className={classes.box}>
                        <select
                            value={day.horaAbierto.length > 0 ? day.horaAbierto : ""}
                            onChange={(event) => handleOpen(event.target.value, day)}
                        >
                            {option}
                        </select>
                    </div>
                    <div> - </div>
                    <div className={classes.box}>
                        <select
                            value={day.horaCerrado.length > 0 ? day.horaCerrado : ""}
                            onChange={(event) => handleClose(event.target.value, day)}
                        >
                            {option}
                        </select>
                    </div>
                </div>
            )
        })
    )
};

const Table = props => {
    return <div className={classes.table} >
        <div>Horario de Trabajo</div>
        <Days {...props} />
    </div>
}

const mapStateToProps = state => {
    return {
        days: state.registro.days
    }
}

const mapDispatchToProps = dispatch => {
    return {
        horario: (value, estado, id) => dispatch(actions.handleHorario(value, estado, id)),
        isOpen: (value, id) => dispatch(actions.isOpen(value, id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Table);