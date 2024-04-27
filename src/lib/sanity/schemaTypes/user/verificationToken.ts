import { TokenIcon } from "@sanity/icons";
import { defineField } from "sanity";

const verificationToken = {
  name: "verificationToken",
  title: "Verification Token",
  type: "document",
  icon: TokenIcon,
  fields: [
    defineField({
      name: "identifier",
      title: "Identifier",
      type: "string",
    }),
    defineField({
      name: "token",
      title: "Token",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "expires",
      title: "Token Expiry",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "token",
    },
  },
};

export default verificationToken;
