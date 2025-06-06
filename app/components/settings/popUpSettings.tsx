import { X } from "lucide-react";
import { useState } from "react";
import { Input } from "../input/input";
import { useAuth } from "~/context/auth/auth.hooks";
import ButtonSettings from "./buttonSettings";
import { FaGoogle } from "react-icons/fa";

interface SettingsPopupProps {
  purchase: any;
  onClose: () => void;
}

export function PopUpSettings({ purchase, onClose }: SettingsPopupProps) {
  const {user} = useAuth();

  const [clientId, setClientId] = useState("397816616441-u7trmpd70rgimduoatbqsjan466uehvk.apps.googleusercontent.com");//Informações do meu APP google
  const [clientSecret, setClientSecret] = useState("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");//Informações do meu APP google
  const [appUserId, setAppUserId] = useState(user._id);//Id do usuário client
  const [redirectUri, setRedirectUri] = useState("http://localhost:5000/oauth/callback");//Rota de redirecionamento
  
  // Função que monta o state e redireciona para backend
  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
    if (!clientId || !clientSecret || !redirectUri) {
      alert("Please fill all fields");
      return;
    }

    const stateObj = {
  provider: 'google',            // <-- aqui você diz qual provedor usar
  appUserId: user._id,
  clientId: '397816616441-u7trmpd70rgimduoatbqsjan466uehvk.apps.googleusercontent.com',
  clientSecret: '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',  // se precisar
  redirectUri: 'http://localhost:3000/oauth/callback',
    };
    const encodedState = encodeURIComponent(JSON.stringify(stateObj));
    fetch(`http://localhost:3000/oauth/start?state=${encodedState}`)
      .then(res => res.json())
  .then(({ url }) => {
    window.location.href = url;  // redireciona o navegador para o Google OAuth
  })
      .catch(console.error);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="relative w-full max-w-lg rounded-lg bg-[var(--color-bg-alt)] border border-[var(--color-border)] shadow-2xl overflow-hidden text-[var(--color-text)] p-6">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-[var(--color-text)] hover:opacity-70"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="flex h-[600px] flex-col">
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <form onClick={handleLogin}>
              <ButtonSettings text="Login with Google" icon={FaGoogle} type="submit" />
            </form>
        </div>
        </div>
      </div>
    </div>
  );
}
