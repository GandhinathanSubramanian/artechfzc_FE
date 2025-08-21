import ImageComponent from "@/components/image";

import { type SubServiceTypes } from "@/lib/interface";

import { getServiceByName } from "@/lib/api";

export default async function ServiceTypePage({
  params,
}: {
  params: Promise<{ serviceType: string }>;
}) {
  const { serviceType } = await params;
  console.log(serviceType, "serviceType");
  const service = await getServiceByName(serviceType.replace(/_/g, " "));

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
        {service.items?.map((sub: SubServiceTypes, idx: number) => (
          <li
            key={idx}
            className="border rounded-lg p-4 bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110"
          >
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
