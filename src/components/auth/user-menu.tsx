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
import { Delete, LogOut, UserRound } from "lucide-react";
import { User } from "next-auth";
import { useState } from "react";
import { DeleteUserDialog } from "./delete-user-dialog";

export const UserMenu = ({ user }: { user: User }) => {
  const [open, setOpen] = useState(false);

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
          <LogoutButton>
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </LogoutButton>
          {!user.isOAuth && (
            <DropdownMenuItem
              onClick={() => setOpen(true)}
              data-test-id="delete-user-trigger"
            >
              <Delete className="mr-2 h-4 w-4" />
              Delete Account
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteUserDialog userId={user.id!} open={open} setOpen={setOpen} />
    </>
  );
};
