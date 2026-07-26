import { Metadata } from "next";
import RecipesClient from "./RecipesClient";

export const metadata: Metadata = {
  title: "Healthy Drink Recipes with Blovit Malts | Blovit Kitchen",
  description: "Discover creative, delicious recipes using Blovit organic malt powders — morning smoothies, warm lattes, and toddler porridges from Amudhasurabiy Organics.",
  alternates: {
    canonical: "/recipes/",
  },
  openGraph: {
    title: "Healthy Drink Recipes with Blovit Malts | Blovit Kitchen",
    description: "Creative ways to enjoy Blovit ABC Malt, Beetroot Malt, and Nendran Banana Malt — smoothies, lattes, and kids porridges.",
    url: "https://amudhasurabiy.com/recipes/",
    images: [
      {
        url: "/images/abc-malt.png",
        width: 512,
        height: 512,
        alt: "Blovit ABC Malt Recipes",
      },
    ],
  },
};

export default function RecipesPage() {
  return <RecipesClient />;
}
