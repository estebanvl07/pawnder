import { Spinner } from "@heroui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useMyUser } from "~/hooks/useMyUser";

const withAuthRedirect = (WrappedComponent: React.ComponentType) => {
  return (props: any) => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const { user, isLoading } = useMyUser();

    useEffect(() => {
      if (user) {
        user.accountStep === 1 && router.push("/paw/complete_profile");
        user.accountStep === 2 &&
          router.push("/paw/complete_profile/create_password");
        if (user.accountStep === 3) {
          if (status === "loading") return;
          if (session) router.push("/paw");
        }
      }
    }, [session, status, router, isLoading]);

    if (status === "loading" || session || isLoading) {
      return (
        <div className="flex h-screen w-full flex-col items-center justify-center">
          <Spinner size="lg" color="primary" />
          <span className="mt-2 text-lg">Cargando...</span>
        </div>
      ); // Show loading while checking session
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuthRedirect;
