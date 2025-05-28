import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type ThemeState = {
    mode: "light" | "dark"
}

const getInitialTheme = (): ThemeState => {
    if (typeof window !== 'undefined') {
        const storedMode = localStorage.getItem('camaly.theme.mode')
        if (storedMode === 'dark' || storedMode === 'light') {
            return { mode: storedMode }
        }
    }
    return { mode: 'dark' }
}

const themeSlice = createSlice({
    name: 'theme',
    initialState: getInitialTheme(),
    reducers: {
        toggleTheme: (state) => {
            state.mode = state.mode === 'light' ? 'dark' : 'light';
            localStorage.setItem('camaly.theme.mode', state.mode);
        }
    },
})

export const { toggleTheme } = themeSlice.actions
export default themeSlice.reducer
