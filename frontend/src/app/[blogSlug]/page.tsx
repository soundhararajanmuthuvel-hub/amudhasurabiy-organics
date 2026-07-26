import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { ChevronLeft, Calendar, User, Clock, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import JsonLd from "@/components/JsonLd";

interface BlogArticle {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  readTime: string;
  imageUrl: string;
  content: string[];
}

const BLOG_ARTICLES: Record<string, BlogArticle> = {
  "blovit-abc-malt": {
    slug: "blovit-abc-malt",
    title: "Discover the Extraordinary Health Benefits of Blovit ABC Malt",
    description: "An in-depth look at how combining Apple, Beetroot, and Carrot can elevate your daily energy, immunity, and skin texture.",
    date: "July 20, 2026",
    author: "Amudhasurabiy Wellness Team",
    readTime: "6 min read",
    imageUrl: "/images/abc-malt.png",
    content: [
      "The 'ABC' formulation—standing for Apple, Beetroot, and Carrot—has long been hailed as a miracle drink in traditional naturopathy. At Amudhasurabiy Organics, we have refined this time-tested mixture into our signature Blovit ABC Malt. By pairing fresh dehydrated apples, beetroots, and carrots with organic sprouted grains, almonds, cashews, and palm sugar, we've created a luxurious drink that is as delicious as it is healthy.",
      "First and foremost, Blovit ABC Malt acts as an exceptional blood purifier. Beetroots are highly rich in iron and natural nitrates, which directly stimulate the production of hemoglobin in red blood cells. When combined with the high vitamin C levels found in carrots and apples, iron absorption is maximized. This makes our malt highly effective for individuals suffering from anemia, fatigue, or low blood oxygen levels.",
      "Beyond blood health, the synergistic action of antioxidants and carotenoids (specifically beta-carotene from carrots) protects the body from cellular damage. It promotes a natural, radiant skin glow by flushing out toxins and boosting dermal circulation. The rich dietary fibers support a healthy gut, stimulating digestive enzymes and preventing bloating.",
      "Unlike modern synthetic health powders loaded with maltodextrin, artificial colorings, and refined white sugars, Blovit ABC Malt contains 100% whole, natural ingredients. Suitable for children and adults of all ages, it serves as the ultimate clean energy fuel to power through your day."
    ]
  },
  "blovit-nendran-banana-malt": {
    slug: "blovit-nendran-banana-malt",
    title: "Nendran Banana Malt: The Natural Superfood for Growing Kids",
    description: "Learn why raw Kerala Nendran banana powder serves as an excellent nutritional builder and weight-gainer for toddlers.",
    date: "July 18, 2026",
    author: "Amudhasurabiy Nutritionist",
    readTime: "5 min read",
    imageUrl: "/images/nendran-banana-malt.png",
    content: [
      "When it comes to child nutrition, finding a natural, preservative-free weight gainer that kids actually enjoy is a challenge. Blovit Nendran Banana Malt is crafted specifically to meet this need. Formulated using raw Kerala Nendran bananas—sun-dried and powdered at our Kumbakonam facility—it retains all essential dietary fibers, potassium, and vitamins.",
      "Nendran Bananas are highly regarded in South Indian culture for their unique nutritional profile. Rich in complex carbohydrates, they provide a steady, sustained release of energy instead of sudden insulin spikes. This makes Nendran Banana Malt an ideal breakfast beverage to keep your children active and focused throughout school hours.",
      "Additionally, the rich potassium levels support muscle contraction and nerve impulses, while dietary fibers facilitate gentle, regular digestion, easing constipation in growing toddlers. Sprouted pearl millets and premium cashews blended into the malt supply magnesium, calcium, and proteins necessary for bone development.",
      "Parents can serve Blovit Nendran Banana Malt mixed with hot milk or warm water. It contains zero preservatives, synthetic flavors, or chemical thickeners, providing a safe, authentic path to healthy growth."
    ]
  },
  "blovit-beetroot-malt": {
    slug: "blovit-beetroot-malt",
    title: "Why Beetroot Malt is a Game-Changer for Iron Deficiencies",
    description: "Explore how natural beetroot malts boost hemoglobin count and support healthy blood circulation without side effects.",
    date: "July 15, 2026",
    author: "Dr. A. Sundararajan, Ayurveda Specialist",
    readTime: "5 min read",
    imageUrl: "/images/beetroot-malt.png",
    content: [
      "Anemia and low iron levels affect millions worldwide, leading to chronic fatigue, hair loss, and weakened immunity. While iron supplements are commonly prescribed, they often lead to gastrointestinal distress. Blovit Beetroot Malt offers an all-natural, highly bioavailable alternative.",
      "Beetroots contain an abundance of organic iron, folic acid, and essential trace minerals. The natural nitrates present in beetroot convert to nitric oxide inside the human body. Nitric oxide helps relax and dilate blood vessels, enhancing circulation and lowering blood pressure. This optimized blood flow ensures that tissues receive adequate oxygen, immediately combating fatigue.",
      "To ensure maximum therapeutic benefit, our beetroot malt is prepared by blending fresh beetroot juice extract with sprouted finger millets (ragi) and rich almonds. Sprouted ragi is an excellent calcium booster, acting in tandem with beetroot to strengthen skeletal structure.",
      "By incorporating two spoons of Blovit Beetroot Malt into hot milk daily, you choose a delicious, chemical-free path to healthy hemoglobin levels, sustained stamina, and a strong immune system."
    ]
  },
  "cardamom-benefits": {
    slug: "cardamom-benefits",
    title: "The Hidden Therapeutic Power of Cardamom in Organic Malts",
    description: "Explains digestive enzymes activation, oral hygiene, heart protection, and antioxidant profile of Cardamom.",
    date: "July 12, 2026",
    author: "Traditional Healing Journal",
    readTime: "4 min read",
    imageUrl: "/images/hero-bg.png",
    content: [
      "Known globally as the 'Queen of Spices,' cardamom (Elaichi) is far more than a simple flavoring agent. In Blovit organic malts, cardamom serves as a critical therapeutic ingredient, elevating both the wellness profile and taste of our drinks.",
      "Cardamom has been used in Ayurvedic formulations for millennia to treat digestive ailments. The active compounds in cardamom stimulate the secretion of bile and digestive enzymes, helping break down heavy nutrients (like the proteins in sprouted grains and nuts) smoothly. This prevents indigestion, gas, and stomach cramps.",
      "Furthermore, cardamom is loaded with powerful antioxidants that fight oxidative stress and lower inflammation. Its natural diuretic properties aid in detoxifying the kidneys, while its warm aromatic compounds help clear respiratory passages, comforting cold symptoms.",
      "Every sip of Blovit Malt is enriched with premium cardamoms sourced directly from organic hill farms, assuring you receive authentic taste and premium wellness benefits."
    ]
  },
  "almond-benefits": {
    slug: "almond-benefits",
    title: "Why Almonds are the Cornerstone of Premium Malt Mixes",
    description: "Explains Vitamin E, cognitive health, magnesium for heart, and protein content of Almonds.",
    date: "July 10, 2026",
    author: "Blovit Food Labs",
    readTime: "4 min read",
    imageUrl: "/images/hero-bg.png",
    content: [
      "Almonds (Badam) are universally recognized as nutritional powerhouses. In our pursuit to create a truly luxury health drink, Amudhasurabiy Organics integrates finely ground premium almonds into every pack of Blovit Malt.",
      "Almonds are an abundant source of Vitamin E, a fat-soluble antioxidant that shields cells from oxidative stress and plays a crucial role in maintaining healthy skin and hair. The high concentration of healthy monounsaturated fats supports cardiovascular function by balancing cholesterol levels.",
      "For children, almonds provide key brain-boosting nutrients like riboflavin and L-carnitine, which support cognitive development and memory retention. The plant proteins in almonds contribute to muscle repair and growth, complementing the sprouted millets.",
      "Our almonds are carefully selected and roasted gently to preserve their vital oils before being incorporated, ensuring that Blovit remains a rich, nutty, and highly nourishing beverage."
    ]
  },
  "cashew-nut-benefits": {
    slug: "cashew-nut-benefits",
    title: "The Nutritional Gold of Cashew Nuts in Traditional Drinks",
    description: "Explains healthy fats, immune-boosting zinc, lutein for vision, and health properties of Cashew.",
    date: "July 08, 2026",
    author: "Amudhasurabiy Wellness Team",
    readTime: "4 min read",
    imageUrl: "/images/hero-bg.png",
    content: [
      "Cashew nuts (Munthiri) add a luxurious, creamy texture to traditional malt drinks, but their nutritional benefits run much deeper. Rich in essential minerals, cashews are a vital component of the Blovit formulation.",
      "Cashews are particularly rich in zinc and copper. Zinc is key for the development of immune cells, helping the body fight off seasonal infections and heal wounds quickly. Copper, on the other hand, is essential for iron metabolism and forming blood vessels.",
      "Moreover, cashews contain lutein and zeaxanthin, two powerful carotenoids that protect the eyes from light damage and reduce the risk of macular degeneration. The healthy unsaturated fats in cashews also provide a stable source of clean daily energy.",
      "By incorporating premium cashews into Blovit, we guarantee a beverage that supports your heart, eyes, and immune system while delivering a delicious, buttery flavor."
    ]
  }
};

interface PageProps {
  params: Promise<{ blogSlug: string }>;
}

// Generate dynamic metadata for blog articles
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { blogSlug } = await params;
  const article = BLOG_ARTICLES[blogSlug];
  if (!article) {
    return {
      title: "Article Not Found | Blovit",
    };
  }
  return {
    title: `${article.title} | Blovit Blog`,
    description: article.description,
    alternates: {
      canonical: `/${article.slug}/`,
    },
    openGraph: {
      title: article.title,
      description: article.description,
      url: `https://amudhasurabiy.com/${article.slug}/`,
      images: [
        {
          url: `https://amudhasurabiy.com${article.imageUrl}`,
          alt: article.title,
        },
      ],
      type: "article",
    },
  };
}

