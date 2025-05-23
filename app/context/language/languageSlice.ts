import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import i18n from '~/utils/i18n';

type LanguageState = {
  language: string | null
}

const SUPPORTED_LANGUAGES = ['en', 'pt', 'pt-BR'] as const;

type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number];

const normalizeLanguage = (lang: string | null): SupportedLanguage => {
  if (!lang) return 'en';
  if (lang === 'pt-BR') return 'pt';
  return SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage) ? lang as SupportedLanguage : 'en';
};


const getInitialLanguage = (): LanguageState => {
  if (typeof window !== 'undefined') {
    const storedLang = localStorage.getItem('camaly.language') || localStorage.getItem('i18nextLng');
    const language = normalizeLanguage(storedLang);
    i18n.changeLanguage(language);
    return { language: language };
  }
  i18n.changeLanguage('en');
  return { language: 'en' };
};

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
