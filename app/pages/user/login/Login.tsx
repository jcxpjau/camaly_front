import { useState } from 'react';
import { FaGoogle, FaApple } from 'react-icons/fa';
import { Mail, KeyRound } from 'lucide-react';
import { motion } from 'framer-motion';
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
    const navigate = useCustomNavigate();

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
            const res = await fetch("https://new.blumerland.com.br/camaly/auth/login", {
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

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-[var(--color-bg)] text-[var(--color-text)] login-bg relative">
            <motion.div
                className="absolute top-6 left-10"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <img
                    src={Logo}
                    alt="Camaly"
                    className="h-10 sm:h-7 md:h-10 w-auto cursor-pointer"
                    onClick={() => window.location.href = "/user/home"}
                />
            </motion.div>
            <motion.div
                className="w-full max-w-md mx-auto px-6 py-10 rounded-xl shadow-lg"
                style={{
                    backgroundColor: 'var(--color-card-bg)',
                    color: 'var(--color-card-text)'
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
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
                            color: 'var(--color-card-text)'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--color-button-hover)'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--color-button-bg)'}
                    >
                        <FaGoogle className="w-5 h-5" /> Sign in with Google
                    </button>
                    <button
                        className="w-full flex items-center justify-center gap-3 rounded-md px-4 py-2 font-medium transition"
                        style={{
                            backgroundColor: 'var(--color-button-bg)',
                            color: 'var(--color-card-text)'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--color-button-hover)'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--color-button-bg)'}
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
            </motion.div>
        </div>
    );
}
