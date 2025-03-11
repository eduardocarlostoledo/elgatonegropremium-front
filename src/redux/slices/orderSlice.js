import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../herramientas/clienteAxios";

// Async thunks for handling asynchronous logic
export const addAllOrders = createAsyncThunk(
    "orders/addAll",
    async (_, { rejectWithValue }) => {  // Aquí agrego "_"
      try {
        console.log("Fetching all orders...");  // Agrega este log
        const response = await axiosClient.get("/order/");
        console.log("Response:", response.data);  // Muestra la respuesta
        return response.data;
      } catch (error) {
        console.error("Error fetching orders:", error.response?.data);  // Agrega log de error
        return rejectWithValue(error.response?.data);
      }
    }
  );
  

export const getAllShopping = createAsyncThunk(
  "orders/getAllShopping",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get("/order/pays");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const orderById = createAsyncThunk(
  "orders/getById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/order/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const orderByUser = createAsyncThunk(
  "order/getorderclient/getByUser",
  async (cartUserId, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(
        `/order/getorderclient/${cartUserId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const orderByEmail = createAsyncThunk(
  "orders/getByEmail",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/order/${email}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Define the slice
const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    AllOrders: [],
    allShopping: [],
    orderDetail:  [],
    ordersByUser: [],
    ordersByEmail: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Acciones síncronas si es necesario
  },
  extraReducers: (builder) => {
    builder
    .addCase(orderByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(orderByUser.fulfilled, (state, action) => {
        //console.log("Orders by user response:", action.payload);
        state.ordersByUser = Array.isArray(action.payload)
          ? action.payload
          : [];
        state.loading = false;
      })
      .addCase(orderByUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
    .addCase(addAllOrders.fulfilled, (state, action) => {
        console.log("Add all orders fulfilled");
        state.AllOrders =Array.isArray(action.payload)
        ? action.payload
        : [];
      state.loading = false;
      })
      .addCase(addAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })      
      .addCase(addAllOrders.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(getAllShopping.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllShopping.fulfilled, (state, action) => {
        state.allShopping = action.payload;
        state.loading = false;
      })
      .addCase(getAllShopping.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(orderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(orderById.fulfilled, (state, action) => {
        state.orderDetail = action.payload;
        state.loading = false;
      })
      .addCase(orderById.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      
      .addCase(orderByEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(orderByEmail.fulfilled, (state, action) => {
        state.ordersByEmail = action.payload;
        state.loading = false;
      })
      .addCase(orderByEmail.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

// Export the reducer
export default ordersSlice.reducer;
