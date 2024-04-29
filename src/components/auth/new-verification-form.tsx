"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { useSearchParams } from "next/navigation";

import { newVerification } from "@/lib/next-auth/actions/new-verification";
import { LoaderIcon } from "lucide-react";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";

export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const effectRan = useRef(false);

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
    if (effectRan.current === true || process.env.NODE_ENV !== "development") {
      onSubmit();
    }
    return () => {
      effectRan.current = true;
    };
  }, [onSubmit]);

  return (
    <div className="flex w-full items-center justify-center">
      {!success && !error && <LoaderIcon className="animate-spin" />}
      <FormSuccess message={success} />
      {!success && <FormError message={error} />}
    </div>
  );
};
