import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../herramientas/clienteAxios';

// Async thunks for handling asynchronous logic
export const getAllProducts = createAsyncThunk('products/getAll', async () => {
    const response = await axiosClient.get('/products');
    return response.data;
});

export const getAdminProducts = createAsyncThunk('products/getAdmin', async () => {
    const response = await axiosClient.get('/products/ForAdmin');
    return response.data;
});

export const getAllProductsName = createAsyncThunk('products/getAllByName', async (name) => {
    const response = await axiosClient.get(`/products/?name=${name}`);
    return response.data;
});

export const getProductDetail = createAsyncThunk('products/getDetail', async (name) => {
    //console.log(name)
    const response = await axiosClient.get(`/products/${name}`);
    console.log(response)
    return response.data.data[0]; // Asegúrate de devolver el objeto correcto
});

export const createProduct = createAsyncThunk('products/create', async (payload) => {
    const response = await axiosClient.post('/products', payload);
    return response.data; // Asegúrate de devolver los datos del nuevo producto
});

export const updateProduct = createAsyncThunk('products/update', async ({ id, payload }) => {
    const response = await axiosClient.put(`/products/${id}`, payload);
    return response.data; // Devuelve los datos actualizados
});

export const banOrUnbanProd = createAsyncThunk('products/banOrUnban', async (id) => {
    await axiosClient.put(`/products/ban/${id}`);
    return id; // Devuelve el ID para actualizar el estado
});

export const getAllBrands = createAsyncThunk('products/getAllBrands', async () => {
    const response = await axiosClient.get('/products/brands');
    return response.data;
});

export const getAllTypes = createAsyncThunk('products/getAllTypes', async () => {
    const response = await axiosClient.get('/products/types');
    return response.data;
});

export const getPage = createAsyncThunk('products/getPage', async ({ page, brand, type, price }) => {
    const response = await axiosClient.get(`/filter?page=${page}&brand=${brand}&type=${type}&price=${price}`);
    return response.data;
});

// Acción asincrónica para agregar una reseña
export const addReview = createAsyncThunk(
    'products/addReview',
    async ({ id, payload }, { rejectWithValue }) => {
      try {
        const response = await axiosClient.put(`${import.meta.env.VITE_APP_BACK}/products/review/${id}`, payload);
        return response.data;  // Retorna los datos si es exitoso
      } catch (error) {
        return rejectWithValue(error.response.data);  // Maneja el error
      }
    }
  );

// Define the slice
const productsSlice = createSlice({
    name: 'products',
    initialState: {
        allProducts: [],
        productDetail: {},
        brands: [],
        types: [],
        update: false,
        filteredProducts: [],        
        isLoading: false,
        error: null,
    },
    reducers: {
        filterByBrands(state, action) {
            // Filtra los productos por marca
            state.filteredProducts = state.allProducts.filter(product => product.brand === action.payload);
        },
        filterByType(state, action) {
            // Filtra los productos por tipo
            state.filteredProducts = state.allProducts.filter(product => product.type === action.payload);
        },
        filterByPrice(state, action) {
            // Filtra los productos por precio
            const { min, max } = action.payload;
            state.filteredProducts = state.allProducts.filter(product => product.price >= min && product.price <= max);
        },
        clearFilters(state) {
            // Limpia los filtros aplicados
            state.filteredProducts = state.allProducts;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.allProducts = action.payload;
                state.filteredProducts = action.payload; // Inicializa los productos filtrados
            })
            .addCase(getAdminProducts.fulfilled, (state, action) => {
                state.allProducts = action.payload;
            })
            .addCase(getAllProductsName.fulfilled, (state, action) => {
                state.allProducts = action.payload;
                state.filteredProducts = action.payload; // Actualiza los productos filtrados
            })
            .addCase(getProductDetail.fulfilled, (state, action) => {
                state.productDetail = action.payload; // Almacena los detalles del producto
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.allProducts.push(action.payload); // Agrega el nuevo producto a la lista
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.allProducts.findIndex(product => product.id === action.payload.id);
                if (index !== -1) {
                    state.allProducts[index] = action.payload; // Actualiza el producto existente
                }
            })
            .addCase(banOrUnbanProd.fulfilled, (state, action) => {
                // Aquí puedes manejar la lógica para banear o desbanear el producto
                const index = state.allProducts.findIndex(product => product.id === action.payload);
                if (index !== -1) {
                    state.allProducts[index].banned = !state.allProducts[index].banned; // Alterna el estado de baneado
                }
            })
            .addCase(getAllBrands.fulfilled, (state, action) => {
                state.brands = action.payload;
            })
            .addCase(getAllTypes.fulfilled, (state, action) => {
                state.types = action.payload;
            })
            .addCase(getPage.fulfilled, (state, action) => {
                state.filteredProducts = action.payload; // Actualiza los productos filtrados con la página obtenida
            })
            //revisiones de usuarios
            .addCase(addReview.pending, (state) => {
                state.isLoading = true;
                state.error = null;  // Limpiar errores previos
              })
              .addCase(addReview.fulfilled, (state, action) => {
                state.isLoading = false;
                // Encuentra el producto que corresponde y actualiza su reseña
                const product = state.allProducts.find(product => product.id === action.meta.arg.id);
                if (product) {
                  // Si ya hay reseñas, las añadimos
                  if (product.reviews) {
                    product.reviews.push(action.payload);
                  } else {
                    // Si no hay reseñas, las inicializamos
                    product.reviews = [action.payload];
                  }
                }
              })
              .addCase(addReview.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;  // Guardar el error en caso de que falle
              });
          
    },
});

// Export actions and reducer
export const { filterByBrands, filterByType, filterByPrice, clearFilters } = productsSlice.actions;
export default productsSlice.reducer;
