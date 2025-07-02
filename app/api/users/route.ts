import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/users';

// GET - Get all users
export async function GET() {
  try {
    const users = await User.find({});
    return NextResponse.json({
      success: true,
      data: users
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch users'
    }, { status: 500 });
  }
}

// POST - Create new user
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const user = new User(body);
    await user.save();
    
    return NextResponse.json({
      success: true,
      data: user
    }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to create user'
    }, { status: 400 });
  }
}
