import { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Amudhasurabiy Organics (Amudhasurabi) | Our Story & Mission",
  description: "Learn about Amudhasurabiy Organics (also searched as Amudhasurabi, Amuthasurabi), a natural nutrition company founded in Kumbakonam, Tamil Nadu.",
  alternates: {
    canonical: "/about/",
  },
  openGraph: {
    title: "About Amudhasurabiy Organics (Amudhasurabi) | Our Story & Mission",
    description: "Learn about Amudhasurabiy Organics, a natural nutrition company founded in Kumbakonam, Tamil Nadu.",
    url: "https://amudhasurabiy.com/about/",
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

export default function AboutPage() {
  return <AboutClient />;
}
