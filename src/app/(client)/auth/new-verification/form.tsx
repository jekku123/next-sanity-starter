"use client";

import { useCallback, useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";

import { FormError, FormSuccess } from "@/components/login-form";
import { newVerification } from "@/lib/auth/actions/new-verification";
import { LoaderIcon } from "lucide-react";

export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError("Missing token!");
      return;
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, []);

  return (
    <div className="flex w-full items-center justify-center">
      {!success && !error && <LoaderIcon className="animate-spin" />}
      <FormSuccess message={success} />
      {!success && <FormError message={error} />}
    </div>
  );
};
