import { NextRequest, NextResponse } from 'next/server';
import Contract from '@/models/customersData/contracts';

// GET - Get all contracts
export async function GET() {
  try {
    const contracts = await Contract.find({});
    return NextResponse.json({
      success: true,
      data: contracts
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch contracts'
    }, { status: 500 });
  }
}

// POST - Create new contract
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const contract = new Contract(body);
    await contract.save();
    
    return NextResponse.json({
      success: true,
      data: contract
    }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to create contract'
    }, { status: 400 });
  }
}
