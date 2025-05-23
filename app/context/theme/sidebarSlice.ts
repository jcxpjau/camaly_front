import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'

interface SidebarState {
    isOpen: boolean;
}

const initialState: SidebarState = {
    isOpen: true,
};

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        toggleSidebar(state) {
            state.isOpen = !state.isOpen;
        },
        changeSidebar( state, action: PayloadAction<boolean> ) {
            state.isOpen = action.payload;
        }
    },
});

export const { toggleSidebar, changeSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
