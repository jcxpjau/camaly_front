import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


type AuthState = {
    isAuthenticated: boolean
    user: string | null
}

interface LoginPayload {
    user: string
    remember: boolean
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
}


const getInitialUser = (): AuthState => {
    if (typeof window !== 'undefined') {
        const storedUser = localStorage.getItem('camaly.user')
        if( storedUser ) {
            return { isAuthenticated: true , user: storedUser }
        }
    }
    return { isAuthenticated: false, user : null }
}

const authSlice = createSlice({
    name: 'auth',
    initialState: getInitialUser(),
    reducers: {
        login: (state, action: PayloadAction<LoginPayload> ) => {
            const { user, remember } = action.payload;
            state.isAuthenticated = true;
            state.user = user;
            if( remember ) {
                localStorage.setItem('camaly.user', state.user);
            }
            
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            localStorage.removeItem( 'camaly.user' );
        },
    },
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer
