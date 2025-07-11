import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../../store'
import { login, logout, setUser } from './authSlice'


export const useAuth = () => {

  const dispatch = useDispatch<AppDispatch>()
  const auth : any  = useSelector((state: RootState) => state.auth)
  const isAdmin = auth.user?.type === 'admin';

  return {
    ...auth,
    isAdmin,
    login: (token: string, remember: boolean) => dispatch(login({ token, remember })),
    logout: () => dispatch(logout()),
    setUser: (user: any) => dispatch(setUser(user)),
  };
}