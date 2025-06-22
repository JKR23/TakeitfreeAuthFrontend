"use client";

export default function RegisterButton({ disabled }) {
 return (
  <button
   type="submit"
   className="w-full bg-green-600 cursor-pointer hover:bg-green-700 text-white py-2 px-4 rounded mt-4 disabled:opacity-50"
   disabled={disabled}
  >
   Créer votre compte
  </button>
 );
}
