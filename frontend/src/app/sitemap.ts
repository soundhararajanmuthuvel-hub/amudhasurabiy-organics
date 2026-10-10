import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://amudhasurabiy.com";
  
  const routes = [
    "/",
    "/shop/",
    "/collections/",
    "/trust/",
    "/ingredients/",
    "/recipes/",
    "/recipes/abc-energy-smoothie/",
    "/recipes/beetroot-warm-latte/",
    "/recipes/nendran-toddler-porridge/",
    "/about-us/",
    "/contact-us/",
    "/why-blovit/",
    "/our-process/",
    "/wholesale/",
    "/quality-and-trust/",
    "/our-story/",
    "/product/abc-malt/",
    "/product/beetroot-malt/",
    "/product/nendran-banana-malt/",
    "/product/sprouted-ragi-malt/",
    "/blovit-abc-malt/",
    "/blovit-nendran-banana-malt/",
    "/blovit-beetroot-malt/",
    "/privacy-policy-2/",
    "/shipping-policy/",
    "/return-refund-policy/",
    "/terms-conditions/",
  ];

  return routes.map((route) => {
    const path = route === "/" ? "" : route;
    return {
      url: `${baseUrl}${path}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: route === "/" ? 1.0 : route.startsWith("/product/") ? 0.9 : 0.7,
    };
  });
}
