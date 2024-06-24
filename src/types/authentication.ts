export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}

export type User = {
  _id: string;
  name: string;
  email: string;
  emailVerified: string;
  image: string;
  password: string;
  role: string;
  accounts: Account[];
  sessions: Session[];
};

export type Account = {
  _id: string;
  _ref?: string;
  _type?: string;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refreshToken: string;
  accessToken: string;
  expiresAt: number;
  tokenType: string;
  scope: string;
  idToken: string;
  sessionState: string;
  user: User;
};

export type Session = {
  _id: string;
  sessionToken: string;
  userId: string;
  expires: string;
  user: User;
};

export type VerificationToken = {
  _id: string;
  identifier: string;
  token: string;
  expires: string;
};

export type PasswordResetToken = {
  _id: string;
  identifier: string;
  token: string;
  expires: string;
};

export type SessionUser =
  | (User & {
      role: UserRole;
      isOAuth: boolean;
    })
  | undefined;
