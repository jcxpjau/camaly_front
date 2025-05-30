import React, { useEffect, useState } from "react";
import { Mail, User, Shield } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Input } from "../input/input";
import ButtonSettings from "./buttonSettings";
import { useAuth } from "~/context/auth/auth.hooks";
import api from "~/services/api";
import { replace } from "react-router";

export function PersonalSettings() {
  const { t } = useTranslation();
  const [notifications, setNotifications] = useState(false);

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [nameError, setNameError] = useState(''); 
  const [emailError, setEmailError] = useState('');

  const [oldpassword, setOldPassword] = useState('');
  const [newpassword, setNewPassword] = useState('');
  const [confirmnewpassword, setConfirmNewPassword] = useState('');

  const [oldpasswordError, setOldPasswordError] = useState('');
  const [newpasswordError, setNewPasswordError] = useState('');
  const [confirmnewpasswordError, setConfirmNewPasswordError] = useState('');

  const [statusResPatchInfo, setStatusResPatchInfo] = useState('');
  const [textResPatchInfo, setTextResPatchInfo] = useState('');
  const [statusResPatchInfoSecurity, setStatusResPatchInfoSecurity] = useState('');
  const [textResPatchInfoSecurity, setTextResPatchInfoSecurity] = useState('');

  const { user } = useAuth();

  useEffect(() => {
    if (user?.email) {
      setEmail(user.email)};
    if (user?.name) {
      //Split para pegar o primeiro e o resto do nome
      const [first, ...rest] = user.name.trim().split(' ');
      setFirstName(first);
      setLastName(rest.join(' '));
    }
  }, [user]);
    async function PathInfoUser(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();

      const fullName = `${firstName} ${lastName}`.trim();//Juntando o nome do user
      const payload: Record<string, string> = {};//Payloado para mandar somente o que foi alterado dos dados
      let hasError = false;

      if (!email.trim()) {
        setEmailError(t("settings.personalSettings.sections.personalInformation.form.errors.emailRequired"));
        hasError = true;
      } else {
        setEmailError('');
      }

      if (!firstName.trim()) {
        setFirstNameError(t("settings.personalSettings.sections.personalInformation.form.errors.nameRequired"));
        hasError = true;
      } else {
        setFirstNameError('');
      }
      if (!lastName.trim()) {
        setLastNameError(t("settings.personalSettings.sections.personalInformation.form.errors.nameRequired"));
        hasError = true;
      } else {
        setLastNameError('');
      }

      //Se os valores não mudar, as const Changed serão falsas
      const isEmailChanged = email !== user?.email;
      const isNameChanged = fullName !== user?.name;

      if (!isEmailChanged && !isNameChanged) {
        return;
      }

      //Como os valores mudou, será true e irá vir pra cá dentro do payload
      if (isEmailChanged) payload.email = email;
      if (isNameChanged) payload.name = fullName;

      if (hasError || Object.keys(payload).length === 0) return;

      try {
        const res = await api.patch("users/me", payload);
        if (res.status === 200) {
          setStatusResPatchInfo("success");
          setTextResPatchInfo(t("settings.personalSettings.sections.personalInformation.form.statusMessages.success"));
        } else {
          setStatusResPatchInfo("error");
          setTextResPatchInfo(t("settings.personalSettings.sections.personalInformation.form.statusMessages.error"));
        }
      } catch (err: any) {
        console.log(err);
        setStatusResPatchInfo("error");
        setTextResPatchInfo(t("settings.personalSettings.sections.personalInformation.form.statusMessages.error"));
      }
    }

  async function PathInfoUserSecurity(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let hasError = false;

    if (!oldpassword.trim()) {
      setOldPasswordError(t("settings.personalSettings.sections.personalSecurity.form.errors.oldPasswordRequired"));
      hasError = true;
    } 
    else {
      setOldPasswordError('');

    }

    if (!newpassword.trim()) {
      setNewPasswordError(t("settings.personalSettings.sections.personalSecurity.form.errors.newPasswordRequired"));
      hasError = true;
    } 
    else {
      setNewPasswordError('');
    }

    if (!confirmnewpassword.trim()) {
      setConfirmNewPasswordError(t("settings.personalSettings.sections.personalSecurity.form.errors.confirmNewPasswordRequired"));
      hasError = true;
    } 
    else if (newpassword !== confirmnewpassword) {
      setConfirmNewPasswordError('');
      setStatusResPatchInfoSecurity('error')
      setTextResPatchInfoSecurity(t("settings.personalSettings.sections.personalSecurity.form.errors.passwordsDoNotMatch"));
      hasError = true;
    }

    if (hasError) return;

    try {
      const res = await api.patch("users/me/password", 
        { currentPassword: oldpassword, 
          newPassword: newpassword 
        });
        if (res.status === 200) {
        setStatusResPatchInfoSecurity("success");
        setTextResPatchInfoSecurity(t("settings.personalSettings.sections.personalInformation.form.statusMessages.success"));
      }
    } 
    catch (err: any) {
      setStatusResPatchInfoSecurity("error");
      setTextResPatchInfoSecurity(t("settings.personalSettings.sections.personalInformation.form.statusMessages.error"));
    }
  }

  return (
    <div className="flex flex-col gap-15">
      <section className="space-y-6 rounded-lg" style={{ color: "var(--color-card-text)" }}>
        <div>
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            <User className="h-5 w-5" />
            {t("settings.personalSettings.sections.personalInformation.title")}
          </h2>
          <p style={{ color: "var(--color-card-subtext)" }}>
            {t("settings.personalSettings.sections.personalInformation.description")}
          </p>
        </div>
        <form className="space-y-4" onSubmit={PathInfoUser}>
          {statusResPatchInfo && (
            <div className={`text-[var(--color-text-${statusResPatchInfo})] text-sm p-3 rounded text-center my-4`}>
              {textResPatchInfo}
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input.Root label={t("settings.personalSettings.sections.personalInformation.form.fields.firstName.label")} status={firstNameError ? "error" : undefined} message={firstNameError}>
              <Input.Content
                placeholder={t("settings.personalSettings.sections.personalInformation.form.fields.firstName.placeholder")}
                type="text"
                value={firstName}
                onChange={setFirstName}
                status={firstNameError ? "error" : undefined}
              />
            </Input.Root>
            <Input.Root label={t("settings.personalSettings.sections.personalInformation.form.fields.lastName.label")} status={lastNameError ? "error" : undefined} message={lastNameError}>
              <Input.Content
                placeholder={t("settings.personalSettings.sections.personalInformation.form.fields.lastName.placeholder")}
                type="text"
                value={lastName}
                onChange={setLastName}
                status={lastNameError ? "error" : undefined}
              />
            </Input.Root>
          </div>
          <Input.Root label={t("settings.personalSettings.sections.personalInformation.form.fields.email.label")} status={emailError ? "error" : undefined} message={emailError}>
            <Input.Content
              placeholder={t("settings.personalSettings.sections.personalInformation.form.fields.email.placeholder")}
              type="email"
              value={email}
              onChange={setEmail}
              status={emailError ? "error" : undefined}
            />
          </Input.Root>
          <div className="flex justify-between items-center">
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
              <label htmlFor="notifications" className="text-sm select-none" style={{ color: "var(--color-card-text)" }}>
                {t("settings.personalSettings.sections.personalInformation.form.fields.notificationsToggle.label")}
              </label>
            </div>
            <ButtonSettings text={t("settings.personalSettings.sections.personalInformation.form.buttons.saveChanges")} type="submit" />
          </div>
        </form>
      </section>
      <section className="space-y-6 rounded-lg" style={{ color: "var(--color-card-text)" }}>
        <div>
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            <Shield className="h-5 w-5" />
            {t("settings.personalSettings.sections.personalSecurity.title")}
          </h2>
          <p style={{ color: "var(--color-card-subtext)" }}>
            {t("settings.personalSettings.sections.personalSecurity.description")}
          </p>
        </div>
        <form className="space-y-4" onSubmit={PathInfoUserSecurity}>
          {statusResPatchInfoSecurity && (
            <div className={`text-[var(--color-text-${statusResPatchInfoSecurity})] text-sm p-3 rounded text-center my-4`}>
              {textResPatchInfoSecurity}
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input.Root label={t("settings.personalSettings.sections.personalSecurity.form.fields.oldPassword.label")} status={oldpasswordError ? "error" : undefined} message={oldpasswordError}>
              <Input.Content
                placeholder={t("settings.personalSettings.sections.personalSecurity.form.fields.oldPassword.placeholder")}
                type="password"
                value={oldpassword}
                onChange={setOldPassword}
                status={oldpasswordError ? "error" : undefined}
              />
            </Input.Root>
            <Input.Root label={t("settings.personalSettings.sections.personalSecurity.form.fields.newPassword.label")} status={newpasswordError ? "error" : undefined} message={newpasswordError}>
              <Input.Content
                placeholder={t("settings.personalSettings.sections.personalSecurity.form.fields.newPassword.placeholder")}
                type="password"
                value={newpassword}
                onChange={setNewPassword}
                status={newpasswordError ? "error" : undefined}
              />
            </Input.Root>
          </div>
          <Input.Root label={t("settings.personalSettings.sections.personalSecurity.form.fields.confirmNewPassword.label")} status={confirmnewpasswordError ? "error" : undefined} message={confirmnewpasswordError}>
            <Input.Content
              placeholder={t("settings.personalSettings.sections.personalSecurity.form.fields.confirmNewPassword.placeholder")}
              type="password"
              value={confirmnewpassword}
              onChange={setConfirmNewPassword}
              status={confirmnewpasswordError ? "error" : undefined}
            />
          </Input.Root>

          <div className="flex justify-between items-center mt-7">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium" style={{ color: "var(--color-card-text)" }}>
                {t("settings.personalSettings.sections.personalSecurity.form.fields.twoFactorAuthentication.title")}
              </span>
              <span className="text-sm" style={{ color: "var(--color-card-subtext)" }}>
                {t("settings.personalSettings.sections.personalSecurity.form.fields.twoFactorAuthentication.description")}{" "}
                <a
                  href="#"
                  className="underline hover:opacity-90"
                  style={{ color: "var(--color-card-subtext)" }}
                >
                  {t("settings.personalSettings.sections.personalSecurity.form.fields.twoFactorAuthentication.learnMore")}
                </a>
              </span>
              <button
                className="self-start text-sm mt-2 rounded p-2 border border-[var(--color-text)] text-[var(--color-text)] hover:opacity-90 transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                style={{ background: 'transparent' }}
              >
                {t("settings.personalSettings.sections.personalSecurity.form.fields.twoFactorAuthentication.enableButton")}
              </button>
            </div>
            <ButtonSettings text={t("settings.personalSettings.sections.personalSecurity.form.buttons.saveChanges")} type="submit" />
          </div>
        </form>
      </section>
    </div>
  );
}
