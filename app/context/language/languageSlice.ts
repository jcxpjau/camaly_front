import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import i18n from '~/utils/i18n';

type LanguageState = {
  language: string | null
}

const initialState: LanguageState = {
  language: "en" ,
}

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    changeLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
      i18n.changeLanguage(action.payload);
    }
  },
})

export const { changeLanguage } = languageSlice.actions
export default languageSlice.reducer
