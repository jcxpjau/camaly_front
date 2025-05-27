import { useState } from 'react';
import { FaGoogle, FaApple } from 'react-icons/fa';
import { Mail, KeyRound, User } from 'lucide-react';
import { motion } from 'framer-motion';
import Logo from "../../../assets/imgs/Logo_Camaly.png";
import { Input } from '~/components/input/input';
import { useCustomNavigate } from "~/hooks/useCustomNavigate";

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const navigate = useCustomNavigate();

  function RegisterAuth(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!name.trim()) {
      setNameError("Name is required.");
    } else {
      setNameError('');
    }

    if (!email.trim()) {
      setEmailError("Email is required.");
    } else {
      setEmailError('');
    }

    if (!password.trim()) {
      setPasswordError("Password is required.");
    } else {
      setPasswordError('');
    }

    if (!confirmPassword.trim()) {
      setConfirmPasswordError("Confirmation is required.");
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
    } else {
      setConfirmPasswordError('');
    }


    fetch("https://new.blumerland.com.br/camaly/users", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password })
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
      })
      .catch((erro) => {
      });
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
          <h2 className="text-3xl font-semibold mb-1">Create your account</h2>
          <p className="text-sm" style={{ color: 'var(--color-card-subtext)' }}>
            Join Camaly to get started
          </p>
        </div>
        <form onSubmit={RegisterAuth} className="space-y-4">
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
              color: 'var(--color-card-text)'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--color-button-hover)'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--color-button-bg)'}
          >
            <FaGoogle className="w-5 h-5" /> Sign up with Google
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
            <FaApple className="w-5 h-5" /> Sign up with Apple
          </button>
        </div>
        <p className="text-sm text-center mt-6" style={{ color: 'var(--color-card-subtext)' }}>
          Already have an account?
          <span
            onClick={(e) => navigate(e, "/")}
            className="text-blue-400 ml-1 underline hover:opacity-80 cursor-pointer"
          >
            Sign In
          </span>
        </p>
      </motion.div>
    </div>
  );
}
