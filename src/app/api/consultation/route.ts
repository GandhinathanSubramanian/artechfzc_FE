import { NextRequest, NextResponse } from "next/server";

import { sanityClient } from "@/lib/sanity";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const doc = await sanityClient.create({
      _type: "consultationForms",
      name: data.name,
      phone: data.phone,
      email: data.email,
      serviceName: data.serviceName,
      serviceType: data.serviceType,
      description: data.description,
      submittedAt: new Date().toISOString(),
      status: "Pending",
    });

    console.log("Sanity response:", doc);

    return NextResponse.json({ success: true, doc });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Failed to submit form" },
      { status: 500 }
    );
  }
}
