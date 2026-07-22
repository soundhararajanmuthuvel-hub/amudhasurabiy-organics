"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Mail, Phone, MapPin, Send } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && message) {
      setSubmitted(true);
      setName("");
      setEmail("");
      setMessage("");
    }
  };

  return (
    <>
      <Header />
      <main className="flex-grow bg-cream py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-1 font-heading text-sm font-semibold text-walnut-brown/60 hover:text-moss-green transition-colors mb-8">
            <ChevronLeft className="h-4 w-4" /> Back to Home
          </Link>

          <h1 className="font-heading text-3xl md:text-4xl font-bold text-walnut-brown mb-10">Contact Us</h1>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
            
            {/* Contact Details */}
            <div className="md:col-span-5 bg-white border border-walnut-brown/5 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col gap-6 font-body text-sm text-walnut-brown/85">
              <h3 className="font-heading text-lg font-bold text-walnut-brown mb-2">Get in Touch</h3>
              
              <div className="flex items-start gap-4">
                <MapPin className="h-6 w-6 text-moss-green shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-heading font-semibold text-walnut-brown">Office Address</h4>
                  <p className="text-xs text-walnut-brown/70 mt-1">
                    Amudhasurabiy Organics,<br />
                    Kumbakonam, Thanjavur District,<br />
                    Tamil Nadu - 612001, India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="h-5 w-5 text-moss-green shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-heading font-semibold text-walnut-brown">Call / WhatsApp</h4>
                  <p className="text-xs text-walnut-brown/70 mt-1">
                    <a href="tel:+917010602115" className="hover:text-moss-green transition-colors">+91 70106 02115</a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="h-5 w-5 text-moss-green shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-heading font-semibold text-walnut-brown">Email Support</h4>
                  <p className="text-xs text-walnut-brown/70 mt-1">
                    <a href="mailto:info@amudhasurabiy.com" className="hover:text-moss-green transition-colors">info@amudhasurabiy.com</a>
                  </p>
                </div>
              </div>

              <div className="border-t border-walnut-brown/10 pt-6 mt-2">
                <p className="text-xs text-walnut-brown/60 leading-relaxed">
                  Have bulk order inquiries or special shipping requirements? Tap the WhatsApp button or fill out the form, and our Kumbakonam team will contact you within 24 hours.
                </p>
              </div>
            </div>

            {/* Message Form */}
            <div className="md:col-span-7 bg-white border border-walnut-brown/5 rounded-3xl p-6 md:p-8 shadow-sm">
              <h3 className="font-heading text-lg font-bold text-walnut-brown mb-6">Send Us a Message</h3>
              
              {submitted ? (
                <div className="p-6 bg-moss-green/10 border border-moss-green/20 rounded-2xl text-moss-green text-sm font-medium">
                  ✓ Thank you! Your message has been received. Our team will get back to you shortly.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-body text-sm text-walnut-brown">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-walnut-brown/60 mb-2">Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-cream border border-walnut-brown/15 rounded-full px-4 py-2.5 focus:outline-none focus:border-moss-green"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-walnut-brown/60 mb-2">Email Address</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-cream border border-walnut-brown/15 rounded-full px-4 py-2.5 focus:outline-none focus:border-moss-green"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-walnut-brown/60 mb-2">Your Message</label>
                    <textarea
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-cream border border-walnut-brown/15 rounded-3xl px-4 py-3 focus:outline-none focus:border-moss-green resize-none"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 bg-moss-green hover:bg-walnut-brown text-white py-3.5 px-8 rounded-full font-heading text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-md group mt-2"
                  >
                    <Send className="h-4 w-4" /> Send Message
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </main>
      <WhatsAppButton />
      <Footer />
    </>
  );
}
