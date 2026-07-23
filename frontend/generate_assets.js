/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

async function generateAssets() {
  const svgPath = path.join(__dirname, "public", "images", "logo.svg");
  if (!fs.existsSync(svgPath)) {
    console.error("logo.svg not found at", svgPath);
    return;
  }

  const svgBuffer = fs.readFileSync(svgPath);

  // Define outputs
  const targets = [
    { path: path.join(__dirname, "public", "images", "logo.png"), size: 512 },
    { path: path.join(__dirname, "public", "favicon-16x16.png"), size: 16 },
    { path: path.join(__dirname, "public", "favicon-32x32.png"), size: 32 },
    { path: path.join(__dirname, "public", "apple-touch-icon.png"), size: 180 },
    { path: path.join(__dirname, "public", "android-chrome-192x192.png"), size: 192 },
    { path: path.join(__dirname, "public", "android-chrome-512x512.png"), size: 512 },
    { path: path.join(__dirname, "public", "favicon.ico"), size: 32 },
    { path: path.join(__dirname, "src", "app", "favicon.ico"), size: 32 },
  ];

  for (const target of targets) {
    await sharp(svgBuffer)
      .resize(target.size, target.size)
      .png()
      .toFile(target.path);
    console.log(`Generated: ${target.path} (${target.size}x${target.size})`);
  }

  // Generate site.webmanifest
  const manifest = {
    name: "Amudhasurabiy Organics",
    short_name: "Amudhasurabiy",
    description: "Official Digital Headquarters of Amudhasurabiy Organics — Pure Nutrition. Naturally Crafted.",
    start_url: "/",
    display: "standalone",
    background_color: "#FDFBF7",
    theme_color: "#2E5A44",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable"
      }
    ]
  };

  fs.writeFileSync(
    path.join(__dirname, "public", "site.webmanifest"),
    JSON.stringify(manifest, null, 2)
  );
  console.log("Generated: public/site.webmanifest");
}

generateAssets().catch(err => {
  console.error("Asset generation error:", err);
  process.exit(1);
});
