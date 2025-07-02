import { NextRequest, NextResponse } from 'next/server';
import Service from '@/models/customersData/services';

// GET - Get all services
export async function GET() {
  try {
    const services = await Service.find({});
    return NextResponse.json({
      success: true,
      data: services
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch services'
    }, { status: 500 });
  }
}

// POST - Create new service
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const service = new Service(body);
    await service.save();
    
    return NextResponse.json({
      success: true,
      data: service
    }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to create service'
    }, { status: 400 });
  }
}
