import { NextRequest, NextResponse } from 'next/server';
import Contract from '@/models/customersData/contracts';

// GET - Get contract by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const contract = await Contract.findById(params.id);
    
    if (!contract) {
      return NextResponse.json({
        success: false,
        error: 'Contract not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: contract
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch contract'
    }, { status: 500 });
  }
}

// PUT - Update contract by ID
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const contract = await Contract.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    );

    if (!contract) {
      return NextResponse.json({
        success: false,
        error: 'Contract not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: contract
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to update contract'
    }, { status: 400 });
  }
}

// DELETE - Delete contract by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const contract = await Contract.findByIdAndDelete(params.id);

    if (!contract) {
      return NextResponse.json({
        success: false,
        error: 'Contract not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Contract deleted successfully'
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to delete contract'
    }, { status: 500 });
  }
}
