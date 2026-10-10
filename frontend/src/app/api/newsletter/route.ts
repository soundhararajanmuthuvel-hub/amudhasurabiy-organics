import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string" || !email.includes("@") || !email.includes(".")) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    console.log(`[Newsletter Subscription] ${email.trim()} registered.`);

    return NextResponse.json({
      success: true,
      message: "Thank you for subscribing to the Amudhasurabiy Organics Circle! You'll receive traditional food insights and harvest announcements.",
    });
  } catch (error) {
    console.error("[Newsletter Subscription Error]", error);
    return NextResponse.json(
      { success: false, message: "Subscription failed. Please try again." },
      { status: 500 }
    );
  }
}
