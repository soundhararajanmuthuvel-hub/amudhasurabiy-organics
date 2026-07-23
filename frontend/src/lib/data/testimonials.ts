export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  date: string;
  content: string;
  verifiedGoogle: boolean;
  initials: string;
  productMentioned?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "rev-1",
    name: "Ramanathan K.",
    location: "Chennai, Tamil Nadu",
    rating: 5,
    date: "2 weeks ago",
    content: "Blovit ABC Malt has become our family's daily morning drink. Knowing it comes from Amudhasurabiy Organics with zero artificial preservatives gives complete peace of mind.",
    verifiedGoogle: true,
    initials: "RK",
    productMentioned: "Blovit ABC Malt",
  },
  {
    id: "rev-2",
    name: "Aswathy Nair",
    location: "Kochi, Kerala",
    rating: 5,
    date: "1 month ago",
    content: "The Nendran Banana Malt is a natural weight gainer for my toddler. He loves the natural sweetness of raw palm jaggery.",
    verifiedGoogle: true,
    initials: "AN",
    productMentioned: "Blovit Nendran Banana Malt",
  },
  {
    id: "rev-3",
    name: "Meera Krishnan",
    location: "Bengaluru, Karnataka",
    rating: 5,
    date: "3 weeks ago",
    content: "Blovit Beetroot Malt improved my hemoglobin levels within a month. Authentic taste, premium packaging, and quick shipping from Kumbakonam!",
    verifiedGoogle: true,
    initials: "MK",
    productMentioned: "Blovit Beetroot Malt",
  },
  {
    id: "rev-4",
    name: "Priya Sundaram",
    location: "Coimbatore, Tamil Nadu",
    rating: 5,
    date: "1 month ago",
    content: "High quality organic malt drinks. My children love the taste of ABC Malt with warm milk every morning.",
    verifiedGoogle: true,
    initials: "PS",
    productMentioned: "Blovit ABC Malt",
  },
  {
    id: "rev-5",
    name: "Senthil Kumar",
    location: "Madurai, Tamil Nadu",
    rating: 5,
    date: "2 months ago",
    content: "Traditional taste without any chemical preservatives or artificial colors. Very happy with Amudhasurabiy Organics.",
    verifiedGoogle: true,
    initials: "SK",
  },
  {
    id: "rev-6",
    name: "Dr. Anitha Rajesh",
    location: "Tiruchirappalli, Tamil Nadu",
    rating: 5,
    date: "1 month ago",
    content: "Recommended Blovit Beetroot Malt to many of my patients seeking a natural iron boost. Excellent product quality and pure ingredients.",
    verifiedGoogle: true,
    initials: "AR",
    productMentioned: "Blovit Beetroot Malt",
  },
];
