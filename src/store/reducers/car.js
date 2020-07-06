import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility'


const initialState = {
    client: null,
    car: []
}

const addOneToSelectedProduct = (state, action) => {
    // if (state.car.length < 1) {
    //     const newProd = {
    //         count: 1,
    //         name: action.product
    //     }
    //     return updateObject(state, {
    //         car: [newProd]
    //     })
    // } else {
    //     const oldCar = [...state.car];
    //     const newProductCount = state.car.map(prod => {
    //         if(prod.)
    //     })
    //     return updateObject(state, {

    //     })
    // }
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {

        default: return state;
    }
};

export default reducer;