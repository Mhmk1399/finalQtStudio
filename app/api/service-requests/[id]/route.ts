import { NextRequest, NextResponse } from "next/server";
import ServiceRequest from "@/models/customersData/serviceRequests";
import connect from "@/lib/data";

// GET - Get service request by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connect();
    const serviceRequest = await ServiceRequest.findById(params.id)
      .populate("projectId", "title name")
      .populate("serviceId", "name basePrice")
      .populate("requestedBy", "name")
      .populate("approvedBy", "name");

    if (!serviceRequest) {
      return NextResponse.json(
        {
          success: false,
          error: "Service request not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: serviceRequest,
    });
  } catch (error) {
    console.error("GET Service Request Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch service request",
      },
      { status: 500 }
    );
  }
}

// PATCH - Update service request by ID
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connect();

    const body = await request.json();
    const serviceRequest = await ServiceRequest.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    );

    if (!serviceRequest) {
      return NextResponse.json(
        {
          success: false,
          error: "Service request not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: serviceRequest,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to update service request",
      },
      { status: 400 }
    );
  }
}

// DELETE - Delete service request by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connect();

    const serviceRequest = await ServiceRequest.findByIdAndDelete(params.id);

    if (!serviceRequest) {
      return NextResponse.json(
        {
          success: false,
          error: "Service request not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Service request deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete service request",
      },
      { status: 500 }
    );
  }
}
