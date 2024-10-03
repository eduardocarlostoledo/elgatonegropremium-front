import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../herramientas/clienteAxios';

// Async thunks for handling asynchronous logic
export const getAllUsers = createAsyncThunk('users/getAll', async () => {
    const response = await axiosClient.get('/users');
    return response.data.data;
});

export const getUserById = createAsyncThunk('users/getById', async (id) => {
    const response = await axiosClient.get(`/users/${id}`);
    return response.data.data;
});

export const userRegister = createAsyncThunk(
    'users/register',
    async (payload, { rejectWithValue }) => {
        try {
            console.log("vengo al slice de user register")
            const response = await axiosClient.post('/users/register', payload);
            console.log("recibo respuesta de back", response)
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const userLogin = createAsyncThunk('users/login', async (payload) => {
    console.log("logueando", payload)
    const response = await axiosClient.post('/users/login/', payload);
    console.log("rta del backend", response)
    return response;
});

//esto retorna el listado completo de usuarios
export const getFiltersForEmail = createAsyncThunk('users/getEmail', async () => {
    const response = await axiosClient.get('/users');
    console.log("getFiltersForEmail", response)
    return response.data;
});

export const userActive = createAsyncThunk('users/userActive', async (payload) => {
    //console.log("se ha seteado useractive slice", payload.email)
    return payload;
});

export const changeNav = createAsyncThunk('users/changeNav', async () => {
    //console.log("se ha seteado changenav slice")
    return true;
});

export const putUser = createAsyncThunk('users/update', async (payload) => {
    const response = await axiosClient.put(`/users/${payload.id}`, payload);
    return response;
});

export const putUserProfile = createAsyncThunk('users/updateProfile', async ({ payload, id }) => {
    const user = await axiosClient.put(`/users/${id}`, payload);
    const cacho = await axiosClient.get(`/users/${id}`);
    localStorage.setItem('USUARIO', JSON.stringify(cacho.data.data));
    return user;
});

export const postUsersGoogle = createAsyncThunk('users/postGoogle', async (payload) => {
    const response = await axiosClient.post('/users/google/', payload);
    return response;
});

export const loginGoogle = createAsyncThunk('users/loginGoogle', async (payload) => {
    const response = await axiosClient.post('/users/loginGoogle', payload);
    return response.data;
});

export const getAllUsersName = createAsyncThunk('users/getAllByName', async (name) => {
    const response = await axiosClient.get(`/users?name=${name}`);
    return response.data.data;
});

// Define the slice
const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        userDetail: {},
        emails: [],
        status: null,
        error: null,
        userActive: {},
        ChangeNav: JSON.parse(localStorage.getItem('Navbar')) || false,
    },
    reducers: {
        deleteUserLocalStorage(state) {
            state.ChangeNav = true; // Cambia el estado según la lógica que necesites
            localStorage.setItem('Navbar', JSON.stringify(true));
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(userRegister.fulfilled, (state, action) => {
                state.status = 'success';
                state.emails.push(action.payload.email); // Añadimos el nuevo email al estado
            })
            .addCase(userRegister.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.users = action.payload;
            })
            .addCase(getUserById.fulfilled, (state, action) => {
                state.userDetail = action.payload;
            })
            .addCase(getFiltersForEmail.fulfilled, (state, action) => {
                state.emails = action.payload;
            })
            .addCase(userActive.fulfilled, (state, action) => {
                state.userActive = action.payload;
            })
            .addCase(changeNav.fulfilled, (state) => {
                state.ChangeNav = false; // Cambia según la lógica que necesites
                localStorage.setItem('Navbar', JSON.stringify(false));
            })
            .addCase(getAllUsersName.fulfilled, (state, action) => {
                state.users = action.payload;
            });
    },
});

// Export the actions and reducer
export const { deleteUserLocalStorage } = usersSlice.actions;
export default usersSlice.reducer;