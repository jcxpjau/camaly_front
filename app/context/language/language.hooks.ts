import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../../store'
import { changeLanguage } from './languageSlice'

export const useLanguage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const language : any  = useSelector((state: RootState) => state.language)

  return {
    ...language,
    changeLanguage: (language: string) => dispatch(changeLanguage(language))
  }
}