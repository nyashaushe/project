import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Validation schema for login
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the request body
    const validationResult = loginSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validationResult.error.errors,
        },
        { status: 400 }
      );
    }

    const { email, password } = validationResult.data;

    // TODO: In a real implementation, you would:
    // 1. Hash the password and compare with stored hash
    // 2. Query database for user with matching email
    // 3. Generate JWT token for authenticated user
    // 4. Handle rate limiting and security measures

    // For now, we'll simulate the authentication process
    // In production, replace this with actual authentication logic

    // Simple demo authentication (DO NOT use in production)
    const demoUsers = [
      {
        id: 1,
        email: "admin@baobabstack.com",
        password: "password123",
        username: "admin",
      },
      {
        id: 2,
        email: "user@example.com",
        password: "password123",
        username: "user",
      },
    ];

    const user = demoUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      return NextResponse.json(
        {
          error: "Authentication failed",
          message: "Invalid email or password",
        },
        { status: 401 }
      );
    }

    // Generate a simple JWT-like token (in production, use proper JWT library)
    const token = Buffer.from(
      JSON.stringify({
        userId: user.id,
        email: user.email,
        exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      })
    ).toString("base64");

    const authResponse = {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        provider: "local",
        confirmed: true,
        blocked: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      jwt: token,
    };

    // Log the authentication (in production, use proper logging)
    console.log("User authenticated:", { email, userId: user.id });

    return NextResponse.json(authResponse, { status: 200 });
  } catch (error) {
    console.error("Login error:", error);

    return NextResponse.json(
      {
        error: "Internal server error",
        message: "Failed to process login request",
      },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
