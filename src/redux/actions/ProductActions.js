import axios from "axios";
export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";
export const GET_ALL_PRODUCTS_NAME="GET_ALL_PRODUCTS_NAME"
export const GET_PRODUCT_DETAIL = "GET_PRODUCT_DETAIL";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT='UPDATE_PRODUCT';
export const GET_ALL_BRANDS= 'GET_ALL_BRANDS';
export const GET_ALL_TYPES= 'GET_ALL_TYPES';
export const GET_PAGE = 'GET_PAGE';
export const FILTER_BY_BRAND = 'FILTER_BY_BRAND';
export const FILTER_BY_TYPE = 'FILTER_BY_TYPE';
export const FILTER_PRECIO = 'FILTER_PRECIO';
export const ADD_REVIEW = 'ADD_REVIEW';
axios.defaults.baseURL = `${process.env.REACT_APP_BACK}`;

export const getAllProducts = () => async (dispatch) => {    
    try {      
      const response = await axios(`${process.env.REACT_APP_BACK}/products`);
      dispatch({ type: GET_ALL_PRODUCTS, payload: response.data });
   } catch (error) {
      console.error("Error en la solicitud:", error.message);
   }   
}

//`${process.env.REACT_APP_BACK}/`

export const getAdminProducts = () => async (dispatch) => {
    try {
        return await axios(`${process.env.REACT_APP_BACK}/products/ForAdmin`).then(r=>
            dispatch({type: GET_ALL_PRODUCTS, payload:r.data}))
    } catch (error) {
            console.log(error)
    }
}

export const getAllProductsName =(name)=>async (dispatch)=>{
  try {
    return await axios(`${process.env.REACT_APP_BACK}/products?name=${name}`).then((r)=>
      dispatch({type:GET_ALL_PRODUCTS_NAME, payload: r.data}))
  } catch (error) {
    console.log(error)
  }
}

export const getAllProductsNameForAdmin = (name) => async (dispatch)=>{
  try {
    return await axios(`${process.env.REACT_APP_BACK}/products/ForAdmin?name=${name}`).then((r)=>
      dispatch({type:GET_ALL_PRODUCTS_NAME, payload: r.data}))
  } catch (error) {
    console.log(error)
  }
}

export const getProductDetail = (name) => async (dispatch) => {
  return await axios.get(`${process.env.REACT_APP_BACK}/products/${name}`).then(r=>
    dispatch({type: GET_PRODUCT_DETAIL, payload:{...r.data.data[0]}}))
};


export const createProduct =  (payload)=> async(dispatch)=>{
  return await axios.post(`${process.env.REACT_APP_BACK}/products`,payload).then(r=>
  dispatch({type: CREATE_PRODUCT, payload}))
};



// export const updateProduct= (id,payload)=> async()=>{
//     return await axios.put(`${process.env.REACT_APP_BACK}/products/${id}`,payload)
// };

export const updateProduct = (id, payload) => async (dispatch) => {
  try {
      const response = await axios.put(`${process.env.REACT_APP_BACK}/products/${id}`, payload);
      dispatch({ type: UPDATE_PRODUCT, payload: response.data }); // Despacha los datos actualizados
  } catch (error) {
      console.error("Error al actualizar el producto:", error.message);
  }
};



// export const banOrUnbanProd= (id)=> async()=>{
//     return await axios.put(`${process.env.REACT_APP_BACK}/products/ban/${id}`)
// };

export const banOrUnbanProd = (id) => async (dispatch) => {
  try {
      await axios.put(`${process.env.REACT_APP_BACK}/products/ban/${id}`);
      // Puedes despachar una acción indicando éxito o actualizar el estado según sea necesario
  } catch (error) {
      console.error("Error al bloquear/desbloquear el producto:", error.message);
  }
};



// export const getAllBrands = () => {
//   return async function(dispatch){
//     const json = await axios.get(`${process.env.REACT_APP_BACK}/products/brands`)
//     return dispatch({type: GET_ALL_BRANDS, payload: json.data})
//   }
// }

export const getAllBrands = () => async (dispatch) => {
  try {
      const response = await axios.get(`${process.env.REACT_APP_BACK}/products/brands`);
      dispatch({ type: GET_ALL_BRANDS, payload: response.data });
  } catch (error) {
      console.error("Error al obtener las marcas:", error.message);
  }
};


// export const getAllTypes = () => {
//   return async function(dispatch){
//     const json = await axios.get(`${process.env.REACT_APP_BACK}//products/types`)
//     return dispatch({type: GET_ALL_TYPES, payload: json.data})
//   }
// }

export const getAllTypes = () => async (dispatch) => {
  try {
      const response = await axios.get(`${process.env.REACT_APP_BACK}/products/types`);
      dispatch({ type: GET_ALL_TYPES, payload: response.data });
  } catch (error) {
      console.error("Error al obtener los tipos:", error.message);
  }
};


// export const getPage = (page,brand,type,price) => async (dispatch) => {
//   return await axios.get(`localhost:3001/filter?page=${page}&brand=${brand}&type=${type}&price=${price}`)
//   .then(r => dispatch({ type : GET_PAGE, payload : r}))
//   .catch(e => console.error(e))

// }

// export const getPage = (page,brand,type,price) => {
//   return async function(dispatch) {
//     const json = await axios.get(`${process.env.REACT_APP_BACK}/filter?page=${page}&brand=${brand}&type=${type}&price=${price}`)
//     console.log(json)
//     return dispatch({type: GET_PAGE, payload: json.data})
//   }
// }

export const getPage = (page, brand, type, price) => async (dispatch) => {
  try {
      const response = await axios.get(`${process.env.REACT_APP_BACK}/filter?page=${page}&brand=${brand}&type=${type}&price=${price}`);
      dispatch({ type: GET_PAGE, payload: response.data });
  } catch (error) {
      console.error("Error al obtener datos de la página:", error.message);
  }
};


export const filterByBrands = (payload) => {
  return { type: FILTER_BY_BRAND, payload}
}

export const filterByType = (payload) => {
  return { type: FILTER_BY_TYPE, payload}
}

export const filterByPrice = (payload) => {
  return { type: FILTER_PRECIO, payload}
}

export const addReview=(id,payload) =>async(dispatch) => {
  return await axios.put(`${process.env.REACT_APP_BACK}/products/review/${id}`,payload).then(r=>
  dispatch({type: ADD_REVIEW, payload}))
}