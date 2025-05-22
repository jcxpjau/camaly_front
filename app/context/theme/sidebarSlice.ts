import { createSlice } from '@reduxjs/toolkit';

interface SidebarState {//Criando o estado da sidebar
  isOpen: boolean;
}

const initialState: SidebarState = {//Inicialmente o isopn será truie, por padrão irá vir aberto
  isOpen: true,
};

const sidebarSlice = createSlice({//Criando o Slice, passando o estado inicial
  name: 'sidebar',
  initialState,
  reducers: {//Criando a função que muda o sidebar
    toggleSidebar(state) {
      state.isOpen = !state.isOpen;
    },
    setSidebar(state, action) {//Setando o valor
      state.isOpen = action.payload;
    },
  },
});

export const { toggleSidebar, setSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
