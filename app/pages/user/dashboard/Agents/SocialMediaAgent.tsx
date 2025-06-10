import React, { useEffect, useState } from 'react';
import { Instagram, Facebook, Send, Image, Video, CheckCircle, Bot } from 'lucide-react';
import { useAuth } from '~/context/auth/auth.hooks';

export function SocialMediaAgent() {
  const [caption, setCaption] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');

  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('');

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState<'success' | 'error'>('success');
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  //Resposta do n8n, que irá vir com o nome da página do Facebook e do Insta
  const [accountsFromApi, setAccountsFromApi] = useState<{ pageName?: string; instagramName?: string }>({});

  //Plataformas para postar, por enquanto será insta e facebook
  const platforms = [
    { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'from-pink-500 to-orange-500' },
    { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'from-blue-600 to-blue-700' }
  ];

  //Contas para postar que irá vir da API, implementar o followers futuramente
  const accounts = {
    instagram: accountsFromApi.instagramName
      ? [{ id: 'instagramName', name: accountsFromApi.instagramName, followers: '-' }]
      : [],
    facebook: accountsFromApi.pageName
      ? [{ id: 'pageName', name: accountsFromApi.pageName, followers: '-' }]
      : [],
  };

  //Mensagem de sucesso ou erro quando for postar (provisória)
  const showToastMessage = (message: string, variant: 'success' | 'error' = 'success') => {
    setToastMessage(message);
    setToastVariant(variant);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };


  async function MadePosty(e: React.FormEvent) {
    e.preventDefault();
    try {
      const response = await fetch("https://avent7.app.n8n.cloud/webhook/camaly/socialmediapost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user?._id,
          imageUrl: mediaUrl,
          description: caption,
          socialMedia: selectedPlatform
        }),
      });

      const data = await response.json();
      if (data.status === "Post made successfully") {
        const link = data.accountLink;
        showToastMessage(
          `Post made successfully. <a href="${link}" target="_blank" class="underline font-semibold ml-1">View Post</a>`,
          "success"
        );
        setCaption('');
        setMediaUrl('');
        setSelectedPlatform('');
        setSelectedAccount('');
      } 
      else {
        showToastMessage("Erro inesperado ao publicar o post.", "error");
      }
    } 
  catch (error) {
    console.error("Erro ao publicar:", error);
    showToastMessage("Erro ao publicar o post.", "error");
    }
  }

  useEffect(() => {
    if (!user) return;

    async function getUserPages() {
      try {
        const response = await fetch("https://avent7.app.n8n.cloud/webhook/camaly/pagesuser", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user._id }),
        });
        if (!response.ok) throw new Error(`Request error: ${response.statusText}`);
        const data = await response.json();
        setAccountsFromApi(data);
      } catch (error) {
        console.error("Error fetching account data:", error);
        showToastMessage("Failed to load account data.", "error");
      } finally {
        setLoading(false);
      }
    }
    getUserPages();
  }, [user]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)] text-[var(--color-text)]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-[var(--color-muted)]">Loading</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--color-bg))] to-[hsl(var(--color-bg-alt))] p-6">
      {showToast && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
          toastVariant === 'error'
            ? 'bg-[var(--color-error)] text-white'
            : 'bg-[var(--color-success)] text-black'
        }`}>
          <span dangerouslySetInnerHTML={{ __html: toastMessage }} />
        </div>
      )}
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-progress)] rounded-xl flex items-center justify-center shadow-lg">
            <Bot className="w-6 h-6 text-[var(--color-bg)]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[var(--color-text)]">Social Media Agent</h1>
            <p className="text-[var(--color-muted)]">Content creation assistant for social networks</p>
          </div>
          <div className="ml-auto bg-[var(--color-success)]/20 text-[var(--color-success)] border border-[var(--color-success)]/30 px-3 py-1 rounded-full text-sm flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            Active
          </div>
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-lg">
              <div className="p-6 border-b border-[var(--color-border)]">
                <h2 className="text-[var(--color-card-text)] font-semibold flex items-center gap-2">
                  <Send className="w-5 h-5" />
                  New Post
                </h2>
              </div>
              <div className="p-6 space-y-6">
                <form onSubmit={MadePosty} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[var(--color-card-text)] font-medium">Platform *</label>
                    <div className="grid grid-cols-2 gap-3">
                      {platforms.map(platform => (
                        <button
                          key={platform.id}
                          type="button"
                          onClick={() => {
                            setSelectedPlatform(platform.id);
                            setSelectedAccount('');
                          }}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            selectedPlatform === platform.id
                              ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/10'
                              : 'border-[var(--color-border)] hover:border-[var(--color-accent)]/50'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${platform.color} flex items-center justify-center`}>
                              <platform.icon className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-[var(--color-card-text)] font-medium">{platform.name}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                  {selectedPlatform && (
                    <div className="space-y-2">
                      <label className="text-[var(--color-card-text)] font-medium">Account/Page *</label>
                      <select
                        value={selectedAccount}
                        onChange={e => setSelectedAccount(e.target.value)}
                        className="w-full bg-[var(--color-card-bg)] border border-[var(--color-border)] text-[var(--color-card-text)] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent"
                      >
                        <option value="" className='bg-[var(--select-bg)]'>Select an account</option>
                        {accounts[selectedPlatform as keyof typeof accounts]?.map(account => (
                          <option key={account.id} value={account.id} className="bg-[var(--select-bg)]">
                            {account.name} ({account.followers})
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  <div className="space-y-2">
                    <label className="text-[var(--color-card-text)] font-medium">Caption *</label>
                    <textarea
                      value={caption}
                      onChange={e => setCaption(e.target.value)}
                      placeholder="Write your caption here..."
                      className="w-full bg-[var(--color-card-bg)] border border-[var(--color-border)] text-[var(--color-card-text)] placeholder:text-[var(--color-card-subtext)] min-h-[120px] resize-none rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent"
                    />
                    <div className="flex justify-between text-sm text-[var(--color-card-subtext)]">
                      <span>Use emojis and hashtags for engagement</span>
                      <span>{caption.length}/2200</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[var(--color-card-text)] font-medium">Media Type</label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setMediaType('image')}
                        className={`px-4 py-2 rounded-md font-medium transition-all flex items-center gap-2 ${
                          mediaType === 'image'
                            ? 'bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-progress)] text-white'
                            : 'border border-[var(--color-border)] text-[var(--color-card-text)] hover:bg-[var(--color-border)]'
                        }`}
                      >
                      <Image className="w-4 h-4" />
                        Image
                      </button>
                      <button
                        type="button"
                        onClick={() => setMediaType('video')}
                        className={`px-4 py-2 rounded-md font-medium transition-all flex items-center gap-2 ${
                          mediaType === 'video'
                            ? 'bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-progress)] text-white'
                            : 'border border-[var(--color-border)] text-[var(--color-card-text)] hover:bg-[var(--color-border)]'
                        }`}
                      >
                        <Video className="w-4 h-4" />
                        Video
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[var(--color-card-text)] font-medium">Media URL</label>
                    <input
                      type="url"
                      value={mediaUrl}
                      onChange={e => setMediaUrl(e.target.value)}
                      placeholder={`Paste the ${mediaType === 'image' ? 'image' : 'video'} URL here...`}
                      className="w-full bg-[var(--color-card-bg)] border border-[var(--color-border)] text-[var(--color-card-text)] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-full py-3 rounded-md bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-progress)] text-white font-semibold hover:brightness-110 transition"
                    >
                      Post
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div>
            <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-lg p-6">
              <h3 className="text-[var(--color-card-text)] font-semibold mb-4">Rules</h3>
              <ul className="list-disc list-inside text-[var(--color-card-subtext)] space-y-2">
                <li>For Instagram, post an image or video with a caption (max 2200 characters).</li>
                <li>For Facebook, post an image or video with a caption (max 63206 characters).</li>
                <li>Use public URLs for media.</li>
                <li>Direct uploads are not supported yet.</li>
                <li>Make sure the selected account is connected.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
