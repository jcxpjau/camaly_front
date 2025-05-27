import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../../store'
import { login, logout } from './authSlice'

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>()
  const auth : any  = useSelector((state: RootState) => state.auth)

  return {
    ...auth,
    login: (user: string ) => dispatch(login(user)),
    logout: () => dispatch(logout()),
  }
}