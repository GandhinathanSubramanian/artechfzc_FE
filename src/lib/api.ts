import { sanityClient } from "@/lib/sanity";

// Fetch services from Sanity
export const ServicesApi = await sanityClient.fetch(
  `*[_type == "service"]{
      _id,
      title,
      description,
      category,
      "imageUrl": image.asset->url
    }`
);

// Query Sanity for a document of type 'service' where title matches the name
export async function getServiceByName(name: string) {
  const query = `*[_type == "service" && title == $name][0]{
  _id, 
  title,
  description,
  "imageUrl": image.asset->url,
  items[]{
    title,
    description,
    "imageUrl": image.asset->url
    }
  }`;

  const params = { name };

  const service = await sanityClient.fetch(query, params);
  return service;
}
