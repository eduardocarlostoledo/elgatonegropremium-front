import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../herramientas/clienteAxios';

// Async thunks for handling asynchronous logic
export const addAllOrders = createAsyncThunk('orders/addAll', async () => {
    const response = await axiosClient.get('/order');
    return response.data;
});

export const getAllShopping = createAsyncThunk('orders/getAllShopping', async () => {
    const response = await axiosClient.get('/order/pays');
    return response.data;
});

export const orderById = createAsyncThunk('orders/getById', async (id) => {
    const response = await axiosClient.get(`/order/${id}`);
    return response.data;
});

export const orderByUser = createAsyncThunk('orders/getByUser', async (cartUserId) => {
    const response = await axiosClient.get(`/order/${cartUserId}`);
    return response.data;
});

export const orderByEmail = createAsyncThunk('orders/getByEmail', async (email) => {
    const response = await axiosClient.get(`/order/${email}`);
    return response.data;
});

// Define the slice
const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        allOrders: [],
        allShopping: [],
        orderDetail: {},
        ordersByUser: [],
        ordersByEmail: [],
    },
    reducers: {
        // Aquí puedes agregar acciones síncronas si es necesario
    },
    extraReducers: (builder) => {
        builder
            .addCase(addAllOrders.fulfilled, (state, action) => {
                state.allOrders = action.payload;
            })
            .addCase(getAllShopping.fulfilled, (state, action) => {
                state.allShopping = action.payload;
            })
            .addCase(orderById.fulfilled, (state, action) => {
                state.orderDetail = action.payload;
            })
            .addCase(orderByUser.fulfilled, (state, action) => {
                state.ordersByUser = action.payload;
            })
            .addCase(orderByEmail.fulfilled, (state, action) => {
                state.ordersByEmail = action.payload;
            });
    },
});

// Export the reducer
export default ordersSlice.reducer;
