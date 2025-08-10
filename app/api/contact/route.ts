import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Validation schema for contact form submission
const contactSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().min(1, { message: "Please select a subject" }),
  message: z.string().min(1, { message: "Message is required" }),
  subscribeToNewsletter: z.boolean(),
  agreeToPrivacyPolicy: z.boolean().refine((val) => val === true, {
    message: "You must agree to the privacy policy",
  }),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the request body
    const validationResult = contactSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validationResult.error.errors,
        },
        { status: 400 }
      );
    }

    const formData = validationResult.data;

    // TODO: In a real implementation, you would:
    // 1. Save contact form submission to database
    // 2. Send notification email to admin
    // 3. Send confirmation email to user
    // 4. If subscribeToNewsletter is true, add to newsletter list

    // For now, we'll simulate the contact form processing
    const contactSubmission = {
      id: Date.now(), // Simple ID generation for demo
      ...formData,
      submittedAt: new Date().toISOString(),
    };

    // Log the contact form submission (in production, save to database)
    console.log("Contact form submission:", contactSubmission);

    // If user opted to subscribe to newsletter, handle that too
    if (formData.subscribeToNewsletter) {
      console.log("Also subscribing to newsletter:", formData.email);
    }

    return NextResponse.json(
      {
        data: contactSubmission,
        message: "Contact form submitted successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact form submission error:", error);

    return NextResponse.json(
      {
        error: "Internal server error",
        message: "Failed to process contact form submission",
      },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
