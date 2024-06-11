"use client";

import { cn } from "@/lib/utils";

import { ArrowLeftIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Button, ButtonProps } from "./button";

interface PreviousPageProps extends ButtonProps {}

export function PreviousPageButton({
  className,
  children,
  ...props
}: PreviousPageProps) {
  const t = useTranslations("BackButton");
  const router = useRouter();

  const navigateBack = () => {
    router.back();
  };

  return (
    <div className="flex">
      <Button
        onClick={navigateBack}
        aria-label="back-utton"
        className={cn("group", className)}
        data-test-id="previous-page-button"
        {...props}
      >
        <ArrowLeftIcon
          aria-hidden
          className="mr-3 h-5 w-5 transition-transform duration-500 group-hover:-translate-x-2"
        />
        {children || t("previous-page")}
      </Button>
    </div>
  );
}
