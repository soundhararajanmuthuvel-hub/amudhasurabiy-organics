import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { email, botField } = await req.json();

    if (botField) {
      console.warn("[Newsletter] Bot spam rejected.");
      return NextResponse.json({ success: true });
    }

    if (!email || typeof email !== "string" || !email.includes("@") || !email.includes(".") || email.length > 120) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    console.log(`[Newsletter Subscription] ${cleanEmail} registered.`);

    const webhookUrl = process.env.NEWSLETTER_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: cleanEmail, subscribedAt: new Date().toISOString() }),
        });
      } catch (err) {
        console.error("[Newsletter Webhook Warning]", err);
      }
    }

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
