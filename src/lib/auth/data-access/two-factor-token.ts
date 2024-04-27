import { client } from "@/lib/sanity/client";

export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    const twoFactorTokenQry = `*[_type == "twoFactorToken" && identifier == "${email}"][0]`;
    const twoFactorToken = await client.fetch(twoFactorTokenQry);

    return twoFactorToken;
  } catch (error) {
    return null;
  }
};

export const getTwoFactorTokenByToken = async (token: string) => {
  try {
    const twoFactorTokenQry = `*[_type == "twoFactorToken" && token == "${token}"][0]`;
    const twoFactorToken = await client.fetch(twoFactorTokenQry);

    return twoFactorToken;
  } catch (error) {
    return null;
  }
};
