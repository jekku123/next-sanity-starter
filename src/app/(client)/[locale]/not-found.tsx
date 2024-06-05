"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="mt-9 flex flex-col items-center gap-4">
      <p className="text-2xl font-semibold tracking-tight">Page not found :(</p>
      <Button onClick={() => router.back()} aria-label="backbutton">
        Back to previous page
      </Button>
    </div>
  );
}
