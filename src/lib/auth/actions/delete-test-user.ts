"use server";

import { client } from "@/lib/sanity/client";

export async function deleteTestUser() {
  await client.delete({
    query: `*[_type == "user" && email == "keke@keke.com"]`,
  });
}
