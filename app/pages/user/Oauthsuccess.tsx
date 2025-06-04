import { useEffect } from "react";
import { useSearchParams } from "react-router";

export function OAuthSuccess() {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const userId = searchParams.get("userId");
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");
    const expiresIn = searchParams.get("expiresIn");

    console.log("User ID:", userId);
    console.log("Access Token:", accessToken);//+ importante
    console.log("Refresh Token:", refreshToken);
    console.log("Expires In:", expiresIn);

    // Aqui você pode salvar no state, Context API ou Redux e seguir com o fluxo da aplicação

    const timer = setTimeout(() => {
      window.close(); // Fecha a janela após 3 segundos
    }, 3000);

    return () => clearTimeout(timer); // Limpa o timeout caso o componente desmonte antes
  }, [searchParams]);

  return <div>Login realizado com sucesso! Você pode fechar esta janela.</div>;
}
