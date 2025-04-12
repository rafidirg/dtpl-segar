// app/products/[slug]/page.tsx

import { getProductBySlug } from "@/data/loaders";
import { notFound } from "next/navigation";
import ProductClient from "./productClient";
import { ProductProps } from "@/types";

interface PageProps {
  params: { slug: string };
}

export default async function ProductPage({ params }: PageProps) {
  const { data } = await getProductBySlug((await params).slug, "/api/products");
  const product = data[0];
  if (!product) throw notFound();

  return <ProductClient product={product as ProductProps} />;
}
