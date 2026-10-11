/**
 * Utility to clean product descriptions and text:
 * - Strips raw HTML tags (<p>, <br>, <div>, etc.)
 * - Decodes encoded HTML entities (&nbsp;, &amp;, &quot;, &#39;, etc.)
 * - Strips rich-text editor metadata and HTML comments
 * - Removes verbatim duplicated sentences
 * - Normalizes spacing
 */
export function cleanProductText(input: unknown): string {
  if (typeof input !== "string" || !input) return "";

  let text = input;

  // 1. Remove HTML comments and editor block markers
  text = text.replace(/<!--[\s\S]*?-->/g, " ");

  // 2. Remove editor JSON blocks if raw editor data leaked
  text = text.replace(/\{"ops":\s*\[[\s\S]*?\]\}/g, " ");
  text = text.replace(/\{"blocks":\s*\[[\s\S]*?\]\}/g, " ");

  // 3. Strip all HTML tags
  text = text.replace(/<[^>]*>/g, " ");

  // 4. Decode common and numeric HTML entities
  const entityMap: Record<string, string> = {
    "&nbsp;": " ",
    "&amp;": "&",
    "&quot;": '"',
    "&apos;": "'",
    "&#39;": "'",
    "&#039;": "'",
    "&rsquo;": "'",
    "&lsquo;": "'",
    "&rdquo;": '"',
    "&ldquo;": '"',
    "&ndash;": "–",
    "&mdash;": "—",
    "&bull;": "•",
    "&hellip;": "…",
    "&lt;": "<",
    "&gt;": ">",
  };

  text = text.replace(/&(?:nbsp|amp|quot|apos|#39|#039|rsquo|lsquo|rdquo|ldquo|ndash|mdash|bull|hellip|lt|gt);/gi, (match) => {
    const lower = match.toLowerCase();
    return entityMap[lower] || " ";
  });

  // Decode decimal entities (e.g. &#160;)
  text = text.replace(/&#(\d+);/g, (_, dec) => {
    try {
      return String.fromCharCode(Number(dec));
    } catch {
      return "";
    }
  });

  // Decode hex entities (e.g. &#xa0;)
  text = text.replace(/&#x([0-9a-f]+);/gi, (_, hex) => {
    try {
      return String.fromCharCode(parseInt(hex, 16));
    } catch {
      return "";
    }
  });

  // 5. Normalize whitespace
  text = text.replace(/\s+/g, " ").trim();

  // 6. Deduplicate verbatim repeated sentences
  const sentences = text.split(/(?<=[.!?])\s+/);
  const seen = new Set<string>();
  const deduped: string[] = [];

  for (const sentence of sentences) {
    const normalized = sentence.toLowerCase().trim();
    if (normalized && !seen.has(normalized)) {
      seen.add(normalized);
      deduped.push(sentence);
    }
  }

  return deduped.join(" ");
}
