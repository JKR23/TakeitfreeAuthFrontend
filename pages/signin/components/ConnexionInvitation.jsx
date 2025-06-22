"use client";

export default function ConnexionInvitation() {
  const handleClick = () => {
    window.location.href = "/connexion"; // Redirection vers la page de connexion
  };

  return (
    <div className="mt-6 text-center text-sm text-white">
      <span>Déjà inscrit ? </span>
      <button
        type="button"
        className="text-green-400 cursor-pointer hover:underline font-medium"
        onClick={handleClick}
      >
        Connectez-vous
      </button>
    </div>
  );
}
