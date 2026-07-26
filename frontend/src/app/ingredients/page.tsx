import { Metadata } from "next";
import IngredientsClient from "./IngredientsClient";

export const metadata: Metadata = {
  title: "Natural Ingredients in Blovit Malts | Amudhasurabiy Organics",
  description: "Explore the 8 pure, farm-sourced ingredients inside Blovit malts: Dehydrated Apples, Beetroot, Kerala Nendran Banana, Sprouted Ragi, Almonds, Cashews, Palm Sugar & Cardamom.",
  alternates: {
    canonical: "/ingredients/",
  },
  openGraph: {
    title: "Natural Ingredients in Blovit Malts | Amudhasurabiy Organics",
    description: "100% natural, farm-sourced ingredients. Zero synthetic chemicals, zero maltodextrin fillers, zero refined white sugar.",
    url: "https://amudhasurabiy.com/ingredients/",
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

export default function IngredientsPage() {
  return <IngredientsClient />;
}
