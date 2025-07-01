import { NextRequest, NextResponse } from 'next/server';
import Customer from '@/models/customersData/customers';

// GET - Get customer by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const customer = await Customer.findById(params.id);
    
    if (!customer) {
      return NextResponse.json({
        success: false,
        error: 'Customer not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: customer
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch customer'
    }, { status: 500 });
  }
}

// PUT - Update customer by ID
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const customer = await Customer.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    );

    if (!customer) {
      return NextResponse.json({
        success: false,
        error: 'Customer not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: customer
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to update customer'
    }, { status: 400 });
  }
}

// DELETE - Delete customer by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const customer = await Customer.findByIdAndDelete(params.id);

    if (!customer) {
      return NextResponse.json({
        success: false,
        error: 'Customer not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Customer deleted successfully'
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to delete customer'
    }, { status: 500 });
  }
}
