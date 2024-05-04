"use client";

import { useCurrentUser } from "@/hooks/use-current-user";

type AuthGateClientProps = {
  children: React.ReactNode;
  isProtected?: boolean;
};

export default function AuthGateClient({
  children,
  isProtected = false,
}: AuthGateClientProps) {
  const user = useCurrentUser();

  if (!user && isProtected) {
    return null;
  }

  return <>{children}</>;
}
