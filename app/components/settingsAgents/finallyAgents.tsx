import React, { useState } from "react";
import { Input } from "../input/input";
import { useAuth } from "~/context/auth/auth.hooks";

export function FinallyAgents() {
  const [description, setDescription] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const { user } = useAuth();

  async function postSocialMedia() {
  const payload = {
    imageUrl: photoUrl,     // a URL da imagem
    description: description,  // a descrição do post
    userId: user._id
  };

  try {
    const response = await fetch(
      "https://avent7.app.n8n.cloud/webhook-test/camaly/socialmediapost",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Resposta do servidor:", data);
    return data;
  } catch (error) {
    console.error("Erro ao enviar post:", error);
    throw error;
  }
}
  return (
    <section className="space-y-6 rounded-lg" style={{ color: "var(--color-card-text)" }}>
      <header className="mb-4">
        <h2 className="text-lg font-semibold text-[var(--color-card-text)]">Finalizar Configuração</h2>
        <p className="text-sm text-[var(--color-card-subtext)]">
          Revise e finalize a configuração do seu agente
        </p>
      </header>

      <div className="space-y-6">
        {/* Resumo */}
        <div className="bg-[var(--color-bg-muted)] p-4 rounded-lg space-y-2">
          <h4 className="font-medium text-[var(--color-text-default)]">Resumo da Configuração</h4>
          <p className="text-sm text-[var(--color-muted)] leading-relaxed">
            ✓ Integrações configuradas<br />
            ✓ Instruções definidas<br />
            ✓ Configurações técnicas aplicadas<br />
            ✓ Personalidade configurada
          </p>
        </div>

        {/* Nova Publicação */}
        <div className="bg-[var(--color-bg-muted)] p-4 rounded-lg space-y-4">
          <h3 className="text-lg font-semibold text-[var(--color-card-text)]">Nova Publicação</h3>

            <Input.Root label="Descrição">
                <Input.Content
                    placeholder="Descrição"
                    type="text"
                    value={description}
                    onChange={setDescription}
                />
            </Input.Root>
            <Input.Root label="URL da imagem">
                <Input.Content
                    placeholder="URL da imagem"
                    type="text"
                    value={photoUrl}
                    onChange={setPhotoUrl}
                />
            </Input.Root>
        </div>

        {/* Botões Salvar e Ativar / Salvar como Rascunho */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"            
            onClick={postSocialMedia} 
            className="flex-1 rounded-md bg-[var(--color-accent)] text-white py-2 px-4 text-sm font-medium hover:brightness-110 transition"
          >
            Salvar e Ativar Agente
          </button>
          <button
            type="button"
            className="flex-1 rounded-md border border-[var(--color-border)] text-[var(--color-text-default)] py-2 px-4 text-sm font-medium hover:bg-[var(--color-bg-muted)] transition"
          >
            Salvar como Rascunho
          </button>
        </div>
      </div>
    </section>
  );
}
