"use client";

import Image from "next/image";
import { useState } from "react";
import { FaSearch, FaShoppingCart } from "react-icons/fa";

const categories = [
  { name: "Produk Terbaru", image: "/new.png" },
  { name: "Sayur", image: "/vegetables.png" },
  { name: "Buah", image: "/fruits.png" },
  { name: "Protein", image: "/protein.png" },
  { name: "Sembako", image: "/groceries.png" },
];

const products = [
  {
    id: 1,
    name: "Daging Sapi Rendang",
    price: 39900,
    weight: "250g, 500g",
    image: "/beef.png",
  },
  {
    id: 2,
    name: "Ikan1",
    price: 51900,
    weight: "300g",
    image: "",
  },
  {
    id: 3,
    name: "Ikan2",
    price: 51900,
    weight: "300g",
    image: "",
  },
  {
    id: 4,
    name: "Ikan3",
    price: 51900,
    weight: "300g",
    image: "",
  },
  {
    id: 5,
    name: "Ikan4",
    price: 51900,
    weight: "300g",
    image: "",
  },
  {
    id: 6,
    name: "Ikan5",
    price: 51900,
    weight: "300g",
    image: "",
  },
];

export default function Home() {
  const [search, setSearch] = useState("");

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
        {categories.map((category, index) => (
          <div key={index} className="text-center">
            <Image
              src={category.image}
              alt={category.name}
              width={80}
              height={80}
              className="rounded-md"
            />
            <p className="text-sm mt-2">{category.name}</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-semibold mt-8">Special Hari Ini!</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded-md text-center">
            {product.image ? (
              <Image
                src={product.image}
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
            <p className="text-sm text-gray-500">{product.weight}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
