import LoginForm from "@/pages/connexion/components/LoginForm";

export default function ConnexionPage() {
 return (
  <div className="min-h-screen flex flex-col items-center justify-center bg-green-900 px-4 py-12">
   <h2 className="text-4xl sm:text-5xl md:text-5xl font-bold leading-tight mb-0 text-center">
             Take it free
             <span className="block">Plus de partage.</span>
   <span className="block">Moins de gaspillage.</span>
   </h2>
   <LoginForm />
  </div>
 );
}
