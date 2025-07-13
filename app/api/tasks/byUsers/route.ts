import connect from "@/lib/data";
import { NextRequest, NextResponse } from "next/server";
import Task from "@/models/tasks";

export async function GET(request: NextRequest) {
  try {
    await connect();
    const userId = request.headers.get("userId");
    const tasks = await Task.find({});
    const filteredData = tasks.filter((task) => task.userId === userId);
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
