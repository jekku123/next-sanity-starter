"use client";

import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@/types/authentication";
import { FormError } from "../form-error";

interface AuthGateProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
}

export const AuthGate = ({ children, allowedRoles }: AuthGateProps) => {
  const role = useCurrentRole();

  if (!role || !allowedRoles.includes(role)) {
    return (
      <FormError message="You do not have permission to view this content!" />
    );
  }

  return <>{children}</>;
};
