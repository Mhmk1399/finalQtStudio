import { NextRequest, NextResponse } from "next/server";
import Service from "@/models/customersData/services";
import connect from "@/lib/data";

// GET - Get all services
export async function GET() {
  try {
    await connect();
    const services = await Service.find({}).populate('teamId', 'name specialization');
    return NextResponse.json({
      success: true,
      data: services,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch services",
      },
      { status: 500 }
    );
  }
}

// POST - Create new service
export async function POST(request: NextRequest) {
  try {
    await connect();
    const body = await request.json();
    
    const service = new Service(body);
    await service.save();

    // Populate the team data in response
    await service.populate('teamId', 'name specialization');

    return NextResponse.json(
      {
        success: true,
        data: service,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to create service",
      },
      { status: 400 }
    );
  }
}
