import { API_BASE, USE_MOCK, getApiHeaders } from "./client";
import { testimonials as MOCK_TESTIMONIALS, Testimonial } from "@/lib/data/testimonials";

export async function getTestimonials(): Promise<Testimonial[]> {
  if (USE_MOCK) {
    return Promise.resolve(MOCK_TESTIMONIALS);
  }

  try {
    const res = await fetch(`${API_BASE}/testimonials`, {
      headers: getApiHeaders(),
    });
    if (!res.ok) return MOCK_TESTIMONIALS;
    const data = await res.json();
    return Array.isArray(data) && data.length > 0 ? data : MOCK_TESTIMONIALS;
  } catch (err) {
    console.error("Failed to fetch testimonials from backend, using fallback data:", err);
    return MOCK_TESTIMONIALS;
  }
}
