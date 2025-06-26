import React, { useEffect, useState } from 'react';
import { Bot, CheckCircle, Circle, Settings } from 'lucide-react';
import { Input } from '~/components/input/input';
import api from '~/services/api';
import { FcGoogle } from 'react-icons/fc';
import { FaMicrosoft, FaGithub } from 'react-icons/fa';
import { FaMeta } from 'react-icons/fa6';
import { useAuth } from '~/context/auth/auth.hooks';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';
import { ICONS } from '~/components/filterBar/iconCategories';

export type Flow = {
  _id: string;
  workflowId: string;
  name: string;
  description: string;
  category: string;
  providerConnection: string;
  inputsSchema: Record<string, any>[]; // Corrigido para refletir o formato real
};

export type SelectedFlow = {
  flow: Flow;
  data: Record<string, any>; //Valores que o usuário vai preencher
  isConfigured: boolean;
};

type Props = {
  id?: string;
};

const providers = [
  { key: 'google', icon: <FcGoogle className="w-5 h-5" />, label: 'Google' },
  { key: 'meta', icon: <FaMeta className="w-5 h-5 text-[#1877F2]" />, label: 'Meta' },
  { key: 'microsoft', icon: <FaMicrosoft className="w-5 h-5" />, label: 'Microsoft' },
  { key: 'github', icon: <FaGithub className="w-5 h-5" />, label: 'GitHub' },
];

