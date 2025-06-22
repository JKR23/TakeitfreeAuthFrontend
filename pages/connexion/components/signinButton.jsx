// ConnexionButton.jsx
export default function SigninButton() {
 const handleClick = () => {
  // Redirection vers la page d'inscription
  window.location.href = "/signin";
 };

 return (
  <button
   type="button"
   className="text-green-400 cursor-pointer hover:underline font-medium italic"
   onClick={handleClick}
  >
   Créez votre compte
  </button>
 );
}
