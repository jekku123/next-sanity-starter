// export const apiVersion =
//   process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-03-05";

// export const dataset = assertValue(
//   process.env.NEXT_PUBLIC_SANITY_DATASET,
//   "Missing environment variable: NEXT_PUBLIC_SANITY_DATASET",
// );

// export const projectId = assertValue(
//   process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
//   "Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID",
// );

// function assertValue<T>(v: T | undefined, errorMessage: string): T {
//   if (v === undefined) {
//     throw new Error(errorMessage);
//   }

//   return v;
// }

// src/env.mjs
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {},
  client: {
    NEXT_PUBLIC_SANITY_API_VERSION: z.string().optional(),
    NEXT_PUBLIC_SANITY_DATASET: z.string(),
    NEXT_PUBLIC_SANITY_PROJECT_ID: z.string(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_SANITY_API_VERSION:
      process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-03-05",
    NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  },
});

export const useCdn = false;
