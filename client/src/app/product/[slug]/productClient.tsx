"use client";

import { useState } from "react";
import Image from "next/image";
import { FaShoppingCart } from "react-icons/fa";
import { TbShoppingCart, TbShoppingCartExclamation } from "react-icons/tb";
import parse from "html-react-parser";
import { ProductProps } from "@/types";
import { getStrapiMedia } from "@/utils/get-strapi-url";
import ReactMarkdown from "react-markdown";
import { addToCart } from "@/data/loaders";

interface ProductClientProps {
  product: ProductProps;
}

export default function ProductClient({ product }: ProductClientProps) {
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const images = product.image ?? [];

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleAddToCart = async () => {
    try {
      setIsAdding(true);
      const userId = "abc"; // Replace with actual user ID logic
      const response = await addToCart(
        userId,
        product.documentId,
        quantity,
        "/api/carts"
      );
      console.log("Added to cart:", response);
      alert("Produk berhasil ditambahkan ke keranjang!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Gagal menambahkan produk ke keranjang.");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <button className="text-gray-600 mb-4">&lt; Kembali</button>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2 bg-gray-100 flex flex-col items-center justify-center relative">
          {images.length > 0 ? (
            <>
              <Image
                src={getStrapiMedia(images[currentImageIndex].url) ?? ""}
                alt={product.name}
                width={300}
                height={300}
                className="rounded"
              />
              {images.length > 1 && (
                <div className="flex gap-4 mt-4">
                  <button
                    onClick={handlePrev}
                    className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    ← Sebelumnya
                  </button>
                  <button
                    onClick={handleNext}
                    className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    Berikutnya →
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-gray-400 italic">No image available</div>
          )}
        </div>
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-500 mt-2">
            Harga: Rp{product.price.toLocaleString()}
          </p>
          <p>
            Tersedia dalam:{" "}
            {(() => {
              if (product.Tersedia.includes("besok")) {
                return (
                  <span className="bg-gray-400 rounded-md text-white px-1 py-0.5">
                    Besok
                  </span>
                );
              } else if (product.Tersedia.includes("satu minggu")) {
                return (
                  <span className="bg-yellow-400 rounded-md text-white px-1 py-0.5">
                    1 minggu
                  </span>
                );
              } else if (product.Tersedia.includes("dua minggu")) {
                return (
                  <span className="bg-orange-400 rounded-md text-white px-1 py-0.5">
                    2 minggu
                  </span>
                );
              } else if (product.Tersedia.includes("tiga minggu")) {
                return (
                  <span className="bg-orange-500 rounded-md text-white px-1 py-0.5">
                    3 minggu
                  </span>
                );
              } else if (!product.Tersedia.includes("lebih dari")) {
                return (
                  <span className="bg-red-500 rounded-md text-white px-1 py-0.5">
                    1 bulan
                  </span>
                );
              } else {
                return (
                  <span className="bg-red-600 rounded-md text-white px-1 py-0.5">
                    {">"} 1 bulan
                  </span>
                );
              }
            })()}
          </p>
          <h2 className="text-xl font-semibold mt-6">Informasi Produk</h2>
          <p>
            <strong>Kategori</strong>:{" "}
            <span className="text-green-500">{product.category}</span>
          </p>
          <div className="text-gray-600 mt-2 prose prose-green max-w-none">
            <ReactMarkdown>{product.description}</ReactMarkdown>
          </div>
          <div className=" mt-6">
            {product.isPreOrder ? (
              <p className="text-red-500">
                Produk Belum Siap, Silahkan Pre-order!
              </p>
            ) : (
              <p></p>
            )}
            <div className="flex items-center">
              <button
                className="px-3 py-2 border rounded-md"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <span className="mx-4">{quantity}</span>
              <button
                className="px-3 py-2 border rounded-md"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
              {product.isPreOrder ? (
                <button
                  className="ml-4 bg-red-500 text-white px-4 py-2 rounded-md flex items-center"
                  onClick={handleAddToCart} // Connect the function here
                  disabled={isAdding} // Disable the button while adding to cart
                >
                  <TbShoppingCartExclamation className="mr-2" />
                  {isAdding ? "Menambahkan..." : "Tambah ke Keranjang"}
                </button>
              ) : (
                <button
                  className="ml-4 bg-green-500 text-white px-4 py-2 rounded-md flex items-center"
                  onClick={handleAddToCart} // Connect the function here
                  disabled={isAdding} // Disable the button while adding to cart
                >
                  <TbShoppingCart className="mr-2" />
                  {isAdding ? "Menambahkan..." : "Tambah ke Keranjang"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
