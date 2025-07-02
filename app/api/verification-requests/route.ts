import { NextRequest, NextResponse } from 'next/server';
import VerificationRequest from '@/models/customersData/verificationRequests';

// GET - Get all verification requests
export async function GET() {
  try {
    const verificationRequests = await VerificationRequest.find({});
    return NextResponse.json({
      success: true,
      data: verificationRequests
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch verification requests'
    }, { status: 500 });
  }
}

// POST - Create new verification request
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const verificationRequest = new VerificationRequest(body);
    await verificationRequest.save();
    
    return NextResponse.json({
      success: true,
      data: verificationRequest
    }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to create verification request'
    }, { status: 400 });
  }
}
