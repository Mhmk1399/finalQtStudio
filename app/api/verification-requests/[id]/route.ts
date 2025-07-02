import { NextRequest, NextResponse } from 'next/server';
import VerificationRequest from '@/models/customersData/verificationRequests';

// GET - Get verification request by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const verificationRequest = await VerificationRequest.findById(params.id);
    
    if (!verificationRequest) {
      return NextResponse.json({
        success: false,
        error: 'Verification request not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: verificationRequest
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch verification request'
    }, { status: 500 });
  }
}

// PUT - Update verification request by ID
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const verificationRequest = await VerificationRequest.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    );

    if (!verificationRequest) {
      return NextResponse.json({
        success: false,
        error: 'Verification request not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: verificationRequest
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to update verification request'
    }, { status: 400 });
  }
}

// DELETE - Delete verification request by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const verificationRequest = await VerificationRequest.findByIdAndDelete(params.id);

    if (!verificationRequest) {
      return NextResponse.json({
        success: false,
        error: 'Verification request not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Verification request deleted successfully'
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to delete verification request'
    }, { status: 500 });
  }
}
