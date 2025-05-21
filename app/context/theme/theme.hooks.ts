import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../../store'
import { toggleTheme } from './themeSlice'

export const useTheme = () => {
  const dispatch = useDispatch<AppDispatch>()
  const theme = useSelector((state: RootState) => state.theme)

  return {
    ...theme,
    toggleTheme: () => dispatch(toggleTheme()),
  }
}