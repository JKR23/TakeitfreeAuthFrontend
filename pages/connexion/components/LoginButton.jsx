// ConnexionButton.jsx
export default function ConnexionButton({ disabled = false }) {
 return (
  <button
   type="submit"
   disabled={disabled}
   className={`w-full bg-green-700 cursor-pointer text-white py-2 px-4 rounded hover:bg-green-700 transition ${
    disabled ? "opacity-50 cursor-not-allowed" : ""
   }`}
  >
   Se connecter
  </button>
 );
}
