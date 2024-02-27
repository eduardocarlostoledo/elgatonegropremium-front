import axios from "axios";

// Define la URL base para las solicitudes
axios.defaults.baseURL = process.env.REACT_APP_BACK;

// Acciones
export const ADD_ALL_ORDERS = 'ADD_ALL_ORDERS';
export const GET_ALL_SHOPPING = 'GET_ALL_SHOPPING';
export const ORDER_BY_ID = 'ORDER_BY_ID';
export const ORDER_BY_USER = 'ORDER_BY_USER';
export const ORDER_BY_EMAIL = 'ORDER_BY_EMAIL';

// Acción para obtener todas las órdenes
export const addAllOrders = () => {
  return async function(dispatch){
    try {
      const json = await axios.get('/order');
      dispatch({type: ADD_ALL_ORDERS, payload: json.data});
    } catch (error) {
      console.error("Error en la solicitud:", error.message);
    }
  };
};

// Acción para obtener todas las compras
export const getAllShopping = () => {
  return async function(dispatch){
    try {
      const buys = await axios.get('/order/pays');
      dispatch({type: GET_ALL_SHOPPING, payload: buys.data});
    } catch (error) {
      console.error("Error en la solicitud:", error.message);
    }
  };
};

// Acción para obtener una orden por ID
export const orderById = (id) => {
  return async function (dispatch){
    try {
      const idOrder = await axios.get(`/order/${id}`);
      dispatch({type: ORDER_BY_ID, payload: idOrder.data});
    } catch (error) {
      console.error("Error en la solicitud:", error.message);
    }
  };
};

// Acción para obtener órdenes por usuario
export const orderByUser = (cartUserId) => {
  return async function (dispatch) {
    try {
      const orderUser = await axios.get(`/order/${cartUserId}`);
      dispatch({type: ORDER_BY_USER, payload: orderUser.data});
    } catch (error) {
      console.error("Error en la solicitud:", error.message);
    }
  };
};

// Acción para obtener órdenes por correo electrónico
export const orderByEmail = (email) => {
  return async function (dispatch){
    try {
      const ideEmail = await axios.get(`/order/${email}`);
      dispatch({type: ORDER_BY_EMAIL, payload: ideEmail.data});
    } catch (error) {
      console.error("Error en la solicitud:", error.message);
    }
  };
};


// import axios from "axios";

// export const ADD_ALL_ORDERS = 'ADD_ALL_ORDERS'; /* todas las ordenes */
// export const GET_ALL_SHOPPING = 'GET_ALL_SHOPPING'; /* todas las compras */
// export const ORDER_BY_ID = 'ORDER_BY_ID'; /* el id de las ordenes */
// export const ORDER_BY_USER = 'ORDER_BY_USER'; /* las ordenes que tiene cada usuario */
// export const ORDER_BY_EMAIL = 'ORDER_BY_EMAIL'

// export const addAllOrders = () => {
//     return async function(dispatch){
//         const json = await axios.get('/order')
//         return dispatch({type: ADD_ALL_ORDERS, payload: json.data})
//     }
// }

// export const getAllShopping = () => {
//     return async function(dispatch){
//         const buys = await axios.get('/order/pays')
//         return dispatch({type: GET_ALL_SHOPPING, payload: buys.data})
//     }
// }

// export const orderById = (id) => {
//     return async function (dispatch){
//         const idOrder = await axios.get(`/order/${id}`)
//         return dispatch({type: ORDER_BY_ID, payload: idOrder.data})
//     }
// }

// export const orderByUser = (cartUserId) => {
//     return async function (dispatch) {
//         const orderUser = await axios.get(`/order/${cartUserId}`)
//         return dispatch({type: ORDER_BY_USER, payload: orderUser.data})
//     }
// }

// export const orderByEmail = (email) => {
//     return async function (dispatch){
//         const ideEmail = await axios.get(`/order/${email}`)
//         return dispatch({type: ORDER_BY_EMAIL, payload: ideEmail.data})
//     }
// }
