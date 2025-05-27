import { useState, useRef } from 'react';
import { FaGoogle, FaApple } from 'react-icons/fa';
import { Mail, KeyRound, Check } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import Logo from "../../../assets/imgs/Logo_Camaly.png";
import { Input } from '~/components/input/input';
import { useCustomNavigate } from "~/hooks/useCustomNavigate";
import { useAuth } from '~/context/auth/auth.hooks';

export default function Login() {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [rememberMe, setRememberMe ] = useState(false);
    const navigate = useCustomNavigate();

    const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

    // Ref da box para calcular posição relativa do mouse dentro dela
    const boxRef = useRef<HTMLDivElement>(null);

    async function LoginAuth(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        let hasError = false;
        if (!email.trim()) {
            setEmailError("Email is required.");
            hasError = true;
        } else {
            setEmailError('');
        }
        if (!password.trim()) {
            setPasswordError("Password is required.");
            hasError = true;
        } else {
            setPasswordError('');
        }
        if (hasError) return;

        try {
            const res = await fetch(import.meta.env.VITE_API_URL + "auth/login", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });
            const json = await res.json();
            if (!res.ok) {
                console.error("Erro de login:", json);
                return;
            }
            if (json.access_token) {
                login(json.access_token);
                navigate(null, "/");
            }
        } catch (err: any) {
            console.log(err);
        }
    }

    // Atualiza a posição do mouse na viewport
    function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
        setMousePos({ x: e.clientX, y: e.clientY });
    }

    // Limpa a posição quando o mouse sai da área geral (opcional)
    function handleMouseLeave() {
        setMousePos(null);
    }

    // Calcula posição do mouse relativa à box (para o gradiente interno)
    const boxRelativePos = mousePos && boxRef.current
        ? (() => {
            const rect = boxRef.current.getBoundingClientRect();
            return { x: mousePos.x - rect.left, y: mousePos.y - rect.top };
        })()
        : null;

    return (
        <div
            className="min-h-screen flex items-center justify-center px-4 bg-[var(--color-bg)] text-[var(--color-text)] login-bg relative overflow-hidden"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ position: 'relative' }}
        >
            <span
                className="pointer-events-none absolute top-0 left-0 w-full h-full"
                style={{
                    opacity: mousePos ? 1 : 0,
                    transition: 'opacity 0.3s ease',
                    background: mousePos
                        ? `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, rgba(188, 172, 252, 0.25), transparent 300px)`
                        : 'none',
                    filter: 'blur(150px)',
                    zIndex: 0,
                    position: 'absolute',
                    pointerEvents: 'none',
                }}
            />
            <div className="flex flex-col items-center gap-8 sm:gap-10 md:gap-20 w-full max-w-md" style={{ position: 'relative', zIndex: 10 }}>
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <img src={Logo} alt="Camaly" className="h-14 sm:h-12 md:h-16 w-auto" />
                </motion.div>
                <motion.div
                    ref={boxRef}
                    className="relative w-full px-6 py-10 rounded-xl shadow-lg overflow-hidden"
                    style={{
                        backgroundColor: 'var(--color-card-bg)',
                        color: 'var(--color-card-text)',
                        zIndex: 20,
                    }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span
                        className="pointer-events-none absolute rounded-xl"
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            opacity: boxRelativePos ? 1 : 0,
                            transition: 'opacity 0.3s ease',
                            background: boxRelativePos
                                ? `radial-gradient(120px circle at ${boxRelativePos.x}px ${boxRelativePos.y}px, rgba(188,172,252,0.9), transparent 120px)`
                                : 'none',
                            filter: 'blur(70px)',
                            zIndex: 0,
                        }}
                    />
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <div className="mb-8 text-center">
                            <h2 className="text-3xl font-semibold mb-1">Welcome back</h2>
                            <p className="text-sm" style={{ color: 'var(--color-card-subtext)' }}>
                                Login to continue using Camaly
                            </p>
                        </div>
                        <form onSubmit={LoginAuth} className="space-y-4">
                            <Input.Root status={emailError ? "error" : undefined} message={emailError}>
                                <Input.Icon icon={Mail} status={emailError ? "error" : undefined} />
                                <Input.Content
                                    placeholder="Email..."
                                    type="email"
                                    value={email}
                                    onChange={setEmail}
                                    status={emailError ? "error" : undefined}
                                />
                            </Input.Root>
                            <Input.Root status={passwordError ? "error" : undefined} message={passwordError}>
                                <Input.Icon icon={KeyRound} status={passwordError ? "error" : undefined} />
                                <Input.Content
                                    placeholder="Password..."
                                    type="password"
                                    value={password}
                                    onChange={setPassword}
                                    status={passwordError ? "error" : undefined}
                                />
                            </Input.Root>
                            <div className="flex items-center gap-2 text-sm text-[var(--color-card-text)] select-none">
                                <motion.div
                                    className="relative w-5 h-5 rounded-[4px] border border-[#bcacfc] flex items-center justify-center cursor-pointer"
                                    initial={false}
                                    animate={{
                                        backgroundColor: rememberMe ? "#bcacfc" : "transparent",
                                        borderColor: rememberMe ? "#bcacfc" : "#bcacfc"
                                    }}
                                    transition={{ duration: 0.2 }}
                                    onClick={() => setRememberMe(!rememberMe)}
                                >
                                    <AnimatePresence>
                                        {rememberMe && (
                                            <motion.div
                                                key="check"
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                exit={{ scale: 0 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <Check className="w-3 h-3 text-white" strokeWidth={3} />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                                <label
                                    onClick={() => setRememberMe(!rememberMe)}
                                    className="cursor-pointer"
                                >
                                    Stay signed in
                                </label>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-[#a4b7f4] to-[#bcacfc] text-white rounded-md py-3 font-semibold shadow-md hover:opacity-90 transition"
                            >
                                Sign In
                            </button>
                        </form>
                        <div className="flex items-center my-6">
                            <hr className="flex-grow border-[var(--color-divider)]" />
                            <span className="px-3 text-sm" style={{ color: 'var(--color-card-text)' }}>OR</span>
                            <hr className="flex-grow border-[var(--color-divider)]" />
                        </div>
                        <div className="space-y-3">
                            <button
                                className="w-full flex items-center justify-center gap-3 rounded-md px-4 py-2 font-medium transition"
                                style={{
                                    backgroundColor: 'var(--color-button-bg)',
                                    color: 'var(--color-card-text)',
                                }}
                                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-button-hover)')}
                                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-button-bg)')}
                            >
                                <FaGoogle className="w-5 h-5" /> Sign in with Google
                            </button>
                            <button
                                className="w-full flex items-center justify-center gap-3 rounded-md px-4 py-2 font-medium transition"
                                style={{
                                    backgroundColor: 'var(--color-button-bg)',
                                    color: 'var(--color-card-text)',
                                }}
                                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-button-hover)')}
                                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-button-bg)')}
                            >
                                <FaApple className="w-5 h-5" /> Sign in with Apple
                            </button>
                        </div>
                        <p className="text-sm text-center mt-6" style={{ color: 'var(--color-card-subtext)' }}>
                            First time at Camaly?
                            <span
                                onClick={(e) => navigate(e, "/register")}
                                className="text-blue-400 ml-1 underline hover:opacity-80 cursor-pointer"
                            >
                                Create an account
                            </span>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
