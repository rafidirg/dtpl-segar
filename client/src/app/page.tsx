"use client";

import { getCategories, getProducts } from "@/data/loaders";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { TbShoppingCart, TbShoppingCartExclamation } from "react-icons/tb";
import { CategoryProps, ProductProps } from "@/types";
import { getStrapiMedia } from "@/utils/get-strapi-url";
import Link from "next/link";

export default function Home() {
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    async function loadCategories() {
      const { data } = await getCategories("/api/categories");
      setCategories([
        { id: "All", name: "All Products", image: { url: "" } },
        ...data,
      ]);
    }

    async function loadProducts() {
      const { data } = await getProducts("/api/products");
      setProducts(data);
    }

    loadCategories();
    loadProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      !selectedCategory || selectedCategory === "All Products"
        ? true
        : product.category === selectedCategory;

    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold">Mau Pesan Apa Hari Ini?</h1>
      <p className="text-gray-600 mb-4">
        Produk-produk yang dijual di PesanPanen adalah hasil produk petani asli
        Indonesia yang berkualitas, organik, dan ramah lingkungan.
      </p>

      <div className="relative mb-6">
        <input
          type="text"
          className="w-full p-2 border rounded-md pl-10"
          placeholder="Pencarian..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FaSearch className="absolute left-3 top-3 text-gray-500" />
      </div>

      <div className="flex space-x-4 overflow-x-auto">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`text-center cursor-pointer ${
              selectedCategory === category.name ? "text-blue-500" : ""
            }`}
            onClick={() =>
              setSelectedCategory(
                selectedCategory === category.name ? null : category.name
              )
            }
          >
            {category.image.url ? (
              <Image
                src={getStrapiMedia(category.image.url) ?? ""}
                alt={category.name}
                width={80}
                height={80}
                className="rounded-md"
              />
            ) : (
              <div className="w-20 h-20 bg-gray-200 mx-auto flex items-center justify-center">
                <p className="text-gray-500 text-sm">All</p>
              </div>
            )}
            <p className="text-sm mt-2">{category.name}</p>
          </button>
        ))}
      </div>

      <h2 className="text-2xl font-semibold mt-8">Special Hari Ini!</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
        {filteredProducts.map((product) => (
          <Link key={product.id} href={`/product/${product.slug}`}>
            <div
              key={product.id}
              className="relative border p-4 rounded-md text-center"
            >
              {product.isPreOrder ? (
                <div className="absolute -top-3 -right-3 bg-red-600 rounded-full w-8 h-8 flex items-center justify-center">
                  <TbShoppingCartExclamation size={16} color="white" />
                </div>
              ) : (
                <></>
              )}
              {product.image ? (
                <Image
                  src={getStrapiMedia(product.image[0].url) ?? ""}
                  alt={product.name}
                  width={120}
                  height={120}
                  className="mx-auto"
                />
              ) : (
                <div className="w-20 h-20 bg-gray-200 mx-auto flex items-center justify-center">
                  <FaShoppingCart className="text-gray-500 text-2xl" />
                </div>
              )}
              <p className="mt-2 font-medium">{product.name}</p>
              <p className="text-red-500 font-semibold">
                Rp{product.price.toLocaleString()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
