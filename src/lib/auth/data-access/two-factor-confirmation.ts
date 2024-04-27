import { client } from "@/lib/sanity/client";

export const getTwoFactorConfirmationByUserId = async (userId: string) => {
  try {
    const twoFactorConfirmationQry = `*[_type == "twoFactorConfirmation" && userId == "${userId}"][0]`;
    const twoFactorConfirmation = await client.fetch(twoFactorConfirmationQry);

    return twoFactorConfirmation;
  } catch (error) {
    return null;
  }
};
