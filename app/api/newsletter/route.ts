import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Validation schema for newsletter subscription
const subscriptionSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the request body
    const validationResult = subscriptionSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validationResult.error.errors,
        },
        { status: 400 }
      );
    }

    const { email } = validationResult.data;

    // TODO: In a real implementation, you would:
    // 1. Check if email already exists in database
    // 2. Save to database or email service
    // 3. Send confirmation email

    // For now, we'll simulate the subscription process
    const subscriber = {
      id: Date.now(), // Simple ID generation for demo
      email,
      subscribedAt: new Date().toISOString(),
    };

    // Log the subscription (in production, save to database)
    console.log("Newsletter subscription:", subscriber);

    return NextResponse.json(
      {
        data: subscriber,
        message: "Successfully subscribed to newsletter",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Newsletter subscription error:", error);

    return NextResponse.json(
      {
        error: "Internal server error",
        message: "Failed to process subscription",
      },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
