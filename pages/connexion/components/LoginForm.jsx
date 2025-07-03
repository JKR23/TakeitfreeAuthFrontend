"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import LoginButton from "@/pages/connexion/components/LoginButton";
import SigninButton from "@/pages/connexion/components/signinButton";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const onSubmit = async (data) => {
    setServerError("");
    setSuccessMessage("");

    try {
      const response = await fetch("https://takeitfreeauthbackend-83rr.onrender.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setServerError(errorData.message || "Échec de la connexion.");
        return;
      }

      const result = await response.json();
      if (result.token) {
        const redirectUrl = `https://take-it-free-item-management-fronte.vercel.app/?token=${encodeURIComponent(result.token)}`;
        window.location.href = redirectUrl;
      } else {
        setServerError("Aucun token reçu.");
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
      setServerError("Erreur de connexion au serveur.");
    }
  };

  const handleForgotPassword = () => {
    window.location.href = "/recover_password";
  };

  return (
    <div className="flex justify-center mt-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm space-y-4 bg-green-800 bg-opacity-10 backdrop-blur-sm p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold text-white text-center mb-4">
          Connexion
        </h2>

        {/* Email */}
        <input
          type="email"
          placeholder="Email*"
          {...register("email", {
            required: "L'email est requis.",
            validate: {
              hasAt: (v) => v.includes("@") || "Doit contenir '@'.",
              format: (v) =>
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ||
                "Format email invalide.",
            },
          })}
          className="w-full px-4 py-2 border-b border-gray-300 rounded focus:border-green-600 focus:outline-none bg-transparent text-white placeholder-white"
        />
        {errors.email && (
          <p className="text-red-600 italic text-sm">{errors.email.message}</p>
        )}

        {/* Mot de passe */}
        <input
          type="password"
          placeholder="Mot de passe*"
          {...register("password", {
            required: "Le mot de passe est requis.",
          })}
          className="w-full px-4 py-2 border-b border-gray-300 rounded focus:border-green-600 focus:outline-none bg-transparent text-white placeholder-white"
        />
        {errors.password && (
          <p className="text-red-600 italic text-sm">{errors.password.message}</p>
        )}

        {/* Message d'erreur ou succès */}
        {serverError && (
          <p className="text-red-600 italic text-sm">{serverError}</p>
        )}
        {successMessage && (
          <p className="text-green-400 italic text-sm">{successMessage}</p>
        )}

        {/* Bouton Connexion */}
        <LoginButton disabled={isSubmitting} />

        {/* Lien mot de passe oublié */}
        <div className="text-center">
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-sm text-yellow-400 hover:underline mt-1 cursor-pointer italic"
          >
            Mot de passe oublié ?
          </button>
        </div>

        {/* Section création de compte */}
        <div className="mt-6 text-center flex items-center justify-center gap-2">
          <span className="flex-grow border-t border-white"></span>
          <p className="text-sm text-white mx-2 whitespace-nowrap">Êtes-vous nouveau ?</p>
          <SigninButton />
          <span className="flex-grow border-t border-white"></span>
        </div>
      </form>
    </div>
  );
}
