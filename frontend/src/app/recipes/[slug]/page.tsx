import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { ChevronLeft, Clock, ChefHat, CheckCircle2, ShoppingCart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import JsonLd from "@/components/JsonLd";
import { MOCK_RECIPES, MOCK_PRODUCTS } from "@/lib/api/mockData";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const recipe = MOCK_RECIPES.find((r) => r.slug === slug);
  if (!recipe) return { title: "Recipe Not Found | Blovit" };
  return {
    title: `${recipe.title} - Blovit Kitchen`,
    description: recipe.description,
    alternates: { canonical: `/recipes/${recipe.slug}/` },
  };
}

export default async function RecipeDetail({ params }: PageProps) {
  const { slug } = await params;
  const recipe = MOCK_RECIPES.find((r) => r.slug === slug);

  if (!recipe) notFound();

  const recommendedProduct = MOCK_PRODUCTS.find((p) => p.id === recipe.recommendedProductId) || MOCK_PRODUCTS[0];

  return (
    <>
      <JsonLd type="recipe" data={recipe} />
      <JsonLd
        type="breadcrumb"
        data={{
          items: [
            { name: "Home", url: "/" },
            { name: "Recipes", url: "/recipes/" },
            { name: recipe.title, url: `/recipes/${recipe.slug}/` },
          ],
        }}
      />
      <Header />

      <main className="flex-grow bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          
          <Link href="/recipes/" className="inline-flex items-center gap-1 font-heading text-xs font-bold text-walnut-brown/60 hover:text-moss-green uppercase tracking-wider mb-8">
            <ChevronLeft className="h-4 w-4" /> Back to Recipes
          </Link>

          {/* Recipe Card Header */}
          <article className="bg-white rounded-3xl p-6 md:p-10 border border-walnut-brown/5 shadow-sm mb-12">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-body text-[10px] font-bold uppercase tracking-wider text-moss-green bg-moss-green/10 px-3 py-1 rounded-full">
                {recipe.category}
              </span>
              <span className="font-body text-xs text-walnut-brown/50 flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" /> Prep Time: {recipe.prepTime}
              </span>
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-walnut-brown leading-tight mb-6">
              {recipe.title}
            </h1>

            <p className="font-body text-sm text-walnut-brown/80 leading-relaxed mb-8">
              {recipe.description}
            </p>

            <div className="relative h-80 w-full rounded-2xl overflow-hidden bg-cream-dark mb-10">
              <Image src={recipe.imageUrl} alt={recipe.title} fill className="object-cover" />
            </div>

            {/* Ingredients & Steps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10">
              
              {/* Ingredients */}
              <div className="md:col-span-5 bg-cream p-6 rounded-2xl border border-walnut-brown/5">
                <h3 className="font-heading text-base font-bold text-walnut-brown mb-4 flex items-center gap-2">
                  <ChefHat className="h-4.5 w-4.5 text-moss-green" /> Ingredients
                </h3>
                <ul className="flex flex-col gap-2.5 font-body text-xs text-walnut-brown/85">
                  {recipe.ingredients.map((ing, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-moss-green shrink-0 mt-0.5" />
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Instructions */}
              <div className="md:col-span-7">
                <h3 className="font-heading text-base font-bold text-walnut-brown mb-4">Step-by-Step Preparation</h3>
                <ol className="flex flex-col gap-4 font-body text-xs text-walnut-brown/85">
                  {recipe.steps.map((step, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span className="h-6 w-6 rounded-full bg-moss-green/10 text-moss-green font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <p className="leading-relaxed pt-0.5">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>

            </div>

            {/* Recommended Product Box */}
            <div className="bg-cream-dark p-6 rounded-3xl border border-walnut-brown/10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 rounded-xl overflow-hidden bg-white border shrink-0">
                  <Image src={recommendedProduct.imageUrl} alt={recommendedProduct.name} fill className="object-cover" />
                </div>
                <div>
                  <span className="font-heading text-[10px] font-bold uppercase tracking-wider text-moss-green block">Recommended Malt</span>
                  <h4 className="font-heading text-base font-bold text-walnut-brown">{recommendedProduct.name}</h4>
                  <span className="font-heading text-xs font-semibold text-moss-green">₹{recommendedProduct.price}</span>
                </div>
              </div>
              <Link
                href={`/product/${recommendedProduct.slug}/`}
                className="bg-moss-green hover:bg-walnut-brown text-white px-6 py-3 rounded-full font-heading text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 shrink-0"
              >
                <ShoppingCart className="h-3.5 w-3.5" /> Buy Malt
              </Link>
            </div>

          </article>

        </div>
      </main>

      <WhatsAppButton />
      <Footer />
    </>
  );
}
