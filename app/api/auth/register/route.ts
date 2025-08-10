import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Validation schema for registration
const registerSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the request body
    const validationResult = registerSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validationResult.error.errors,
        },
        { status: 400 }
      );
    }

    const { username, email } = validationResult.data;

    // TODO: In a real implementation, you would:
    // 1. Check if email/username already exists in database
    // 2. Hash the password before storing
    // 3. Save user to database
    // 4. Send verification email
    // 5. Generate JWT token for authenticated user
    // 6. Handle rate limiting and security measures

    // For now, we'll simulate the registration process
    // In production, replace this with actual database operations

    // Simple demo user creation (DO NOT use in production)
    const existingEmails = ["admin@baobabstack.com", "existing@example.com"];
    const existingUsernames = ["admin", "existing"];

    if (existingEmails.includes(email)) {
      return NextResponse.json(
        {
          error: "Registration failed",
          message: "Email already exists",
        },
        { status: 409 }
      );
    }

    if (existingUsernames.includes(username)) {
      return NextResponse.json(
        {
          error: "Registration failed",
          message: "Username already exists",
        },
        { status: 409 }
      );
    }

    // Create new user (in production, save to database)
    const newUser = {
      id: Date.now(), // Simple ID generation for demo
      username,
      email,
      createdAt: new Date().toISOString(),
    };

    // Generate a simple JWT-like token (in production, use proper JWT library)
    const token = Buffer.from(
      JSON.stringify({
        userId: newUser.id,
        email: newUser.email,
        exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      })
    ).toString("base64");

    const authResponse = {
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        provider: "local",
        confirmed: true,
        blocked: false,
        createdAt: newUser.createdAt,
        updatedAt: newUser.createdAt,
      },
      jwt: token,
    };

    // Log the registration (in production, save to database and use proper logging)
    console.log("User registered:", { username, email, userId: newUser.id });

    return NextResponse.json(authResponse, { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);

    return NextResponse.json(
      {
        error: "Internal server error",
        message: "Failed to process registration request",
      },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
