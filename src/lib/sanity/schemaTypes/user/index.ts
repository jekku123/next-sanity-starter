import account from "./account";
import passwordResetToken from "./password-reset-token";
import session from "./session";
import user from "./user";
import verificationToken from "./verification-token";

export const userSchemaTypes = [
  user,
  session,
  account,
  verificationToken,
  passwordResetToken,
];
