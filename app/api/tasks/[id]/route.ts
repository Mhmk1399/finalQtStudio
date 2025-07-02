import { NextRequest, NextResponse } from 'next/server';
import Task from '@/models/tasks';

// GET - Get task by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const task = await Task.findById(params.id);
    
    if (!task) {
      return NextResponse.json({
        success: false,
        error: 'Task not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: task
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch task'
    }, { status: 500 });
  }
}

// PUT - Update task by ID
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const task = await Task.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    );

    if (!task) {
      return NextResponse.json({
        success: false,
        error: 'Task not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: task
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to update task'
    }, { status: 400 });
  }
}

// DELETE - Delete task by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const task = await Task.findByIdAndDelete(params.id);

    if (!task) {
      return NextResponse.json({
        success: false,
        error: 'Task not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Task deleted successfully'
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to delete task'
    }, { status: 500 });
  }
}
