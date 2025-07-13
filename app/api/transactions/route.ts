import connect from "@/lib/data";
import Transaction from "@/models/transaction";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
  try {
    await connect();
    const body = await request.json();
    const transaction = await Transaction.create(body);
    return NextResponse.json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Failed to create transaction",
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    await connect();
    const transactions = await Transaction.find();
    return NextResponse.json({
      success: true,
      data: transactions,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Failed to fetch transactions",
    }, { status: 500 });
  }
}



