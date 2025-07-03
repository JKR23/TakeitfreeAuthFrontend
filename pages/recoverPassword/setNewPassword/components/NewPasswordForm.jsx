'use client';

import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function NewPasswordForm() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [isTokenValid, setIsTokenValid] = useState(null);
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get('token');

    useEffect(() => {
        const verifyToken = async () => {
            if (!token) {
                setMessage('❌ Token manquant dans l’URL.');
                setIsTokenValid(false);
                return;
            }

            try {
                const res = await fetch(`https://takeitfreeauthbackend-83rr.onrender.com/password-reset/validate-token?token=${token}`);
                if (!res.ok) {
                    setMessage('❌ Ce lien est invalide ou a expiré.');
                    setIsTokenValid(false);
                } else {
                    setIsTokenValid(true);
                }
            } catch {
                setMessage('❌ Erreur lors de la vérification du lien.');
                setIsTokenValid(false);
            }
        };

        verifyToken();
    }, [token]);

    const onSubmit = async (data) => {
        if (!token) {
            setIsSuccess(false);
            setMessage('❌ Token manquant dans l’URL.');
            return;
        }

        try {
            const response = await fetch('https://takeitfreeauthbackend-83rr.onrender.com/password-reset/set-new-password', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: token,
                    newPassword: data.password,
                }),
            });

            if (!response.ok) throw new Error('Échec de la réinitialisation');

            setIsSuccess(true);
            setMessage('✅ Mot de passe réinitialisé avec succès !');
            reset();

            setTimeout(() => {
                window.location.href = 'https://takeitfree-auth-frontend.vercel.app/';
            }, 2000);
        } catch (error) {
            console.error(error);
            setIsSuccess(false);
            setMessage('❌ Impossible de réinitialiser le mot de passe.');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 rounded bg-green-900 text-white shadow-md">
            {message && (
                <p
                    className={`mb-4 font-semibold ${
                        isSuccess ? 'text-green-300' : 'text-red-400'
                    }`}
                >
                    {message}
                </p>
            )}

            {isTokenValid === null && (
                <p className="text-yellow-300">⏳ Vérification du lien...</p>
            )}

            {isTokenValid && (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <input
                        type="password"
                        placeholder="Nouveau mot de passe*"
                        {...register('password', {
                            required: 'Mot de passe requis',
                            minLength: { value: 6, message: 'Min. 6 caractères' },
                        })}
                        className="w-full px-4 py-2 border-b border-gray-300 focus:border-green-500 focus:outline-none text-white rounded"
                    />
                    {errors.password && (
                        <p className="text-red-400">{errors.password.message}</p>
                    )}

                    <button
                        type="submit"
                        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
                    >
                        Confirmer
                    </button>
                </form>
            )}

            {isTokenValid === false && (
                <>
                    <p className="text-red-300 mt-4 text-sm italic">
                        Ce lien de réinitialisation n’est plus valide. Veuillez en demander un nouveau.
                    </p>
                    <button
                        onClick={() => window.location.href = 'https://takeitfree-auth-frontend.vercel.app/recover_password'}
                        className="mt-4 px-4 py-2 bg-green-500 cursor-pointer text-black font-semibold rounded hover:bg-yellow-600 transition"
                    >Demander un nouveau lien
                    </button>
                </>
            )}
        </div>
    );
}
