'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';

import SendLinkButton from '@/pages/recoverPassword/requestPasswordLink/components/SendLinkButton';
import BackToLoginButton from '@/pages/recoverPassword/requestPasswordLink/components/BackToLoginButton';

export default function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    reset, // Pour vider les champs
    formState: { errors, isSubmitting },
  } = useForm();

  const [successMessage, setSuccessMessage] = useState('');
  const [serverError, setServerError] = useState('');

  const onSubmit = async (data) => {
    setServerError('');
    setSuccessMessage('');

    try {
      const response = await fetch('http://localhost:8081/password-reset/obtain-resetLink', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: data.email }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Erreur lors de l'envoi du lien.");
      }

      setSuccessMessage(result.message || "Lien envoyé avec succès.");

      // ✅ Vide le champ après 2 secondes
      setTimeout(() => {
        reset();
      }, 2000);

      // ✅ Efface le message de succès après 5 secondes
      setTimeout(() => {
        setSuccessMessage('');
      }, 2000);

    } catch (error) {
      setServerError(error.message || "Erreur lors de l'envoi de l'email.");
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm space-y-4 bg-green-800 bg-opacity-10 backdrop-blur-sm p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold text-white text-center mb-4">
          Mot de passe oublié
        </h2>

        <p className="text-white text-sm text-center mb-2">
          Entrez votre adresse email pour recevoir un lien de réinitialisation.
        </p>

        <input
          type="email"
          placeholder="Votre email*"
          {...register('email', {
            required: "L'email est requis.",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Format email invalide.',
            },
          })}
          className="w-full px-4 py-2 border-b border-gray-300 rounded focus:border-green-600 focus:outline-none bg-transparent text-white placeholder-white"
        />
        {errors.email && (
          <p className="text-red-600 italic text-sm">{errors.email.message}</p>
        )}

        {serverError && (
          <p className="text-red-600 italic text-sm">{serverError}</p>
        )}
        {successMessage && (
          <p className="text-green-400 italic text-sm">{successMessage}</p>
        )}

        <SendLinkButton disabled={isSubmitting} />
        <BackToLoginButton />
      </form>
    </div>
  );
}
