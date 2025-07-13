import { NextRequest, NextResponse } from "next/server";
import User from "@/models/users";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import connect from "@/lib/data";

// POST - User login
export async function POST(request: NextRequest) {
  try {
    await connect();
    const body = await request.json();

    const { phoneNumber, password } = body;

    // Validate required fields
    if (!phoneNumber || !password) {
      return NextResponse.json(
        {
          success: false,
          error: "phoneNumber and password are required",
        },
        { status: 400 }
      );
    }

    // Find user by phoneNumber
    const user = await User.findOne({ phoneNumber });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid credentials",
        },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid credentials",
        },
        { status: 401 }
      );
    }

    // Check if user is active
    if (!user.isActive) {
      return NextResponse.json(
        {
          success: false,
          error: "Account is deactivated",
        },
        { status: 403 }
      );
    }

    // Generate JWT token
    const userToken = jwt.sign(
      {
        userId: user._id,
        phoneNumber: user.phoneNumber,
        name: user.name,
        role: user.role,
        permissions: user.permissions,
        teamId: user.teamId,
        isActive: user.isActive,
      },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "7d" }
    );

    // Remove password from response
    const userData = {
      _id: user._id,
      name: user.name,
      phoneNumber: user.phoneNumber,
      role: user.role,
      teamId: user.teamId,
      permissions: user.permissions,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return NextResponse.json(
      {
        success: true,
        message: "Login successful",
        data: {
          user: userData,
          userToken,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}
