import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


type AuthState = {
    isAuthenticated: boolean
    token: string | null,
    user: any | null
}
interface LoginPayload {
    token: string
    remember: boolean
}

const initialState: AuthState = {
    isAuthenticated: false,
    token: null,
    user: null
}


const getInitialUser = (): AuthState => {
    if (typeof window !== 'undefined') {
        const storeToken = localStorage.getItem('camaly.token')
        if( storeToken ) {
            return { isAuthenticated: true , token: storeToken, user: null }
        }
    }
    return { isAuthenticated: false, token : null, user: null }
}

const authSlice = createSlice({
    name: 'auth',
    initialState: getInitialUser(),
    reducers: {
        login: (state, action: PayloadAction<LoginPayload> ) => {
            const { token, remember } = action.payload;
            state.isAuthenticated = true;
            state.token = token;
            if( remember ) {
                localStorage.setItem('camaly.token', state.token);
            }
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.token = null;
            localStorage.removeItem( 'camaly.token' );
        },
        setUser: ( state, action: PayloadAction<any> ) => {
            state.user = action.payload;
        }
    },
})

export const { login, logout, setUser } = authSlice.actions
export default authSlice.reducer
