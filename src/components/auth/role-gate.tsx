"use client";

import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@/types/authentication";
import { FormError } from "../form-error";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
}

export const RoleGate = ({ children, allowedRoles }: RoleGateProps) => {
  const role = useCurrentRole();

  if (!role || !allowedRoles.includes(role)) {
    return (
      <FormError message="You do not have permission to view this content!" />
    );
  }

  return <>{children}</>;
};
