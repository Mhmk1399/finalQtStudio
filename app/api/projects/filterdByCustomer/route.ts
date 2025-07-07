import { NextRequest, NextResponse } from "next/server";
import connect from "@/lib/data";
import Project from "@/models/customersData/projects";

export async function GET(request: NextRequest) {
  try {
    await connect();
    const customerId = request.headers.get("customerId");
    const projects = await Project.find({});
    const filteredData = projects.filter(
      (project) => project.customerId === customerId
    );
    console.log(filteredData);
    return NextResponse.json({
      success: true,
      data: filteredData,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch contracts",
      },
      { status: 500 }
    );
  }
}
