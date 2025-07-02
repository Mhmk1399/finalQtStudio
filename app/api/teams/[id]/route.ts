import { NextRequest, NextResponse } from 'next/server';
import Team from '@/models/teams';

// GET - Get team by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const team = await Team.findById(params.id);
    
    if (!team) {
      return NextResponse.json({
        success: false,
        error: 'Team not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: team
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch team'
    }, { status: 500 });
  }
}

// PUT - Update team by ID
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const team = await Team.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    );

    if (!team) {
      return NextResponse.json({
        success: false,
        error: 'Team not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: team
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to update team'
    }, { status: 400 });
  }
}

// DELETE - Delete team by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const team = await Team.findByIdAndDelete(params.id);

    if (!team) {
      return NextResponse.json({
        success: false,
        error: 'Team not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Team deleted successfully'
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to delete team'
    }, { status: 500 });
  }
}
