import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import i18n from '~/utils/i18n';

type LanguageState = {
  language: string | null
}


const getInitialLanguage = (): LanguageState => {
  if (typeof window !== 'undefined') {
    const storedMode = localStorage.getItem('camaly.language') || localStorage.getItem( 'i18nextLng' );
    if (storedMode === 'pt' || storedMode === 'en' || storedMode == 'pt-BR' ) {
      i18n.changeLanguage(storedMode);
      return { language: storedMode }
    }
  }
  i18n.changeLanguage('en');
  return { language: 'en' }
}

const languageSlice = createSlice({
  name: 'language',
  initialState: getInitialLanguage(),
  reducers: {
    changeLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
      i18n.changeLanguage(action.payload);
      localStorage.setItem( 'camaly.language' , state.language );
    }
  },
})

export const { changeLanguage } = languageSlice.actions
export default languageSlice.reducer
