"use client";

export default function BackToLoginButton() {
  const handleClick = () => {
    window.location.href = "/connexion";
  };

  return (
    <div className="text-center mt-4">
      <button
        type="button"
        onClick={handleClick}
        className="text-sm text-yellow-400 italic cursor-pointer hover:underline"
      >
        Retour à la connexion
      </button>
    </div>
  );
}
