import React, { Fragment } from 'react'
import classes from './Product.module.scss';
import { ReactComponent as Edit } from '../../../assets/edit.svg';
import { connect } from 'react-redux';

const Product = props => {
    return (
        <Fragment>
            <hr />
            <div className={classes.product} >
                <div className={classes.showedOptions} >
                    <img className={classes.product_image} src={props.img} alt={`imagen de ${props.name}`} />
                    <div className={classes.product_desc} >
                        {props.desc}
                        <div>
                            ${props.price}
                        </div>
                    </div>
                    {props.editMode && <Edit className={classes.editIcon} />}
                </div>
            </div>
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        editMode: state.negocio.editMode,
    }
}


export default connect(mapStateToProps)(Product);