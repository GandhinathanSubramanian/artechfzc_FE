import ImageComponent from "@/components/image";

import { getServiceByName } from "@/lib/api";

interface SubService {
  title: string;
  description: string;
  imageUrl?: string;
}

export default async function ServiceDetail({
  params,
}: {
  params: { serviceType: string };
}) {
  const service = await getServiceByName(params.serviceType.replace(/_/g, " "));

  if (!service) return <div>Service not found</div>;

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{service.title}</h1>
      {service.imageUrl && (
        <ImageComponent src={service.imageUrl} alt={service.title} />
      )}
      <p className="mb-6">{service.description}</p>
      <h2 className="text-2xl font-semibold mb-4">Sub-services</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {service.items?.map((sub: SubService, idx: number) => (
          <li key={idx} className="border rounded-lg p-4 shadow bg-white">
            {sub.imageUrl && (
              <ImageComponent src={sub.imageUrl} alt={sub.title} />
            )}
            <h3 className="text-lg font-semibold">{sub.title}</h3>
            <p>{sub.description}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
