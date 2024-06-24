"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updateSettings } from "@/lib/next-auth/actions/settings";
import { SettingsSchema } from "@/lib/zod/auth-forms";
import { UserRole } from "@/types/authentication";
import { User } from "next-auth";

export const ProfileForm = ({ user }: { user: User }) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const isOauth = user?.isOAuth;

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: user?.name || "",
      role: user?.role as UserRole,
      email: user?.email || "",
      password: "",
      newPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      updateSettings(values)
        .then((data) => {
          if (data?.error) {
            setError(data.error);
          } else if (data?.success) {
            setSuccess(data.success);
          }
        })
        .catch(() => setError("Something went wrong"));
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6"
        data-test-id="profile-form"
      >
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending || isOauth}
                    data-test-id="profile-form-name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled
                    type="email"
                    data-test-id="profile-form-email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending || isOauth}
                    type="password"
                    data-test-id="profile-form-password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending || isOauth}
                    type="password"
                    data-test-id="profile-form-newPassword"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button
          disabled={isPending || isOauth}
          type="submit"
          className="w-full"
          data-test-id="profile-save-button"
        >
          Save
        </Button>
        {isOauth && (
          <p className="text-sm text-destructive">
            You are using an OAuth provider to sign in. You cannot change your
            profile details.
          </p>
        )}
      </form>
    </Form>
  );
};
