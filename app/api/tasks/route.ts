import { NextRequest, NextResponse } from 'next/server';
import Task from '@/models/tasks';
import connect from '@/lib/data';

// GET - Get all tasks
export async function GET() {
  try {
    await connect();
    const tasks = await Task.find({})
      .populate('serviceRequestId', 'title requirements')
      .populate('assignedTeamId', 'name specialization')
      .populate('assignedUserId', 'name role')
      .sort({ createdAt: -1 });
    
    return NextResponse.json({
      success: true,
      data: tasks
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch tasks'
    }, { status: 500 });
  }
}

// POST - Create new task
export async function POST(request: NextRequest) {
  try {
    await connect();
    const body = await request.json();
    const task = new Task(body);
    await task.save();
    
    // Populate the related data in response
    await task.populate([
      { path: 'serviceRequestId', select: 'title requirements' },
      { path: 'assignedTeamId', select: 'name specialization' },
      { path: 'assignedUserId', select: 'name role' }
    ]);
    
    return NextResponse.json({
      success: true,
      data: task,
      message: 'Task created successfully'
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating task:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to create task'
    }, { status: 400 });
  }
}
