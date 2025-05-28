import { useState, useRef, useLayoutEffect } from 'react';
import { FaGoogle, FaApple } from 'react-icons/fa';
import { Mail, KeyRound, User } from 'lucide-react';
import { motion } from 'framer-motion';
import Logo from "../../../assets/imgs/Logo_Camaly.png";
import { Input } from '~/components/input/input';
import { useCustomNavigate } from "~/hooks/useCustomNavigate";
import { useTheme } from '~/context/theme/theme.hooks';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [error, setError] = useState(false)

  const navigate = useCustomNavigate();

      const { mode } = useTheme();
  
      useLayoutEffect(() => {
          if (mode === "dark") {
              document.documentElement.classList.add("dark");
          } else {
              document.documentElement.classList.add("dark");
          }
      }, [mode]);

  async function RegisterAuth(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let hasError = false;

    if (!name.trim()) {
      setNameError("Name is required.");
      hasError = true;
    } 
    else {
      setNameError('');
    }

    if (!email.trim()) {
      setEmailError("Email is required.");
      hasError = true;

    } 
    else {
      setEmailError('');
    }

    if (!password.trim()) {
      setPasswordError("Password is required.");
      hasError = true;

    } 
    else {
      setPasswordError('');
    }

    if (!confirmPassword.trim()) {
      setConfirmPasswordError("Confirmation is required.");
      hasError = true;

    } 
    else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      hasError = true;

    } 
    else {
      setConfirmPasswordError('');
    }
    if (hasError) return;
    try {
            const res = await fetch(import.meta.env.VITE_API_URL + "users", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  name, 
                  email, 
                  password
                })
            });
            const json = await res.json();
            if (!res.ok) {
                console.error("Erro de login:", json);
                setError(true)
                return;
            }
            if (res.ok) {
                navigate(null, "/login");
            }
        } catch (err: any) {
            console.log(err);
        }
  }

  // Estado com posição do mouse na viewport
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  // Atualiza posição do mouse
  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    setMousePos({ x: e.clientX, y: e.clientY });
  }

  // Limpa posição quando mouse sai da área (opcional)
  function handleMouseLeave() {
    setMousePos(null);
  }

  // Calcula posição do mouse relativa à box
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
      <div className="flex flex-col items-center gap-6 sm:gap-8 md:gap-15 w-full max-w-md" style={{ position: 'relative', zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img src={Logo} alt="Camaly" className="h-13 sm:h-11 md:h-15 w-auto" />
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
            <div className="text-center">
                <h2 className="text-3xl font-semibold mb-1">Welcome back</h2>
                <p className="text-sm" style={{ color: 'var(--color-card-subtext)' }}>
                    Login to continue using Camaly
                </p>
            </div>
            {error && (
            <div className="text-red-300 text-sm p-3 rounded text-center my-4">
                O endereço de e-mail informado já está vinculado a uma conta. Por favor, utilize outro e-mail ou realize o login com suas credenciais.
            </div>
            )}
            <form onSubmit={RegisterAuth} className="space-y-4 mt-6">
              <Input.Root status={nameError ? 'error' : undefined} message={nameError}>
                <Input.Icon icon={User} status={nameError ? 'error' : undefined} />
                <Input.Content
                  placeholder="Name..."
                  type="text"
                  value={name}
                  onChange={setName}
                  status={nameError ? 'error' : undefined}
                />
              </Input.Root>
              <Input.Root status={emailError ? 'error' : undefined} message={emailError}>
                <Input.Icon icon={Mail} status={emailError ? 'error' : undefined} />
                <Input.Content
                  placeholder="Email..."
                  type="email"
                  value={email}
                  onChange={setEmail}
                  status={emailError ? 'error' : undefined}
                />
              </Input.Root>
              <Input.Root status={passwordError ? 'error' : undefined} message={passwordError}>
                <Input.Icon icon={KeyRound} status={passwordError ? 'error' : undefined} />
                <Input.Content
                  placeholder="Password..."
                  type="password"
                  value={password}
                  onChange={setPassword}
                  status={passwordError ? 'error' : undefined}
                />
              </Input.Root>
              <Input.Root status={confirmPasswordError ? 'error' : undefined} message={confirmPasswordError}>
                <Input.Icon icon={KeyRound} status={confirmPasswordError ? 'error' : undefined} />
                <Input.Content
                  placeholder="Confirm Password..."
                  type="password"
                  value={confirmPassword}
                  onChange={setConfirmPassword}
                  status={confirmPasswordError ? 'error' : undefined}
                />
              </Input.Root>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#a4b7f4] to-[#bcacfc] text-white rounded-md py-3 font-semibold shadow-md hover:opacity-90 transition"
              >
                Create Account
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
                <FaGoogle className="w-5 h-5" /> Sign up with Google
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
                <FaApple className="w-5 h-5" /> Sign up with Apple
              </button>
            </div>
            <p className="text-sm text-center mt-6" style={{ color: 'var(--color-card-subtext)' }}>
              Already have an account?
              <span
                onClick={(e) => navigate(e, "/login")}
                className="text-blue-400 ml-1 underline hover:opacity-80 cursor-pointer"
              >
                Sign In
              </span>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
