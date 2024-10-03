import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../herramientas/clienteAxios';

// Async thunks for handling asynchronous logic
export const getCart = createAsyncThunk('cart/getCart', async () => {
    const response = await axiosClient('/cart');
    //console.log("retornando datos de carrito", response)
    return response.data;
});

export const addToCart = createAsyncThunk('cart/addToCart', async ({ product, user }) => {
    console.log("addTocart slice", product, user)
    const payload = { ...product, user }; // Incluye el usuario en el payload
    const response = await axiosClient.post('/cart', payload);
    console.log(response)
    return response.data;
});

export const deleteOneCart = createAsyncThunk('cart/deleteOne', async (prodId) => {
    const response = await axiosClient.delete(`/cart/${prodId}`);
    return response.data;
});

export const deleteAllFromCart = createAsyncThunk('cart/deleteAll', async () => {
    const response = await axiosClient.delete('/cart/');
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
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCart.fulfilled, (state, action) => {
                state.items = action.payload;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
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