export function SettingsAgents({ id }: Props) {
  const { t } = useTranslation();
  const { user } = useAuth();

  const [selectedFlow, setSelectedFlow] = useState<SelectedFlow | null>(null);
  const [existsIntegration, setExistsIntegration] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [loading, setLoading] = useState(true);

  const [statusResPatchInfo, setStatusResPatchInfo] = useState('');
  const [textResPatchInfo, setTextResPatchInfo] = useState('');

  //Função para atualizar o selectedFlow de acordo com o que o usuário digita
  function updateFlowData(data: Record<string, any>) {
    if (!selectedFlow) return;

    // Verifica se todos os campos esperados foram preenchidos
    const isConfigured = selectedFlow.flow.inputsSchema.every((inputObj) =>
      Object.keys(inputObj).every(
        (key) => data[key] !== '' && data[key] !== undefined && data[key] !== null
      )
    );

    //Atualizo o selectedFlow com os dados preenchdios e isconfigured true
    setSelectedFlow({ ...selectedFlow, data, isConfigured });
  }

  //UseEffect Para ler os parametros de login oAuth feito
  useEffect(() => {
  const params = new URLSearchParams(location.search);
  const oauth = params.get('oauth');
  const provider = params.get('provider');

  if (oauth === 'success') {
        setStatusResPatchInfo('success');
        setTextResPatchInfo(
          t('settingsAgents.flowSettings.sucessInfoOAuth')
        );

    // Limpar os parâmetros para não mostrar mensagem sempre
    const cleanUrl = location.pathname;
    window.history.replaceState({}, '', cleanUrl);
  }
}, [location.search, location.pathname]);

  //Pegando dados do flow
  useEffect(() => {
    if (!id) return;
    const loadFlow = async () => {
      try {
        const { data } = await api.get(`products/${id}`);
        const flowData: SelectedFlow = {
          flow: data,
          data: {},
          isConfigured: false,
        };
        setSelectedFlow(flowData);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar fluxo:', error);
      }
    };
    loadFlow();
  }, [id]);

  //Busca integração e dados salvos do produto
  useEffect(() => {
    if (!user || !selectedFlow) return;

    const loadIntegrations = async () => {
      try {
        const res = await api.get(`user-integrations/${selectedFlow.flow.providerConnection}`);
        setExistsIntegration(res.status === 200);
      } catch (err) {
        setExistsIntegration(false);
      }
    };

    //Busca os dados salvos do produto (purchase.inputsSchema)
    const loadSettingsProduct = async () => {
      try {
        const { data } = await api.get(
          `purchases/user/${user._id}/product/${selectedFlow.flow._id}`
        );
        const purchase = data.purchase;

        //Verifica se existe purchase e se inputsSchema tem dados válidos
        if (purchase && Array.isArray(purchase.inputsSchema) && purchase.inputsSchema.length > 0) {
          const filledData = purchase.inputsSchema[0];

          //Atualiza o estado do formulário com os dados carregados do banco
          //mas só se o usuário ainda não tiver digitado nada
          setSelectedFlow((prev) => {
            if (!prev) return null;

            const hasChanges = Object.keys(prev.data).some((key) => !!prev.data[key]);
            if (hasChanges) return prev;

            const isConfigured = prev.flow.inputsSchema.every((inputObj) =>
              Object.keys(inputObj).every(
                (key) =>
                  filledData[key] !== undefined &&
                  filledData[key] !== null &&
                  filledData[key] !== ''
              )
            );

            return {
              ...prev,
              data: filledData,
              isConfigured,
            };
          });
        }
      } catch (error) {
        console.error('Erro ao carregar inputsSchema do produto:', error);
      }
    };

    loadIntegrations();
    loadSettingsProduct();
  }, [user, selectedFlow?.flow._id]);

  //Função para atualizar a purchase no banco com os dados que o usuário configurou
  async function UpdatePurchase(params: { productId: string; inputsSchemas: Record<string, any> }) {
    try {
      const inputsSchemasArray = [params.inputsSchemas];

      const res = await api.put('/purchases/update', {
        productId: params.productId,
        inputsSchemas: inputsSchemasArray,
      });

      if (res.status === 200) {
        setStatusResPatchInfo('success');
        setTextResPatchInfo(
          t('settings.personalSettings.sections.personalInformation.form.statusMessages.success')
        );
      } else {
        setStatusResPatchInfo('error');
        setTextResPatchInfo(
          t('settings.personalSettings.sections.personalInformation.form.statusMessages.error')
        );
      }
    } catch (error: any) {
      console.error('Erro ao atualizar compra:', error.response?.data || error.message);
      throw error;
    }
  }

  async function LoginOauth(provider: string) {
    try {
      const stateObj = {
        provider,
        appUserId: user._id,
        appProductId: id,
      };

      const encodedState = encodeURIComponent(JSON.stringify(stateObj));
      const res = await api.get(`/oauth/start?state=${encodedState}`);
      window.location.href = res.data.url;
    } catch (err) {
      console.error('Error starting OAuth:', err);
    }
  }

  //Utilitários visuais
  const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
  const generatePlaceholder = (inputId: string) => `Digite sua(seu) ${capitalizeFirstLetter(inputId)}`;

  //Função para alterar o valor dos dados que o usuário esta digitando
  function handleChange(inputId: string, value: any) {
    if (!selectedFlow) return;
    const newData = { ...selectedFlow.data, [inputId]: value };
    updateFlowData(newData);
  }

  //Verificando se o usuário preencheu tudo certo para mudar o visual
  const isFormValid = selectedFlow?.flow.inputsSchema.every((inputObj) =>
    Object.keys(inputObj).every((key) => {
      const value = selectedFlow.data[key];
      return value !== undefined && value !== null && value.toString().trim() !== '';
    })
  );

  const category = selectedFlow?.flow?.category?.toLowerCase() || '';
  const Icon = ICONS[category] || Bot;

    if (loading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)] text-[var(--color-text)]">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-8 h-8 border-4 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin" />
                    <p className="text-sm text-[var(--color-muted)]">{t('loading')}</p>
                </div>
            </div>
        );
    }

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] px-6 py-10 mb-10">
      <div className="max-w-7xl mx-auto">
        <AnimatePresence>
          {selectedFlow && (
            <motion.div
              key={selectedFlow.flow._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
            >
            <div className="rounded-xl text-[var(--color-card-text)] backdrop-blur-sm p-6 mb-10">
              <div className="flex flex-col md:flex-row md:items-center md:gap-4 relative">
                <div className="p-3 bg-[var(--color-accent)] rounded-xl flex items-center justify-center text-white w-fit mb-2 md:mb-0 md:mr-4">                  
                  <span className="w-6 h-6 flex items-center justify-center">
                      {Icon}
                  </span>                
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-bold">{selectedFlow.flow.name}</h2>
                  </div>
                  <p className="text-[var(--color-card-subtext)] leading-relaxed break-words">
                    {selectedFlow.flow.description}
                  </p>
                </div>
                <span
                  className="
                    inline-flex items-center
                    rounded-full
                    border border-transparent
                    px-3 py-0.5
                    text-xs font-semibold
                    transition-colors
                    focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
                    bg-[hsl(210,10%,18%)]
                    text-[hsl(210,40%,98%)]
                    hover:bg-[hsl(210,10%,23%)]
                    mt-4 md:mt-0 md:absolute md:right-0 md:top-0
                  "
                >
                  {selectedFlow.flow.category.toUpperCase()}
                </span>
              </div>
            </div>
              <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card-bg)] text-[var(--color-card-text)] backdrop-blur-sm p-6 space-y-6 shadow">
                <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg ${
                        isFormValid ? 'bg-[var(--color-success)]/20' : 'bg-[var(--color-warning)]/20'
                      }`}
                    >
                      {isFormValid ? (
                        <CheckCircle className="w-5 h-5 text-[var(--color-success)]" />
                      ) : (
                        <Circle className="w-5 h-5 text-[var(--color-warning)]" />
                      )}
                    </div>
                    <h3 className="text-lg font-semibold">{t('settingsAgents.flowSettings.title')}</h3>
                  </div>
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="p-2 rounded hover:bg-[var(--color-button-hover)] transition-colors"
                    aria-expanded={isExpanded}
                  >
                    <Settings className="w-5 h-5 text-[var(--color-muted)]" />
                  </button>
                </header>
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.form
                      onSubmit={(e) => e.preventDefault()}
                      className="space-y-6"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                    {statusResPatchInfo && (
                        <div className={`text-[var(--color-text-${statusResPatchInfo})] text-sm p-3 rounded text-center my-4`}>
                            {textResPatchInfo}
                        </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {
                          //Para cada objeto dentro do array inputsSchema do fluxo selecionado, vai passar item por item e criar inputs para cada chave dentro desses objetos.
                            selectedFlow.flow.inputsSchema.flatMap((inputObj, i) =>
                            Object.keys(inputObj).map((key) => {//Pega todas as chaves (nomes dos inputs) do objeto inputObj
                              //Pega o valor atual do input com a chave 'key' do estado data,
                              //se não existir, usa string vazia para evitar undefined
                              const value = selectedFlow.data[key] ?? '';
                              //Retorna o JSX do input para essa chave
                              return (
                                //Usamos a chave 'key' como key do React para performance e controle
                                <div key={key}>
                                  <Input.Root label={key}>
                                    <Input.Content
                                      placeholder={generatePlaceholder(key)}
                                      type="text"
                                      value={value}
                                      onChange={(value) => handleChange(key, value)}
                                    />
                                  </Input.Root>
                                </div>
                              );
                            })
                          )
                        }
                      </div>
                      <div className="p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-input)]">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{t('settingsAgents.flowSettings.statusLabel')}</span>
                          <div
                            className={`flex items-center gap-2 ${
                              isFormValid ? 'text-[var(--color-success)]' : 'text-[var(--color-warning)]'
                            }`}
                          >
                            {isFormValid ? <CheckCircle className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                            <span className="text-sm">{isFormValid ? t('settingsAgents.flowSettings.configured') : t('settingsAgents.flowSettings.pending')}</span>
                          </div>
                        </div>
                      </div>
                        {existsIntegration ? (
                          <div className="space-y-3 mb-6">
                            {providers
                              .filter((provider) => selectedFlow.flow.providerConnection.includes(provider.key))
                              .map((provider) => (
                                <div
                                  key={provider.key}
                                  className="flex items-center justify-between p-4 bg-green-500/10 border border-green-500/30 rounded-lg"
                                >
                                  <div className="flex items-center gap-3">
                                    <div className="p-2 bg-green-500/20 rounded-lg">
                                      {provider.icon}
                                    </div>
                                    <div>
                                      <div className="flex items-center gap-2">
                                        <span className="text-white font-medium">{provider.label}</span>
                                        <CheckCircle className="w-4 h-4 text-green-400" />
                                      </div>
                                      <p className="text-slate-300 text-sm">{t('settingsAgents.flowSettings.connectAccountCheck')}</p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                          </div>
                        ) : (
                          <div>
                            <h4 className="text-sm font-medium text-[var(--color-muted)] mb-3">{t('settingsAgents.flowSettings.connectAccount')}</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                              {providers
                                .filter((provider) => selectedFlow.flow.providerConnection.includes(provider.key))
                                .map((provider, i) => (
                                  <button
                                    key={i}
                                    type="button"
                                    onClick={() => LoginOauth(provider.key)}
                                    className="bg-[var(--color-button-bg)] border border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-button-hover)] transition-colors flex items-center gap-2 p-3 rounded-md"
                                  >
                                    {provider.icon}
                                    {provider.label}
                                  </button>
                                ))}
                            </div>
                          </div>
                        )}
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
              <div className="text-center">
                <motion.button
                  type="button"
                  disabled={!isFormValid}
                  onClick={() =>
                    selectedFlow &&
                    UpdatePurchase({
                      productId: selectedFlow.flow._id,
                      inputsSchemas: selectedFlow.data,
                    })
                  }
                  className={`mt-6 px-7 py-2.5 rounded-lg text-lg shadow transition
                  ${
                    isFormValid
                      ? 'bg-[var(--color-accent)] text-white cursor-pointer'
                      : 'bg-[var(--color-accent)] text-[var(--color-card-subtext)] cursor-not-allowed brightness-75'
                  }
                `}
                  whileHover={isFormValid ? { scale: 1.05, opacity: 0.9 } : {}}
                  whileTap={isFormValid ? { scale: 0.95 } : {}}
                  aria-disabled={!isFormValid}
                >
                  {t('settingsAgents.flowSettings.save')}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}