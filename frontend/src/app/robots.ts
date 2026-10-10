import { MetadataRoute } from "next";
import { headers } from "next/headers";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const headersList = await headers();
  const host = headersList.get("host") ?? "";

  // Block crawlers on the staging/demo subdomain
  const isDemo = host.startsWith("demo.");

  if (isDemo) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
      // No sitemap for the demo host
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/my-account/",
        "/cart/",
        "/checkout/",
        "/login/",
        "/create-account/",
        "/forgot-password/",
        "/reset-password/",
        "/api/",
      ],
    },
    sitemap: "https://amudhasurabiy.com/sitemap.xml",
  };
}
