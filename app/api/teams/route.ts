import { NextRequest, NextResponse } from 'next/server';
import Team from '@/models/teams';

// GET - Get all teams
export async function GET() {
  try {
    const teams = await Team.find({});
    return NextResponse.json({
      success: true,
      data: teams
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch teams'
    }, { status: 500 });
  }
}

// POST - Create new team
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const team = new Team(body);
    await team.save();
    
    return NextResponse.json({
      success: true,
      data: team
    }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to create team'
    }, { status: 400 });
  }
}
