import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PRODUCTS, getProductBySlug, getRelatedProducts } from "@/lib/products-data";
import { TopBrandBar } from "@/components/TopBrandBar";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ProductDetailClient } from "@/components/pdp/ProductDetailClient";

export async function generateStaticParams() {
  const params: { slug: string }[] = [];
  PRODUCTS.forEach((product) => {
    params.push({ slug: product.slug });
    product.aliases?.forEach((alias) => {
      params.push({ slug: alias });
    });
  });
  return params;
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const product = getProductBySlug(slug);
  if (!product) {
    return { title: "Product Not Found | Anker Nordics" };
  }
  return {
    title: `${product.title} | Anker Nordics`,
    description: product.subtitle,
  };
}

export default async function ProductPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const related = getRelatedProducts(product.id, 4);

  return (
    <>
      <TopBrandBar />
      <AnnouncementBar />
      <SiteHeader />
      <main>
        <ProductDetailClient product={product} relatedProducts={related} />
      </main>
      <SiteFooter />
    </>
  );
}
