import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoggedIn: localStorage.getItem('accessToken') === 'true',
    name: '',
    email: '',
    mobile: '',
    image: '',
}

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        updateAdmin: (state, action) => {
            let { name, email, mobile, image } = action.payload;
            if (name) state.name = name;
            if (email) state.email = email;
            if (mobile) state.mobile = mobile;
            if (image) state.image = image;
        },
        logdedInAdmin: (state, action) => {
            localStorage.setItem('type', 'admin');
            localStorage.setItem('isLogedIn', 'true');

            let { name, email, mobile, image } = action.payload;
            if (name) state.name = name;
            if (email) state.email = email;
            if (mobile) state.mobile = mobile;
            if (image) state.image = image;
            state.isLoggedIn = true;

        },
        logdedOutAdmin: (state) => {
            localStorage.removeItem('type');
            localStorage.removeItem('isLogedIn');
            state.name = '';
            state.email = '';
            state.mobile = '';
            state.image = '';
            state.isLoggedIn = false;

        }
    },
})

// Action creators are generated for each case reducer function
export const { updateAdmin, logdedInAdmin, logdedOutAdmin } = adminSlice.actions

export default adminSlice.reducer