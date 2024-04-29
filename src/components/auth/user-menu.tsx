import { LogoutButton } from "@/components/auth/logout-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, UserRound } from "lucide-react";
import { User } from "next-auth";

export const UserMenu = async ({ user }: { user: User }) => {
  return (
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
