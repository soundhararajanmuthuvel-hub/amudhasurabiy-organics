import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export interface WholesaleEnquiryPayload {
  businessName: string;
  contactPerson: string;
  mobile: string;
  email: string;
  city: string;
  state: string;
  enquiryType: "wholesale" | "distribution" | "white_label" | "cafe_bulk";
  productInterests: string[];
  estimatedQuantity: string;
  requiredPackSizes: string[];
  additionalRequirements?: string;
}

export async function POST(req: NextRequest) {
  try {
    const data: WholesaleEnquiryPayload = await req.json();

    // Required Field Validation
    if (!data.businessName?.trim()) {
      return NextResponse.json({ success: false, message: "Business name is required." }, { status: 400 });
    }
    if (!data.contactPerson?.trim()) {
      return NextResponse.json({ success: false, message: "Contact person's name is required." }, { status: 400 });
    }
    if (!data.mobile?.trim() || data.mobile.replace(/\D/g, "").length < 10) {
      return NextResponse.json({ success: false, message: "A valid 10-digit mobile number is required." }, { status: 400 });
    }
    if (!data.email?.trim() || !data.email.includes("@")) {
      return NextResponse.json({ success: false, message: "A valid business email address is required." }, { status: 400 });
    }
    if (!data.city?.trim() || !data.state?.trim()) {
      return NextResponse.json({ success: false, message: "City and state are required." }, { status: 400 });
    }

    const enquiryId = `ENQ-${Date.now().toString().slice(-6)}`;
    const receivedAt = new Date().toISOString();

    console.log(`[Wholesale/Private-Label Enquiry Received - ${enquiryId}]`, {
      enquiryId,
      receivedAt,
      businessName: data.businessName,
      contactPerson: data.contactPerson,
      mobile: data.mobile,
      email: data.email,
      location: `${data.city}, ${data.state}`,
      enquiryType: data.enquiryType,
      productInterests: data.productInterests,
      estimatedQuantity: data.estimatedQuantity,
      packSizes: data.requiredPackSizes,
      notes: data.additionalRequirements,
    });

    return NextResponse.json({
      success: true,
      enquiryId,
      message: "Wholesale & private-label enquiry registered successfully. Our business team will connect with pricing & catalogs within 24 business hours.",
      receivedAt,
    });
  } catch (error) {
    console.error("[Wholesale Enquiry Error]", error);
    return NextResponse.json(
      { success: false, message: "Failed to process enquiry. Please try again or WhatsApp our Kumbakonam office directly at +91 70106 02115." },
      { status: 500 }
    );
  }
}
