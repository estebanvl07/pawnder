import { Icon } from "@iconify/react/dist/iconify.js";
import { AnimatePresence } from "framer-motion";
import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <main className="flex h-screen items-center justify-center">
      <div className="flex max-w-6xl items-center justify-center">
        <aside className="flex flex-1 flex-col gap-y-4">
          <div className="flex gap-x-2 text-center">
            <Icon icon="ion:paw" width={18} />
            <span className="font-semibold">PAWNDER</span>
          </div>
          <h2 className="text-6xl">¡ENCUENTRA TU MASCOTA PERFECTA!</h2>
          <p className="max-w-sm">
            Una plataforma dedicada para encontrar hogar y refugio a los
            animales
          </p>
        </aside>
        <div className="flex max-w-2xl flex-1 items-center justify-center">
          {children}
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
