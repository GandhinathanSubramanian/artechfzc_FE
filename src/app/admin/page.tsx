"use client";

import { useEffect, useState } from "react";

import { sanityClient } from "@/lib/sanity";

export default function AdminTable() {
  const [, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const submissions = await sanityClient.fetch(
        '*[_type=="consultationForms"] | order(submittedAt desc)'
      );
      setData(submissions);
    }
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Consultation Submissions</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-2 py-1">Name</th>
            <th className="border px-2 py-1">Phone</th>
            <th className="border px-2 py-1">Email</th>
            <th className="border px-2 py-1">Service Name</th>
            <th className="border px-2 py-1">Service Type</th>
            <th className="border px-2 py-1">Description</th>
            <th className="border px-2 py-1">Submitted At</th>
            <th className="border px-2 py-1">Status</th>
          </tr>
        </thead>
        <tbody>
          {/* {data.map((item) => (
            <tr key={item._id} className="hover:bg-gray-100">
              <td className="border px-2 py-1">{item.name}</td>
              <td className="border px-2 py-1">{item.phone}</td>
              <td className="border px-2 py-1">{item.email}</td>
              <td className="border px-2 py-1">{item.serviceName}</td>
              <td className="border px-2 py-1">{item.serviceType}</td>
              <td className="border px-2 py-1">{item.description}</td>
              <td className="border px-2 py-1">
                {new Date(item.submittedAt).toLocaleString()}
              </td>
              <td className="border px-2 py-1">{item.status}</td>
            </tr>
          ))} */}
          Table body needs to work
        </tbody>
      </table>
    </div>
  );
}
