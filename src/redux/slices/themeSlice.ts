import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isMenuOpen: JSON.parse(localStorage.getItem('isMenuOpen') || 'true'), // Carrega do localStorage ou usa true como padrão
    currentPageTitle: 'Dashboard',
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleMenu(state: any) {
            state.isMenuOpen = !state.isMenuOpen; // Alterna o estado do menu
            localStorage.setItem('isMenuOpen', JSON.stringify(state.isMenuOpen)); // Salva no localStorage
        },
        setMenuState(state: any, { payload }: { payload: { isMenuOpen: boolean } }) {
            const { isMenuOpen } = payload;
            state.isMenuOpen = isMenuOpen; // Define explicitamente o estado do menu
            localStorage.setItem('isMenuOpen', JSON.stringify(isMenuOpen)); // Salva no localStorage
        },
        setCurrentPageTitle(state: any, { payload }: { payload: { title: string } }) {
            const { title } = payload;
            state.currentPageTitle = title; // Define o título da página atual
        },
    },
});

export const { toggleMenu, setMenuState, setCurrentPageTitle } = uiSlice.actions;
export default uiSlice.reducer;