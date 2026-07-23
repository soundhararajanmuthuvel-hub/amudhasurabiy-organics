"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, Send, ShieldCheck } from "lucide-react";
import JsonLd from "@/components/JsonLd";

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState<"customer" | "b2b">("customer");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <JsonLd
        type="organization"
        data={{
          name: "Amudhasurabiy Organics Contact",
          url: "https://amudhasurabiy.com/contact/"
        }}
      />
      <Header />
      <main className="min-h-screen bg-cream text-charcoal py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Header Hero */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="inline-block px-4 py-1.5 rounded-full bg-moss-green/10 text-moss-green font-heading text-xs font-bold uppercase tracking-widest">
              Corporate Headquarters & Inquiries
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-walnut-brown tracking-tight">
              Contact Amudhasurabiy Organics
            </h1>
            <p className="font-body text-sm sm:text-base text-walnut-brown/70 leading-relaxed">
              We are here to support customers, retail partners, dealers, and wholesale distributors.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-20">
            
            {/* Contact Details Column */}
            <div className="space-y-6">
              <div className="rounded-3xl bg-white p-8 border border-walnut-brown/10 shadow-sm space-y-6">
                <h3 className="font-heading text-xl font-bold text-walnut-brown">Corporate Headquarters</h3>
                
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-2xl bg-moss-green/10 text-moss-green flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-heading text-xs font-bold text-walnut-brown uppercase">Manufacturing Facility</h4>
                    <p className="font-body text-xs text-walnut-brown/70 leading-relaxed">
                      Amudhasurabiy Organics
                      <br />
                      Kumbakonam, Thanjavur District,
                      <br />
                      Tamil Nadu - 612001, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-2xl bg-moss-green/10 text-moss-green flex items-center justify-center shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-heading text-xs font-bold text-walnut-brown uppercase">Helpline & WhatsApp</h4>
                    <p className="font-body text-xs text-walnut-brown/70 leading-relaxed">
                      +91 70106 02115
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-2xl bg-moss-green/10 text-moss-green flex items-center justify-center shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-heading text-xs font-bold text-walnut-brown uppercase">Email Support</h4>
                    <p className="font-body text-xs text-walnut-brown/70 leading-relaxed">
                      support@amudhasurabiy.com
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-walnut-brown/10 text-[11px] font-body text-walnut-brown/60 space-y-1">
                  <p><strong>FSSAI Lic No:</strong> 22421543000120</p>
                  <p><strong>GST Reg No:</strong> 33AAFFA9012K1Z9</p>
                </div>
              </div>
            </div>

            {/* Form Column */}
            <div className="lg:col-span-2 rounded-3xl bg-white p-8 sm:p-10 border border-walnut-brown/10 shadow-sm">
              
              {/* Tab Selector */}
              <div className="flex gap-4 border-b border-walnut-brown/10 pb-6 mb-6">
                <button
                  onClick={() => setActiveTab("customer")}
                  className={`font-heading text-xs font-bold uppercase tracking-wider py-2 px-4 rounded-full transition-all ${
                    activeTab === "customer"
                      ? "bg-moss-green text-white"
                      : "bg-walnut-brown/5 text-walnut-brown/70 hover:bg-walnut-brown/10"
                  }`}
                >
                  Customer Support
                </button>
                <button
                  onClick={() => setActiveTab("b2b")}
                  className={`font-heading text-xs font-bold uppercase tracking-wider py-2 px-4 rounded-full transition-all ${
                    activeTab === "b2b"
                      ? "bg-moss-green text-white"
                      : "bg-walnut-brown/5 text-walnut-brown/70 hover:bg-walnut-brown/10"
                  }`}
                >
                  Dealer / Distributor Portal
                </button>
              </div>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-moss-green/10 text-moss-green text-center space-y-3">
                  <ShieldCheck className="h-10 w-10 mx-auto text-moss-green" />
                  <h4 className="font-heading text-xl font-bold">Thank You for Your Message!</h4>
                  <p className="font-body text-xs text-walnut-brown/80 max-w-md mx-auto">
                    Our team at Amudhasurabiy Organics will review your request and get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-heading font-bold text-walnut-brown uppercase mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Enter your name"
                        className="w-full rounded-2xl px-4 py-3 bg-cream-dark/30 border border-walnut-brown/15 text-xs text-walnut-brown focus:outline-none focus:border-moss-green"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-heading font-bold text-walnut-brown uppercase mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        className="w-full rounded-2xl px-4 py-3 bg-cream-dark/30 border border-walnut-brown/15 text-xs text-walnut-brown focus:outline-none focus:border-moss-green"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-heading font-bold text-walnut-brown uppercase mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="your.email@example.com"
                      className="w-full rounded-2xl px-4 py-3 bg-cream-dark/30 border border-walnut-brown/15 text-xs text-walnut-brown focus:outline-none focus:border-moss-green"
                    />
                  </div>

                  {activeTab === "b2b" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-heading font-bold text-walnut-brown uppercase mb-2">
                          Business / Store Name
                        </label>
                        <input
                          type="text"
                          placeholder="Your company or store name"
                          className="w-full rounded-2xl px-4 py-3 bg-cream-dark/30 border border-walnut-brown/15 text-xs text-walnut-brown focus:outline-none focus:border-moss-green"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-heading font-bold text-walnut-brown uppercase mb-2">
                          City & State
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Chennai, Tamil Nadu"
                          className="w-full rounded-2xl px-4 py-3 bg-cream-dark/30 border border-walnut-brown/15 text-xs text-walnut-brown focus:outline-none focus:border-moss-green"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-heading font-bold text-walnut-brown uppercase mb-2">
                      Message / Inquiry Details *
                    </label>
                    <textarea
                      rows={5}
                      required
                      placeholder={
                        activeTab === "customer"
                          ? "How can we assist you with Blovit malts or your order?"
                          : "Tell us about your dealership/distributor network or bulk purchase query..."
                      }
                      className="w-full rounded-2xl px-4 py-3 bg-cream-dark/30 border border-walnut-brown/15 text-xs text-walnut-brown focus:outline-none focus:border-moss-green"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-moss-green hover:bg-walnut-brown text-white px-8 py-3.5 rounded-full font-heading text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center gap-2"
                  >
                    <span>Send Message</span>
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              )}

            </div>

          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
