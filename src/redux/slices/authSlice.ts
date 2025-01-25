import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: !!localStorage.getItem('token'),
    user: {
        name: localStorage.getItem('name') || null,
        email: localStorage.getItem('email') || null,
        roles: localStorage.getItem('roles') ? JSON.parse(localStorage.getItem('roles') || '[]') : [],
        profile_photo: localStorage.getItem('profile_photo') || null,
    },
    token: localStorage.getItem('token') || null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state: any, { payload }: { payload: { token: string, name: string, email: string, roles: string[]} }) {
            const { token, name, email, roles } = payload;
            localStorage.setItem('token', token);
            localStorage.setItem('name', name);
            localStorage.setItem('email', email);
            localStorage.setItem('roles', JSON.stringify(roles));

            state.token = token;
            state.isAuthenticated = true;
            state.user = {
                name: name,
                email: email,
                roles: roles,
            };
        },
        logout(state: any) {
            localStorage.removeItem('token');
            localStorage.removeItem('name');
            localStorage.removeItem('email');
            localStorage.removeItem('roles');
            localStorage.removeItem('profile_photo');

            state.token = null;
            state.isAuthenticated = false;
            state.user = {
                name: null,
                email: null,
                roles: [],
                profile_photo: null
            };
        },
        setUserData(state: any, { payload }: { payload: { name: string, email: string, roles: string[] } }) {
            const { name, email, roles } = payload;
            state.user.name = name;
            state.user.email = email;
            state.user.roles = roles;

            localStorage.setItem('name', name);
            localStorage.setItem('email', email);
            localStorage.setItem('roles', JSON.stringify(roles)); // Update roles in localStorage
        },
        setToken(state: any, { payload }: { payload: { token: string } }) {
            const { token } = payload;
            localStorage.setItem('token', token);
            state.token = token;
            state.isAuthenticated = true;
        },
    },
});

export const { login, logout, setUserData, setToken } = authSlice.actions;
export default authSlice.reducer;
