import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_PRODUCTION!,
  apiVersion: "2025-08-20",
  token: process.env.SANITY_WRITE_TOKEN!,
  useCdn: false,
});
