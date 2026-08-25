"use client";

import { SessionProvider, signIn, useSession } from "next-auth/react";
import { useEffect, useRef } from "react";

function AutoOpenAccess({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const tried = useRef(false);

  useEffect(() => {
    if (status !== "unauthenticated" || tried.current) return;
    tried.current = true;
    void signIn("credentials", {
      email: "open-access@candlepilots.com",
      password: "open-access",
      redirect: false,
    });
  }, [status]);

  return <>{children}</>;
}

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <AutoOpenAccess>{children}</AutoOpenAccess>
    </SessionProvider>
  );
}
