import * as actionTypes from '../actions/actionTypes';
import axios from 'axios';

export const getProducts = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/products`).then(
        response => {
            console.log(response)
        }
    )
    return {
        type: actionTypes.GET_ALL_PRODUCTS
    }
}

