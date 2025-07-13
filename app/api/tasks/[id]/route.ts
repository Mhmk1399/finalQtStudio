import { NextRequest, NextResponse } from "next/server";
import Task from "@/models/tasks";
import connect from "@/lib/data";

// GET - Get task by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connect();
    const task = await Task.findById(params.id)
      .populate("serviceRequestId", "title requirements")
      .populate("assignedTeamId", "name specialization")
      .populate("assignedUserId", "name role");

    if (!task) {
      return NextResponse.json(
        {
          success: false,
          error: "Task not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: task,
    });
  } catch (error) {
    console.error("GET Task Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch task",
      },
      { status: 500 }
    );
  }
}

// PUT - Update task by ID
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connect();
    const body = await request.json();

    console.log("PUT Request - ID:", params.id);
    console.log("PUT Request - Body:", body);

    // If status is being changed to completed, set completedDate
    if (body.status === "completed" && !body.completedDate) {
      body.completedDate = new Date();
    }

    const task = await Task.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    }).populate([
      { path: "serviceRequestId", select: "title requirements" },
      { path: "assignedTeamId", select: "name specialization" },
      { path: "assignedUserId", select: "name role" },
    ]);

    if (!task) {
      return NextResponse.json(
        {
          success: false,
          error: "Task not found",
        },
        { status: 404 }
      );
    }

    console.log("PUT Response - Updated Task:", task);

    return NextResponse.json({
      success: true,
      data: task,
      message: "Task updated successfully",
    });
  } catch (error: any) {
    console.error("PUT Task Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to update task",
      },
      { status: 400 }
    );
  }
}

// PATCH - Partial update task by ID
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connect();
    const body = await request.json();

    console.log("PATCH Request - ID:", params.id);
    console.log("PATCH Request - Body:", body);

    // If status is being changed to completed, set completedDate
    if (body.status === "completed" && !body.completedDate) {
      body.completedDate = new Date();
    }

    const task = await Task.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    }).populate([
      { path: "serviceRequestId", select: "title requirements" },
      { path: "assignedTeamId", select: "name specialization" },
      { path: "assignedUserId", select: "name role" },
    ]);

    if (!task) {
      return NextResponse.json(
        {
          success: false,
          error: "Task not found",
        },
        { status: 404 }
      );
    }

    console.log("PATCH Response - Updated Task:", task);

    return NextResponse.json({
      success: true,
      data: task,
      message: "Task updated successfully",
    });
  } catch (error: any) {
    console.error("PATCH Task Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to update task",
      },
      { status: 400 }
    );
  }
}

// DELETE - Delete task by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connect();
    const task = await Task.findByIdAndDelete(params.id);

    if (!task) {
      return NextResponse.json(
        {
          success: false,
          error: "Task not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error("DELETE Task Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete task",
      },
      { status: 500 }
    );
  }
}
