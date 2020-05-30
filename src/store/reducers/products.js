// import * as actionTypes from '../actions/actionTypes';
// import { updateObject } from '../utility';

const initialState = {
    products: [
        {
            name: 'Amborguesa',
            description: 'amborgesa con papas a la francesa ricas',
            img: 'https://cdn2.cocinadelirante.com/sites/default/files/styles/gallerie/public/images/2018/05/receta-de-gorditas-rellenas-facil2.jpg',
            price: 45
        },
        {
            name: 'Taquitos',
            description: 'taquitos con refresco grande',
            img: 'https://cdn2.cocinadelirante.com/sites/default/files/styles/gallerie/public/images/2018/05/receta-de-gorditas-rellenas-facil2.jpg',
            price: 35
        },
        {
            name: 'Gorditas',
            description: 'gorditas de charron y picadillos',
            img: 'https://cdn2.cocinadelirante.com/sites/default/files/styles/gallerie/public/images/2018/05/receta-de-gorditas-rellenas-facil2.jpg',
            price: 12
        },
        {
            name: 'Torta',
            description: 'Tortas de pollo y jamon con queso',
            img: 'https://cdn2.cocinadelirante.com/sites/default/files/styles/gallerie/public/images/2018/05/receta-de-gorditas-rellenas-facil2.jpg',
            price: 28
        },
        {
            name: 'Pizza',
            description: 'Pizza de pepperoni, jamon y chorizo con champiñones',
            img: 'https://cdn2.cocinadelirante.com/sites/default/files/styles/gallerie/public/images/2018/05/receta-de-gorditas-rellenas-facil2.jpg',
            price: 199
        }
    ]
}

// const getProducts = (state, action) => {
//     return updateObject(state, {

//     })
// }

const reducer = (state = initialState, action) => {
    switch (action.type) {

        default: return state;
    }
}


export default reducer;