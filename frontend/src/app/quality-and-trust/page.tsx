import { Metadata } from "next";
import QualityClient from "./QualityClient";

export const metadata: Metadata = {
  title: "Quality & Trust Standards | Amudhasurabiy Organics (FSSAI Certified)",
  description: "Amudhasurabiy Organics maintains uncompromising quality standards — FSSAI licensed, zero artificial additives, farm-sourced ingredients, and small-batch roasting.",
  alternates: {
    canonical: "/quality-and-trust/",
  },
  openGraph: {
    title: "Quality & Trust Standards | Amudhasurabiy Organics",
    description: "FSSAI Licensed Facility. Zero Artificial Additives. Farm-sourced natural ingredients from Kumbakonam, Tamil Nadu.",
    url: "https://amudhasurabiy.com/quality-and-trust/",
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

export default function QualityAndTrustPage() {
  return <QualityClient />;
}
