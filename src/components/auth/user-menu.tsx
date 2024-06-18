"use client";

import { LogoutButton } from "@/components/auth/logout-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "@/navigation";
import { Delete, LogOut, SettingsIcon, UserRound } from "lucide-react";
import { User } from "next-auth";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { DeleteUserDialog } from "./delete-user-dialog";

export const UserMenu = ({ user }: { user: User }) => {
  const [open, setOpen] = useState(false);
  const t = useTranslations("UserMenu");

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger data-test-id="user-menu-button">
          <Avatar>
            <AvatarImage src={user.image || ""} />
            <AvatarFallback>
              <UserRound />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40" align="center">
          <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
          <DropdownMenuItem>
            <SettingsIcon className="mr-2 h-4 w-4" />
            <Link href="/settings">{t("settings")}</Link>
          </DropdownMenuItem>
          <LogoutButton>
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              {t("logout")}
            </DropdownMenuItem>
          </LogoutButton>
          {!user.isOAuth && (
            <DropdownMenuItem
              onClick={() => setOpen(true)}
              data-test-id="delete-user-trigger"
            >
              <Delete className="mr-2 h-4 w-4" />
              {t("delete-account")}
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteUserDialog userId={user.id!} open={open} setOpen={setOpen} />
    </>
  );
};
