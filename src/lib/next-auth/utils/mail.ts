import { env } from "@/env";
import { Resend } from "resend";

const resend = new Resend(env.RESEND_EMAIL_SECRET);

const domain = "http://localhost:3000";

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;
  console.log(
    "SendPasswordResetEmail",
    JSON.stringify(
      {
        from: "onboarding@resend.dev",
        to: email,
        subject: "Reset",
        resetLink: resetLink,
      },
      null,
      2,
    ),
  );
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;
  console.log(
    "SendVerificationEmail",
    JSON.stringify(
      {
        from: "onboarding@resend.dev",
        to: email,
        subject: "Confirm",
        confirmLink: confirmLink,
      },
      null,
      2,
    ),
  );
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
  });
};
