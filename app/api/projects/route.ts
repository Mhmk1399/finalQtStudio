import { NextRequest, NextResponse } from 'next/server';
import Project from '@/models/customersData/projects';

// GET - Get all projects
export async function GET() {
  try {
    const projects = await Project.find({});
    return NextResponse.json({
      success: true,
      data: projects
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch projects'
    }, { status: 500 });
  }
}

// POST - Create new project
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const project = new Project(body);
    await project.save();
    
    return NextResponse.json({
      success: true,
      data: project
    }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to create project'
    }, { status: 400 });
  }
}
