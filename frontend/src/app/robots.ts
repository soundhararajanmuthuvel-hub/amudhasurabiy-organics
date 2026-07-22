import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/my-account/",
        "/cart/",
        "/checkout/",
      ],
    },
    sitemap: "https://amudhasurabiy.com/sitemap.xml",
  };
}
