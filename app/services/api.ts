import axios, { type InternalAxiosRequestConfig, AxiosError } from 'axios';
import { store } from '~/store';
import { login, logout } from '~/context/auth/authSlice';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,//Para o cookie
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = store.getState().auth.token;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  //Quando a resposta é bem-sucedida, simplesmente retorna ela
  response => {
    return response;
  },
  //Quando ocorre erro na resposta, essa função é chamada
  async (error: AxiosError) => {
    //Pega a requisição original que causou o erro, ou seja, a primeira req deu Não autorizado
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // Verifica se o erro foi 401 (Unauthorized) e se ainda não tentamos refresh para essa requisição
    //Porque se já tentamos não podemos entrar em loop
    if (error.response?.status === 401 && !originalRequest._retry) {
      //Marca que já estamos tentando o refresh para evitar loop infinito
      originalRequest._retry = true;
      try {
        const res = await api.post('/auth/refresh', {
          withCredentials: true,
        });

        const newAccessToken = res.data.access_token;

        //Pega o novo acesstoken e coloca o redux
        store.dispatch(login({ token: newAccessToken, remember: true }));

        //Atualiza o header Authorization da requisição original para usar o novo token
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }

        //Repete a requisição original com o token atualizado
        return api(originalRequest);
      } 
      catch (refreshError) {//Se deu erro o refresh pede o login
        store.dispatch(logout());
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
