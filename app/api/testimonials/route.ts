import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Validation schema for testimonial submission
const testimonialSchema = z.object({
  author: z.string().min(1, { message: "Name is required" }),
  company: z.string().optional(),
  content: z.string().min(1, { message: "Testimonial is required" }),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the request body
    const validationResult = testimonialSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validationResult.error.errors,
        },
        { status: 400 }
      );
    }

    const { author, company, content } = validationResult.data;

    // TODO: In a real implementation, you would:
    // 1. Save testimonial to database
    // 2. Optionally require admin approval before showing
    // 3. Send notification email to admin
    // 4. Send confirmation email to user

    // For now, we'll simulate the testimonial processing
    const testimonial = {
      id: Date.now(), // Simple ID generation for demo
      author,
      company: company || "",
      content,
      submittedAt: new Date().toISOString(),
      approved: false, // In production, testimonials might need approval
    };

    // Log the testimonial submission (in production, save to database)
    console.log("Testimonial submission:", testimonial);

    return NextResponse.json(
      {
        data: testimonial,
        message: "Testimonial submitted successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Testimonial submission error:", error);

    return NextResponse.json(
      {
        error: "Internal server error",
        message: "Failed to process testimonial submission",
      },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
