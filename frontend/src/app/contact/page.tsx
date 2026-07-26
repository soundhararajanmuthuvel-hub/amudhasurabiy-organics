import { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Amudhasurabiy Organics | Kumbakonam Tamil Nadu",
  description: "Get in touch with Amudhasurabiy Organics (Amudhasurabi) for customer support, B2B wholesale distribution, or dealership inquiries in Kumbakonam, Tamil Nadu.",
  alternates: {
    canonical: "/contact/",
  },
  openGraph: {
    title: "Contact Amudhasurabiy Organics | Kumbakonam Tamil Nadu",
    description: "Get in touch with Amudhasurabiy Organics for customer support or dealership inquiries.",
    url: "https://amudhasurabiy.com/contact/",
    images: [
      {
        url: "/images/logo.png",
        width: 512,
        height: 512,
        alt: "Amudhasurabiy Organics Logo",
      },
    ],
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
