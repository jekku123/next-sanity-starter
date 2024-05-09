"use client";

import { deleteUserAction } from "@/lib/next-auth/actions/delete-user";
import { logout } from "@/lib/next-auth/actions/logout";

export default function DeleteAccountButton({
  userId,
  children,
}: {
  userId: string;
  children: React.ReactNode;
}) {
  const onClick = async () => {
    const res = await deleteUserAction({ userId });
    if (res.error) {
      console.error(res.error);
    }
    if (res.success) {
      logout();
    }
  };

  return (
    <span
      onClick={onClick}
      className="cursor-pointer"
      data-test-id="delete-account-button"
      aria-label="Delete account button"
    >
      {children}
    </span>
  );
}
