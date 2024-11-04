import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../herramientas/clienteAxios';
import { userActive } from './userSlice';

// Async thunks for handling asynchronous logic

export const getCart = createAsyncThunk('cart/getCart', async (userId) => {
    try {
        const response = await axiosClient(`/cart/getcartclient/${userId}`);
        console.log("slice retornando datos de carrito", response.data.data[0])
        return response.data.data[0];    
    } catch (error) {
        throw Error("no se ha podido completar la operacion",error)
    }
    
});

export const addToCart = createAsyncThunk('cart/addToCart', async ({ product, user, amount }) => {
    console.log("addTocart slice", product, user)
    const payload = { ...product, user, amount }; // Incluye el usuario en el payload
    const response = await axiosClient.post('/cart', payload);
    console.log(response)
    return response.data;
});

export const deleteOneCart = createAsyncThunk('cart/deleteOne', async (prodId) => {
    const response = await axiosClient.delete(`/cart/${prodId}`);
    return response.data;
});

export const deleteAllFromCart = createAsyncThunk('cart/deleteAll', async () => {
    const response = await axiosClient.delete('/deletecart/', payload);
    console.log("eliminando carrito CartSlice", response)
    return response.data;
});

export const postCart = createAsyncThunk('cart/postCart', async ({ payload, preferenceId }) => {
    const response = await axiosClient.post('/cart', payload);
    return { cart: response.data, preferenceId };
});

// Define the slice
const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        preferenceId: null,
        update: false,
    },
    reducers: {
        getUpdate(state) {
            state.update = true;
        },
        update(state, action) {
            // Puedes manejar el estado de actualización aquí si es necesario
            state.update = action.payload;
        },
        //cambios carrito 1-11
        addToCart: (state, action) => {
            const { product } = action.payload;
            const existingItem = state.items.find(item => item.prodId === product.prodId);
         
            if (existingItem) {
               // Si el producto ya existe, aumenta la cantidad
               existingItem.amount += product.amount;
            } else {
               // Si el producto no existe, agrégalo al carrito
               state.items.push({ ...product, amount: product.amount });
            }
         },
         //cambios carrito 1-11
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCart.fulfilled, (state, action) => {
                state.items = action.payload;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                console.log("extrareducers", state, action)
                state.items.push(action.payload);
            })
            .addCase(deleteOneCart.fulfilled, (state, action) => {
                state.items = state.items.filter(item => item.id !== action.payload.id);
            })
            .addCase(deleteAllFromCart.fulfilled, (state) => {
                state.items = [];
            })
            .addCase(postCart.fulfilled, (state, action) => {
                state.preferenceId = action.payload.preferenceId;
                // Puedes agregar lógica adicional para manejar el carrito aquí
            });
    },
});

// Export actions and reducer
export const { getUpdate, update } = cartSlice.actions;
export default cartSlice.reducer;
