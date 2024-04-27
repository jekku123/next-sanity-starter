import account from "./account";
import passwordResetToken from "./passwordResetToken";
import session from "./session";
import user from "./user";
import verificationToken from "./verificationToken";

export const userSchemaTypes = [
  user,
  session,
  account,
  verificationToken,
  passwordResetToken,
];
