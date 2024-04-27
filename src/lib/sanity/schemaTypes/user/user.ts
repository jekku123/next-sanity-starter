import { UserIcon } from "@sanity/icons";
import { defineField } from "sanity";

const user = {
  name: "user",
  title: "User",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description: "Name of the user",
    }),
    defineField({
      name: "email",
      title: "User Email",
      type: "string",
      description: "User Email",
    }),
    defineField({
      name: "emailVerified",
      title: "Email Verification",
      type: "datetime",
    }),
    defineField({
      name: "image",
      title: "User Image",
      type: "string",
    }),
    defineField({
      name: "password",
      title: "User Password",
      type: "string",
      hidden: true,
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      initialValue: "USER",
      options: {
        list: ["ADMIN", "USER"],
      },
    }),
    defineField({
      name: "accounts",
      title: "Accounts",
      type: "reference",
      to: [{ type: "account" }],
    }),
  ],
  preview: {
    select: {
      title: "name",
    },
  },
};

export default user;
