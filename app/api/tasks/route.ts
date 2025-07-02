import { NextRequest, NextResponse } from 'next/server';
import Task from '@/models/tasks';

// GET - Get all tasks
export async function GET() {
  try {
    const tasks = await Task.find({});
    return NextResponse.json({
      success: true,
      data: tasks
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch tasks'
    }, { status: 500 });
  }
}

// POST - Create new task
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const task = new Task(body);
    await task.save();
    
    return NextResponse.json({
      success: true,
      data: task
    }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to create task'
    }, { status: 400 });
  }
}
