"use client";

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();
  const t = useTranslations("NotFound");

  return (
    <div className="mt-9 flex flex-col items-center gap-4">
      <p className="text-2xl font-semibold tracking-tight">{t("title")}</p>
      <Button onClick={() => router.back()} aria-label="backbutton">
        {t("back-to-previous-page")}
      </Button>
    </div>
  );
}
