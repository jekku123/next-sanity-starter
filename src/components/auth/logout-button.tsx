"use client";

import { logoutAction } from "@/lib/next-auth/actions/logout";

interface LogoutButtonProps {
  children?: React.ReactNode;
}

export const LogoutButton = ({ children }: LogoutButtonProps) => {
  const onClick = () => {
    logoutAction();
  };

  return (
    <span
      onClick={onClick}
      className="cursor-pointer"
      data-test-id="logout-button"
      aria-label="Logout button"
    >
      {children}
    </span>
  );
};
