import Link from "next/link";

import ImageComponent from "@/components/image";
import { type ServiceTypes } from "@/lib/interface";

import { ServicesApi } from "@/lib/api";

export default async function HomePage() {
  return (
    <div>
      {/* banner */}
      {/* overview */}
      {/* our services */}
      <h1 className="text-3xl font-bold mb-8 text-center">Our Services</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
        {ServicesApi.map((service: ServiceTypes) => (
          <Link
            key={service._id}
            href={`/service/${service.title.replace(/ /g, "_")}`}
            passHref
          >
            <li
              key={service._id}
              className="group flex flex-col bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-110"
            >
              {service.imageUrl && (
                <ImageComponent src={service.imageUrl} alt={service.title} />
              )}
              <h2 className="text-xl font-semibold mb-2">{service.title}</h2>
              <p className="text-gray-700 mb-4">{service.description}</p>
            </li>

            {/* 
              <div class="w-full relative mx-auto h-auto overflow-hidden rounded-lg ">
<img src="https://pagedone.io/asset/uploads/1688031162.jpg" alt="image" class="w-full h-auto relative z-0 rounded-lg transition-all duration-300 hover:scale-110">
</div> */}
          </Link>
        ))}
      </ul>
    </div>
  );
}