export default async function BlogPage({ params }: PageProps) {
  const { blogSlug } = await params;
  const article = BLOG_ARTICLES[blogSlug];
  
  if (!article) {
    notFound();
  }

  // Get related articles
  const related = Object.values(BLOG_ARTICLES).filter((a) => a.slug !== article.slug);

  return (
    <>
      <JsonLd type="article" data={article} />
      <JsonLd
        type="breadcrumb"
        data={{
          items: [
            { name: "Home", url: "/" },
            { name: "Blog", url: "/#blog" },
            { name: article.title, url: `/${article.slug}/` },
          ],
        }}
      />
      <Header />

      <main className="flex-grow bg-cream py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          
          {/* Back button */}
          <Link
            href="/"
            className="inline-flex items-center gap-1 font-heading text-sm font-semibold text-walnut-brown/60 hover:text-moss-green transition-colors mb-8"
          >
            <ChevronLeft className="h-4 w-4" /> Back to Home
          </Link>

          {/* Article Header */}
          <article className="bg-white rounded-3xl p-6 md:p-10 border border-walnut-brown/5 shadow-sm mb-12">
            <span className="font-heading text-xs font-bold text-moss-green uppercase tracking-widest block mb-4">
              Organic Health Blog
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-walnut-brown leading-tight mb-6">
              {article.title}
            </h1>

            {/* Author Meta */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-body text-walnut-brown/50 border-b border-walnut-brown/10 pb-6 mb-8">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-moss-green" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <User className="h-4 w-4 text-moss-green" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-moss-green" />
                <span>{article.readTime}</span>
              </div>
            </div>

            {/* Article Content */}
            <div className="font-body text-base text-walnut-brown/85 leading-relaxed space-y-6">
              {article.content.map((p, index) => (
                <p key={index}>{p}</p>
              ))}
            </div>
          </article>

          {/* Related Articles list */}
          <section className="border-t border-walnut-brown/10 pt-12">
            <h3 className="font-heading text-xl font-bold text-walnut-brown mb-6">More Wellness Reading</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {related.slice(0, 2).map((a) => (
                <div key={a.slug} className="bg-white border border-walnut-brown/5 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="font-body text-xs text-walnut-brown/50 block mb-2">{a.date}</span>
                    <Link href={`/${a.slug}/`} className="hover:text-moss-green">
                      <h4 className="font-heading text-base font-bold text-walnut-brown mb-2 line-clamp-2">
                        {a.title}
                      </h4>
                    </Link>
                    <p className="font-body text-xs text-walnut-brown/70 line-clamp-2 mb-4">
                      {a.description}
                    </p>
                  </div>
                  <Link
                    href={`/${a.slug}/`}
                    className="flex items-center gap-1 font-heading text-xs font-bold text-moss-green uppercase tracking-wider hover:text-walnut-brown transition-colors group mt-4"
                  >
                    Read Article <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>

      <WhatsAppButton />
      <Footer />
    </>
  );
}
