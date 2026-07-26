import { Metadata } from "next";
import HealthLibraryClient from "./HealthLibraryClient";

export const metadata: Metadata = {
  title: "Health Library | Natural Nutrition Articles by Amudhasurabiy Organics",
  description: "Read evidence-based articles on traditional Indian nutrition, hemoglobin boosting, toddler weight gain, and the benefits of organic malt health drinks.",
  alternates: {
    canonical: "/health-library/",
  },
  openGraph: {
    title: "Health Library | Natural Nutrition Articles by Amudhasurabiy Organics",
    description: "Evidence-based nutrition articles: ABC Malt, Nendran Banana for toddlers, Beetroot iron, and more from Amudhasurabiy Organics.",
    url: "https://amudhasurabiy.com/health-library/",
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

export default function HealthLibraryPage() {
  return <HealthLibraryClient />;
}
