"use client";

import { useState } from "react";
import { 
  Building2, CheckCircle2, Send, 
  Phone, Mail, MapPin, Package, Award, Sparkles, MessageSquare
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import JsonLd from "@/components/JsonLd";

export default function WholesaleClient() {
  const [formData, setFormData] = useState({
    businessName: "",
    contactPerson: "",
    mobile: "",
    email: "",
    city: "",
    state: "Tamil Nadu",
    enquiryType: "wholesale" as "wholesale" | "distribution" | "white_label" | "cafe_bulk",
    productInterests: ["Blovit ABC Malt", "Blovit Beetroot Malt"],
    estimatedQuantity: "50 - 200 kg",
    requiredPackSizes: ["200g Pouches", "500g Pouches"],
    additionalRequirements: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    success: boolean;
    enquiryId?: string;
    message?: string;
  } | null>(null);

  const productOptions = [
    "Blovit ABC Malt (Apple, Beetroot, Carrot)",
    "Blovit Beetroot Malt",
    "Blovit Nendran Banana Malt (Raw Kerala Banana)",
    "Blovit Sprouted Ragi Malt",
    "Custom Malt / Health Drink Formulation",
  ];

  const packSizeOptions = [
    "200g Sealed Pouches",
    "500g Sealed Pouches",
    "1kg Sealed Pouches",
    "10kg / 25kg Bulk Sacks for Food Service",
  ];

  const handleProductToggle = (product: string) => {
    setFormData((prev) => {
      const exists = prev.productInterests.includes(product);
      return {
        ...prev,
        productInterests: exists
          ? prev.productInterests.filter((p) => p !== product)
          : [...prev.productInterests, product],
      };
    });
  };

  const handlePackSizeToggle = (size: string) => {
    setFormData((prev) => {
      const exists = prev.requiredPackSizes.includes(size);
      return {
        ...prev,
        requiredPackSizes: exists
          ? prev.requiredPackSizes.filter((s) => s !== size)
          : [...prev.requiredPackSizes, size],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionResult(null);

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmissionResult({
          success: true,
          enquiryId: data.enquiryId,
          message: data.message,
        });
      } else {
        setSubmissionResult({
          success: false,
          message: data.message || "Failed to submit enquiry. Please try again.",
        });
      }
    } catch {
      setSubmissionResult({
        success: false,
        message: "Network error occurred. Please try again or WhatsApp our Kumbakonam office directly at +91 70106 02115.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <JsonLd
        type="organization"
        data={{
          name: "Amudhasurabiy Organics Wholesale & Private Label",
          url: "https://amudhasurabiy.com/wholesale/",
        }}
      />
      <Header />

      <main className="min-h-screen bg-[#FDFBF7] text-[#1B1B1B] py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Header Banner */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2E5A44]/10 text-[#2E5A44] font-heading text-xs font-bold uppercase tracking-widest">
              <Building2 className="h-4 w-4" />
              <span>B2B Supply • Distribution • Private Label</span>
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#5A3B28] tracking-tight">
              Partner with Amudhasurabiy Organics
            </h1>
            <p className="font-body text-sm sm:text-base text-[#5A3B28]/80 leading-relaxed max-w-2xl mx-auto">
              Direct factory supply for organic retailers, supermarket chains, cafes, Ayurveda clinics, and consumer brands looking for 100% natural, preservative-free malt health drinks.
            </p>
          </div>

          {/* Core B2B Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="rounded-3xl bg-white p-8 border border-[#5A3B28]/10 shadow-sm space-y-3">
              <div className="h-12 w-12 rounded-2xl bg-[#2E5A44]/10 text-[#2E5A44] flex items-center justify-center">
                <Package className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-lg font-bold text-[#5A3B28]">Wholesale & Retail Supply</h3>
              <p className="font-body text-xs text-[#5A3B28]/75 leading-relaxed">
                Competitive tiered volume pricing for retail organic stores, supermarkets, and specialty food distributors across India with reliable batch consistency.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-8 border border-[#5A3B28]/10 shadow-sm space-y-3">
              <div className="h-12 w-12 rounded-2xl bg-[#2E5A44]/10 text-[#2E5A44] flex items-center justify-center">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-lg font-bold text-[#5A3B28]">Private-Label / White-Label</h3>
              <p className="font-body text-xs text-[#5A3B28]/75 leading-relaxed">
                Launch your own clean-label malt nutrition brand. We handle formulation, small-batch roasting, and food-grade pouch packaging under your custom brand labels.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-8 border border-[#5A3B28]/10 shadow-sm space-y-3">
              <div className="h-12 w-12 rounded-2xl bg-[#2E5A44]/10 text-[#2E5A44] flex items-center justify-center">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-lg font-bold text-[#5A3B28]">FSSAI Licensed Manufacturing</h3>
              <p className="font-body text-xs text-[#5A3B28]/75 leading-relaxed">
                FSSAI License: 22421543000120. Manufactured in Kumbakonam with strict quality control, zero chemical preservatives, and raw organic palm jaggery.
              </p>
            </div>
          </div>

          {/* Main Form & Contact Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Form Column */}
            <div className="lg:col-span-8 rounded-3xl bg-white p-8 sm:p-10 border border-[#5A3B28]/10 shadow-sm">
              <div className="mb-8">
                <h2 className="font-heading text-2xl font-bold text-[#5A3B28]">
                  Submit B2B or Private-Label Enquiry
                </h2>
                <p className="font-body text-xs text-[#5A3B28]/70 mt-1">
                  Fill out your business requirements below. Our commercial team will evaluate and share wholesale catalogs and pricing within 24 hours.
                </p>
              </div>

              {submissionResult?.success ? (
                <div className="p-8 rounded-3xl bg-[#2E5A44]/10 border border-[#2E5A44]/20 text-center space-y-4">
                  <div className="h-14 w-14 rounded-full bg-[#2E5A44] text-white flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-[#5A3B28]">
                    Enquiry Registered Successfully!
                  </h3>
                  <div className="inline-block px-4 py-1.5 rounded-full bg-white border border-[#2E5A44]/30 font-heading text-xs font-bold text-[#2E5A44] uppercase tracking-wider">
                    Reference: {submissionResult.enquiryId}
                  </div>
                  <p className="font-body text-xs sm:text-sm text-[#5A3B28]/85 max-w-lg mx-auto leading-relaxed">
                    {submissionResult.message}
                  </p>
                  <div className="pt-4 flex flex-wrap justify-center gap-3">
                    <a
                      href={`https://wa.me/917010602115?text=Hello%20Amudhasurabiy%20Organics,%20I%20have%20submitted%20wholesale%20enquiry%20${submissionResult.enquiryId}%20for%20${encodeURIComponent(formData.businessName)}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#2E5A44] hover:bg-[#5A3B28] text-white px-6 py-3 rounded-full font-heading text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 shadow-sm transition-all"
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>Instant WhatsApp Follow-up</span>
                    </a>
                    <button
                      onClick={() => {
                        setSubmissionResult(null);
                        setFormData({
                          businessName: "",
                          contactPerson: "",
                          mobile: "",
                          email: "",
                          city: "",
                          state: "Tamil Nadu",
                          enquiryType: "wholesale",
                          productInterests: ["Blovit ABC Malt"],
                          estimatedQuantity: "50 - 200 kg",
                          requiredPackSizes: ["200g Pouches"],
                          additionalRequirements: "",
                        });
                      }}
                      className="border border-[#5A3B28]/30 hover:bg-[#5A3B28]/5 text-[#5A3B28] px-6 py-3 rounded-full font-heading text-xs font-bold uppercase tracking-wider transition-all"
                    >
                      Submit Another Enquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {submissionResult?.success === false && (
                    <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                      {submissionResult.message}
                    </div>
                  )}

                  {/* Row 1: Business Name & Contact Person */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-heading font-bold text-[#5A3B28] uppercase tracking-wider mb-2">
                        Business / Company Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        placeholder="e.g. Kaveri Organic Foods Ltd."
                        className="w-full rounded-2xl px-4 py-3 bg-[#FDFBF7] border border-[#5A3B28]/15 text-xs text-[#5A3B28] focus:outline-none focus:border-[#2E5A44] focus:ring-1 focus:ring-[#2E5A44]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-heading font-bold text-[#5A3B28] uppercase tracking-wider mb-2">
                        Contact Person Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.contactPerson}
                        onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                        placeholder="e.g. Ramesh Kumar"
                        className="w-full rounded-2xl px-4 py-3 bg-[#FDFBF7] border border-[#5A3B28]/15 text-xs text-[#5A3B28] focus:outline-none focus:border-[#2E5A44] focus:ring-1 focus:ring-[#2E5A44]"
                      />
                    </div>
                  </div>

                  {/* Row 2: Mobile Number & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-heading font-bold text-[#5A3B28] uppercase tracking-wider mb-2">
                        Mobile Number * (10 Digits)
                      </label>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        value={formData.mobile}
                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value.replace(/\D/g, "") })}
                        placeholder="e.g. 9876543210"
                        className="w-full rounded-2xl px-4 py-3 bg-[#FDFBF7] border border-[#5A3B28]/15 text-xs text-[#5A3B28] focus:outline-none focus:border-[#2E5A44] focus:ring-1 focus:ring-[#2E5A44]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-heading font-bold text-[#5A3B28] uppercase tracking-wider mb-2">
                        Business Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. procurement@kaveriorganics.in"
                        className="w-full rounded-2xl px-4 py-3 bg-[#FDFBF7] border border-[#5A3B28]/15 text-xs text-[#5A3B28] focus:outline-none focus:border-[#2E5A44] focus:ring-1 focus:ring-[#2E5A44]"
                      />
                    </div>
                  </div>

                  {/* Row 3: City & State */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-heading font-bold text-[#5A3B28] uppercase tracking-wider mb-2">
                        City / District *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="e.g. Chennai, Bangalore, or Madurai"
                        className="w-full rounded-2xl px-4 py-3 bg-[#FDFBF7] border border-[#5A3B28]/15 text-xs text-[#5A3B28] focus:outline-none focus:border-[#2E5A44] focus:ring-1 focus:ring-[#2E5A44]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-heading font-bold text-[#5A3B28] uppercase tracking-wider mb-2">
                        State *
                      </label>
                      <select
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full rounded-2xl px-4 py-3 bg-[#FDFBF7] border border-[#5A3B28]/15 text-xs text-[#5A3B28] focus:outline-none focus:border-[#2E5A44] focus:ring-1 focus:ring-[#2E5A44]"
                      >
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Kerala">Kerala</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                        <option value="Telangana">Telangana</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Delhi NCR">Delhi NCR</option>
                        <option value="Other State">Other Indian State</option>
                      </select>
                    </div>
                  </div>

                  {/* Enquiry Type Selector */}
                  <div>
                    <label className="block text-xs font-heading font-bold text-[#5A3B28] uppercase tracking-wider mb-2">
                      Enquiry Nature *
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { id: "wholesale", label: "Wholesale Purchase" },
                        { id: "distribution", label: "Distributorship" },
                        { id: "white_label", label: "White / Private Label" },
                        { id: "cafe_bulk", label: "Bulk Cafe / Clinic" },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, enquiryType: item.id as "wholesale" | "distribution" | "white_label" | "cafe_bulk" })}
                          className={`p-3 rounded-2xl text-xs font-heading font-semibold border transition-all text-center ${
                            formData.enquiryType === item.id
                              ? "bg-[#2E5A44] text-white border-[#2E5A44] shadow-sm"
                              : "bg-[#FDFBF7] text-[#5A3B28] border-[#5A3B28]/15 hover:border-[#2E5A44]"
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Product Interests (Multi-Select) */}
                  <div>
                    <label className="block text-xs font-heading font-bold text-[#5A3B28] uppercase tracking-wider mb-2">
                      Products of Interest
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {productOptions.map((prod) => {
                        const isChecked = formData.productInterests.includes(prod);
                        return (
                          <label
                            key={prod}
                            className={`flex items-center gap-3 p-3 rounded-2xl border text-xs cursor-pointer transition-all ${
                              isChecked
                                ? "bg-[#2E5A44]/10 border-[#2E5A44] text-[#2E5A44] font-semibold"
                                : "bg-[#FDFBF7] border-[#5A3B28]/15 text-[#5A3B28]/80 hover:bg-[#F4EFEA]"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => handleProductToggle(prod)}
                              className="h-4 w-4 rounded text-[#2E5A44] focus:ring-[#2E5A44]"
                            />
                            <span>{prod}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Quantity & Pack Sizes */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-heading font-bold text-[#5A3B28] uppercase tracking-wider mb-2">
                        Estimated Order Quantity
                      </label>
                      <select
                        value={formData.estimatedQuantity}
                        onChange={(e) => setFormData({ ...formData, estimatedQuantity: e.target.value })}
                        className="w-full rounded-2xl px-4 py-3 bg-[#FDFBF7] border border-[#5A3B28]/15 text-xs text-[#5A3B28] focus:outline-none focus:border-[#2E5A44]"
                      >
                        <option value="25 - 50 kg">25 – 50 kg (Trial Batch)</option>
                        <option value="50 - 200 kg">50 – 200 kg (Standard Retail Order)</option>
                        <option value="200 - 500 kg">200 – 500 kg (Regional Distributor)</option>
                        <option value="500+ kg">500+ kg (Commercial / White-Label)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-heading font-bold text-[#5A3B28] uppercase tracking-wider mb-2">
                        Preferred Pack Sizes
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {packSizeOptions.map((size) => {
                          const isSelected = formData.requiredPackSizes.includes(size);
                          return (
                            <button
                              key={size}
                              type="button"
                              onClick={() => handlePackSizeToggle(size)}
                              className={`px-3 py-1.5 rounded-xl text-[11px] font-heading font-medium border transition-all ${
                                isSelected
                                  ? "bg-[#5A3B28] text-white border-[#5A3B28]"
                                  : "bg-[#FDFBF7] text-[#5A3B28]/70 border-[#5A3B28]/15 hover:bg-[#F4EFEA]"
                              }`}
                            >
                              {size}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Additional Requirements */}
                  <div>
                    <label className="block text-xs font-heading font-bold text-[#5A3B28] uppercase tracking-wider mb-2">
                      Additional Requirements & Notes
                    </label>
                    <textarea
                      rows={4}
                      value={formData.additionalRequirements}
                      onChange={(e) => setFormData({ ...formData, additionalRequirements: e.target.value })}
                      placeholder="Share details on your retail distribution reach, required delivery schedule, customized packaging specifications, or certification requirements..."
                      className="w-full rounded-2xl px-4 py-3 bg-[#FDFBF7] border border-[#5A3B28]/15 text-xs text-[#5A3B28] focus:outline-none focus:border-[#2E5A44]"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto bg-[#2E5A44] hover:bg-[#5A3B28] text-white px-8 py-4 rounded-full font-heading text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Send className="h-4 w-4" />
                    <span>{isSubmitting ? "Submitting Enquiry..." : "Submit B2B Enquiry"}</span>
                  </button>
                </form>
              )}
            </div>

            {/* Sidebar Column: Direct Contacts & Verified Details */}
            <div className="lg:col-span-4 space-y-6">
              <div className="rounded-3xl bg-white p-8 border border-[#5A3B28]/10 shadow-sm space-y-6">
                <h3 className="font-heading text-xl font-bold text-[#5A3B28]">
                  Commercial Desk
                </h3>
                
                <div className="flex items-start gap-3.5">
                  <div className="h-10 w-10 rounded-2xl bg-[#2E5A44]/10 text-[#2E5A44] flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-heading text-xs font-bold text-[#5A3B28] uppercase">Manufacturing Unit</h4>
                    <p className="font-body text-xs text-[#5A3B28]/75 leading-relaxed">
                      Amudhasurabiy Organics
                      <br />
                      Kumbakonam, Thanjavur District,
                      <br />
                      Tamil Nadu - 612001, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="h-10 w-10 rounded-2xl bg-[#2E5A44]/10 text-[#2E5A44] flex items-center justify-center shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-heading text-xs font-bold text-[#5A3B28] uppercase">Direct Phone / WhatsApp</h4>
                    <p className="font-body text-xs text-[#5A3B28]/75 leading-relaxed">
                      +91 70106 02115
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="h-10 w-10 rounded-2xl bg-[#2E5A44]/10 text-[#2E5A44] flex items-center justify-center shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-heading text-xs font-bold text-[#5A3B28] uppercase">Commercial Inquiries</h4>
                    <p className="font-body text-xs text-[#5A3B28]/75 leading-relaxed">
                      support@amudhasurabiy.com
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#5A3B28]/10 text-[11px] font-body text-[#5A3B28]/70 space-y-1">
                  <p><strong>FSSAI Lic No:</strong> 22421543000120</p>
                  <p><strong>GSTIN:</strong> 33AAFFA9012K1Z9</p>
                  <p><strong>HSN Code:</strong> 19019090 (Malt Extract Health Preparations)</p>
                </div>
              </div>

              {/* Direct WhatsApp Callout */}
              <div className="rounded-3xl bg-[#2E5A44] text-white p-8 shadow-md space-y-4">
                <span className="text-[10px] font-heading font-bold uppercase tracking-widest text-white/80">
                  Instant B2B Desk
                </span>
                <h4 className="font-heading text-xl font-bold leading-snug">
                  Need an immediate quote or sample kit dispatched?
                </h4>
                <p className="font-body text-xs text-white/90 leading-relaxed">
                  Connect directly with our manufacturing desk in Kumbakonam over WhatsApp.
                </p>
                <a
                  href="https://wa.me/917010602115?text=Hello%20Amudhasurabiy%20Organics,%20I%20would%20like%20to%20enquire%20about%20wholesale%20distribution%20and%20sample%20packs."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white hover:bg-[#FDFBF7] text-[#2E5A44] px-6 py-3 rounded-full font-heading text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 shadow-xs transition-all w-full justify-center"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>WhatsApp +91 70106 02115</span>
                </a>
              </div>
            </div>

          </div>

        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
