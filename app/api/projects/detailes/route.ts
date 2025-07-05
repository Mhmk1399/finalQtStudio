import { NextRequest, NextResponse } from "next/server";
import Project from "@/models/customersData/projects";
import connect from "@/lib/data";

// GET - Get project by ID
export async function GET(request: NextRequest) {
  try {
    await connect();
    const id = request.headers.get("id");
    const project = await Project.findById(id);

    if (!project) {
      return NextResponse.json(
        {
          success: false,
          error: "Project not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: project,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch project",
      },
      { status: 500 }
    );
  }
}

// PUT - Update project by ID
export async function PUT(request: NextRequest) {
  try {
    await connect();
    const id = request.headers.get("id");
    const body = await request.json();
    const project = await Project.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!project) {
      return NextResponse.json(
        {
          success: false,
          error: "Project not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: project,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to update project",
      },
      { status: 400 }
    );
  }
}

// DELETE - Delete project by ID
export async function DELETE(request: NextRequest) {
  try {
    await connect();
    const id = request.headers.get("id");
    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return NextResponse.json(
        {
          success: false,
          error: "Project not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete project",
      },
      { status: 500 }
    );
  }
}
