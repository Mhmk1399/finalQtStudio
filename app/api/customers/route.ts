import { NextRequest, NextResponse } from 'next/server';
import Customer from '@/models/customersData/customers';

export async function GET() {
  try {
    const customers = await Customer.find({});
    return NextResponse.json({
      success: true,
      data: customers
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch customers'
    }, { status: 500 });
  }
}

// POST - Create new customer
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const customer = new Customer(body);
    await customer.save();
    
    return NextResponse.json({
      success: true,
      data: customer
    }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to create customer'
    }, { status: 400 });
  }
}
