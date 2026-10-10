import { Metadata } from "next";
import WholesaleClient from "./WholesaleClient";

export const metadata: Metadata = {
  title: "Wholesale, B2B Distribution & Private-Label Manufacturing | Amudhasurabiy Organics",
  description: "Direct B2B wholesale supply, retail distribution partnerships, and private-label manufacturing of Blovit organic natural malts from Kumbakonam, Tamil Nadu.",
  alternates: {
    canonical: "/wholesale/",
  },
  openGraph: {
    title: "Wholesale & Private-Label Manufacturing | Amudhasurabiy Organics",
    description: "Partner with Amudhasurabiy Organics for retail distribution, bulk cafe supply, and white-label natural nutrition manufacturing.",
    url: "https://amudhasurabiy.com/wholesale/",
    images: [
      {
        url: "/images/logo.png",
        width: 512,
        height: 512,
        alt: "Amudhasurabiy Organics Wholesale",
      },
    ],
  },
};

export default function WholesalePage() {
  return <WholesaleClient />;
}
