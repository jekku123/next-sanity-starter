"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/lib/next-auth/routes";
import { Icons } from "../icons";

export const SocialLogin = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const onClick = async (provider: "google" | "github") => {
    await signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex w-full items-center gap-x-2">
      <Button
        className="w-full"
        variant="outline"
        onClick={() => onClick("google")}
        disabled
      >
        <Icons.google className="h-5 w-5" />
      </Button>
      <Button
        className="w-full"
        variant="outline"
        onClick={() => onClick("github")}
      >
        <Icons.gitHub className="h-5 w-5" />
      </Button>
    </div>
  );
};
