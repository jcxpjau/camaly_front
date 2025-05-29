import React, { useEffect, useState } from "react";
import { Mail, User, Shield } from "lucide-react";
import { Input } from "../input/input";
import ButtonSettings from "./buttonSettings";
import { useAuth } from "~/context/auth/auth.hooks";

export function PersonalSettings() {
  const [notifications, setNotifications] = useState(false);//Estado para o toogle de receber emails

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [oldpassword, setOldPassowrd] = useState('');
  const [newpassword, setNewPassowrd] = useState('');
  const [confirmnewpassword, setConfirmNewPassowrd] = useState('');

  const {user} = useAuth();
  
  //Useeffect para pegar as infos do usuário e ele conseguir editar
  useEffect(() => {
  if (user?.email) {
    setEmail(user.email);
  }
  if (user?.name) {
    setName(user.name);
  }
}, [user]);

  return (
    <div className="flex flex-col gap-15">
      <section className="space-y-6 rounded-lg" style={{ color: "var(--color-card-text)" }}>
        <div>
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            <User className="h-5 w-5" />
            Personal Information
          </h2>
          <p style={{ color: "var(--color-card-subtext)" }}>
            Update your personal information and account preferences.
          </p>
        </div>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <Input.Root label="First Name">
                <Input.Content
                  placeholder="First Name..."
                  type="text"
                  value={name}
                  onChange={setName}
                />
              </Input.Root>
            </div>
            <div className="flex flex-col">
              <Input.Root label="Last Name">
                <Input.Content
                  placeholder="Last Name..."
                  type="text"
                  value={name}
                  onChange={setName}
                />
              </Input.Root>
            </div>
          </div>
          <div className="flex flex-col">
            <Input.Root label="Email">
              <Input.Content
                placeholder="Email..."
                type="email"
                value={email}
                onChange={setEmail}
              />
            </Input.Root>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 justify-center">
              <div className="flex items-center gap-3">
                <button
                  id="notifications"
                  type="button"
                  role="switch"
                  aria-checked={notifications}
                  onClick={() => setNotifications(!notifications)}
                  className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors duration-300 ${
                    notifications ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-muted)]'
                  }`}
                >
                  <span
                    className={`inline-block w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300 transform ${
                      notifications ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
                <label
                  htmlFor="notifications"
                  className="text-sm select-none"
                  style={{ color: "var(--color-card-text)" }}
                >
                  Receive email notifications
                </label>
              </div>
            </div>
            <ButtonSettings text="Save Changes"/>
          </div>
        </form>
      </section>
      <section className="space-y-6 rounded-lg" style={{ color: "var(--color-card-text)" }}>
        <div>
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            <Shield className="h-5 w-5" />
            Personal Security
          </h2>
          <p style={{ color: "var(--color-card-subtext)" }}>
            Update your personal security information and account preferences.
          </p>
        </div>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <Input.Root label="Old Password">
                <Input.Content
                  placeholder="Old Password..."
                  type="password"
                  value={oldpassword}
                  onChange={setOldPassowrd}
                />
              </Input.Root>
            </div>
            <div className="flex flex-col">
              <Input.Root label="New Password">
                <Input.Content
                  placeholder="New Password..."
                  type="password"
                  value={newpassword}
                  onChange={setNewPassowrd}
                />
              </Input.Root>
            </div>
          </div>

          <div className="flex flex-col">
            <Input.Root label="Confirm your new password">
              <Input.Content
                placeholder="Confirm your new password"
                type="password"
                value={confirmnewpassword}
                onChange={setConfirmNewPassowrd}
              />
            </Input.Root>
          </div>
          <div className="flex justify-between items-center mt-7">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium" style={{ color: "var(--color-card-text)" }}>
                Two-factor authentication (2FA)
              </span>
              <span className="text-sm" style={{ color: "var(--color-card-subtext)" }}>
                Two-factor authentication is currently disabled.{" "}
                <a
                  href="#"
                  className="underline hover:opacity-90"
                  style={{ color: "var(--color-card-subtext)" }}
                >
                  Learn more
                </a>
              </span>
              <button
                className="self-start text-sm mt-2 rounded p-2 border border-[var(--color-text)] text-[var(--color-text)] hover:opacity-90 transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                style={{
                  background: 'transparent',
                }}
              >
                Enable 2FA
              </button>
            </div>
            <ButtonSettings text="Save Changes"/>
          </div>
        </form>
      </section>
    </div>
  );
}
