"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { createSubmissionAction } from "@/lib/sanity/actions/submissions";
import { ContactFormType, contactFormBaseSchema } from "@/lib/zod/contact-form";
import { useTranslations } from "next-intl";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

export const ContactForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const t = useTranslations("ContactForm");

  const translatedErrors = {
    name: t("errors.name"),
    email: t("errors.email"),
    message: t("errors.message"),
  };

  const contactFormSchema = contactFormBaseSchema(translatedErrors);

  const form = useForm<ContactFormType>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
    mode: "onBlur",
  });

  const onSubmit = (values: ContactFormType) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      createSubmissionAction(values)
        .then((data) => {
          if (data?.errors) {
            const errors = data.errors;

            if (errors.name) {
              form.setError("name", {
                message: errors.name[0],
                type: "server",
              });
            } else if (errors.email) {
              form.setError("email", {
                message: errors.email[0],
                type: "server",
              });
            } else if (errors.message) {
              form.setError("message", {
                message: errors.message[0],
                type: "server",
              });
            }
          }

          if (data?.success) {
            form.reset();
            setSuccess("Message sent successfully");
          }
        })
        .catch(() => setError("Something went wrong"));
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
        data-test-id="contact-form"
      >
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("name")}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="John Doe"
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
                <FormLabel>{t("email")}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="john@doe.com"
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("message")}</FormLabel>
                <FormControl>
                  <Textarea
                    className="resize-none"
                    {...field}
                    disabled={isPending}
                    placeholder={t("message-placeholder")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button disabled={isPending} type="submit" className="w-full">
          {t("submit")}
        </Button>
      </form>
    </Form>
  );
};
