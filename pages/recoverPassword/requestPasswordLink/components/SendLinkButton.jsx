"use client";

export default function SendLinkButton({ disabled }) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="w-full bg-green-600 text-white py-2 px-4 rounded cursor-pointer hover:bg-green-700 transition duration-200 font-semibold"
    >
      Envoyer le lien
    </button>
  );
}
