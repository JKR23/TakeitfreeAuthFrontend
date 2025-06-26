"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import RegisterButton from "./RegisterButton";
import ConnexionInvitation from "./ConnexionInvitation";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const [serverError, setServerError] = useState("");

  const onSubmit = async (data) => {
    setServerError("");
    try {
      console.log("Inscription avec :", data);
  
      const response = await fetch("https://takeitfree-auth-h2ajdneuhdfadxc7.eastus-01.azurewebsites.net/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // { email, password, username }
      });
  
      if (!response.ok) {
        // Récupérer le message d'erreur côté serveur si possible
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur serveur");
      }
  
      // Inscription réussie
      alert("Inscription réussie ! Vous pouvez maintenant vous connecter.");

      // Optionnel : redirection vers la page de connexion
      window.location.href = "/connexion";
  
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
      setServerError(error.message || "Erreur lors de l'inscription");
    }
  };
  

  return (
    <div className="flex justify-center mt-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm space-y-4 bg-green-800 bg-opacity-10 backdrop-blur-sm p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold text-white text-center mb-4">
          Inscription
        </h2>

        {/* Username */}
        <input
          type="text"
          placeholder="Nom d'utilisateur*"
          {...register("username", { required: "Nom d'utilisateur requis" })}
          className="w-full px-4 py-2 border-b border-gray-300 rounded focus:border-green-600 focus:outline-none bg-transparent text-white placeholder-white"
        />
        {errors.username && (
          <p className="text-red-600 italic text-sm">{errors.username.message}</p>
        )}

        {/* Email */}
        <input
          type="email"
          placeholder="Email*"
          {...register("email", {
            required: "Email requis",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Format email invalide",
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
          {...register("password", { required: "Mot de passe requis" })}
          className="w-full px-4 py-2 border-b border-gray-300 rounded focus:border-green-600 focus:outline-none bg-transparent text-white placeholder-white"
        />
        {errors.password && (
          <p className="text-red-600 italic text-sm">{errors.password.message}</p>
        )}

        {serverError && <p className="text-red-600 italic text-sm">{serverError}</p>}

        <RegisterButton disabled={isSubmitting} />

        <ConnexionInvitation />
      </form>
    </div>
  );
}
