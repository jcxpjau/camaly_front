import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../../store'
import { toggleSidebar, changeSidebar } from './sidebarSlice'

export const useSideBar = () => {
  const dispatch = useDispatch<AppDispatch>()
  const sidebar = useSelector((state: RootState) => state.sidebar)

  return {
    ...sidebar,
    toggleSidebar: () => dispatch(toggleSidebar()),
    changeSidebar: ( value : boolean ) => dispatch( changeSidebar( value ) )
  }
}