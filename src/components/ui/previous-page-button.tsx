"use client";

import { cn } from "@/lib/utils";

import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./button";

interface PreviousPageProps {
  variant?: "default" | "secondary" | "ghost";
  className?: string;
  children?: React.ReactNode;
}

export function PreviousPageButton({
  variant,
  className,
  children,
}: PreviousPageProps) {
  const router = useRouter();

  const navigateBack = () => {
    router.back();
  };

  return (
    <Button
      onClick={navigateBack}
      aria-label="back-button"
      variant={variant}
      className={cn("group", className)}
    >
      <ArrowLeftIcon
        aria-hidden
        className="mr-3 h-5 w-5 transition-transform duration-500 group-hover:-translate-x-2"
      />
      {children || "Previous Page"}
    </Button>
  );
}
