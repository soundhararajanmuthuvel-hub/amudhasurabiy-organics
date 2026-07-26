import { Metadata } from "next";
import ProcessClient from "./ProcessClient";

export const metadata: Metadata = {
  title: "Our 5-Step Manufacturing Process | Amudhasurabiy Organics Kumbakonam",
  description: "Learn how Amudhasurabiy Organics hand-crafts Blovit malt health drinks from raw material sourcing to FSSAI-licensed packaging at our Kumbakonam facility.",
  alternates: {
    canonical: "/our-process/",
  },
  openGraph: {
    title: "Our 5-Step Manufacturing Process | Amudhasurabiy Organics",
    description: "Learn how we turn fresh organic fruits and sprouted grains into luxury health drink powders at our Kumbakonam facility.",
    url: "https://amudhasurabiy.com/our-process/",
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

export default function OurProcessPage() {
  return <ProcessClient />;
}
