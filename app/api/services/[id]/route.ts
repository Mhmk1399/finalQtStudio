import { NextRequest, NextResponse } from 'next/server';
import Service from '@/models/customersData/services';

// GET - Get service by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const service = await Service.findById(params.id);
    
    if (!service) {
      return NextResponse.json({
        success: false,
        error: 'Service not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: service
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch service'
    }, { status: 500 });
  }
}

// PUT - Update service by ID
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const service = await Service.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    );

    if (!service) {
      return NextResponse.json({
        success: false,
        error: 'Service not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: service
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to update service'
    }, { status: 400 });
  }
}

// DELETE - Delete service by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const service = await Service.findByIdAndDelete(params.id);

    if (!service) {
      return NextResponse.json({
        success: false,
        error: 'Service not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Service deleted successfully'
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to delete service'
    }, { status: 500 });
  }
}
