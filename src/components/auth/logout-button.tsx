"use client";

import { logout } from "@/lib/auth/actions/logout";

interface LogoutButtonProps {
  children?: React.ReactNode;
}

export const LogoutButton = ({ children }: LogoutButtonProps) => {
  const onClick = () => {
    logout();
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
