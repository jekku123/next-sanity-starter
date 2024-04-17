"use client";

import { cn } from "@/lib/utils";

import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button, ButtonProps } from "./button";

interface PreviousPageProps extends ButtonProps {}

export function PreviousPageButton({
  className,
  children,
  ...props
}: PreviousPageProps) {
  const router = useRouter();

  const navigateBack = () => {
    router.back();
  };

  return (
    <Button
      onClick={navigateBack}
      aria-label="back-button"
      className={cn("group", className)}
      {...props}
    >
      <ArrowLeftIcon
        aria-hidden
        className="mr-3 h-5 w-5 transition-transform duration-500 group-hover:-translate-x-2"
      />
      {children || "Previous Page"}
    </Button>
  );
}
