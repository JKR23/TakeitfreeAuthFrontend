'use client';

import ResetPasswordPage from "@/pages/recoverPassword/setNewPassword/NewPasswordPage";
import { Suspense } from "react";

export default function ResetPassword() {
    return (
        <Suspense fallback={<div className="text-white text-center p-4">Chargement...</div>}>
            <ResetPasswordPage />
        </Suspense>
    );
}
