"use client"; 

import { useState } from "react";
import Image from "next/image";
import { FaShoppingCart } from "react-icons/fa";
import parse from "html-react-parser";

const product = {
  id: 1,
  name: "Bawang Bombay",
  category: "Sayur",
  storage: "7-10 hari",
  availability: "Besok",
  type: "Penyimpanan Dingin",
  description:
    "Tersedia dalam pilihan konvensional dan imperfect. Kulit bawang bombay imperfect agak terbuka. Namun rasa dan nutrisinya tetap sama. Simpan di tempat kering agar tetap tahan lama.",
  storageInstructions: [
    "Bawang bombay yang belum dikupas dapat disimpan di suhu ruangan",
    "Bawang bombay yang sudah dikupas perlu disimpan di wadah kedap udara, kemudian dimasukkan dalam kulkas agar lebih awet",
  ],
  weightOptions: [
    { weight: "500 gram", price: 19900 },
    { weight: "1 Kg", price: 39300 },
    { weight: "3 × 500 gr", price: 44800 },
  ],
  image: "/onion.png",
  richTextDescription: `
    <p><strong>Bawang bombay memiliki rasa agak pedas gurih dan teksturnya renyah.</strong> Cocok untuk teriyaki, onion ring, dan berbagai kreasi masakan lainnya.</p>
    <p>Terdapat potensi kelebihan/kekurangan gramasi ±10% per pack.</p>
  `,
};

export default function ProductView() {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="container mx-auto p-6">
      <button className="text-gray-600 mb-4">&lt; Kembali</button>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2 bg-gray-100 flex justify-center items-center">
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={300}
          />
        </div>
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <div className="flex space-x-2 my-4">
            {product.weightOptions.map((option, index) => (
              <button
                key={index}
                className="border px-4 py-2 rounded-md hover:border-green-500"
              >
                {option.weight} <br /> Rp{option.price.toLocaleString()}
              </button>
            ))}
          </div>
          <span className="inline-flex items-center bg-green-500 text-white px-3 py-2 rounded-md">
            {product.type}
          </span>
          <p className="text-gray-500 mt-3">
            Tersedia:{" "}
            <span className="text-green-500">{product.availability}</span>
          </p>
          <h2 className="text-xl font-semibold mt-6">Informasi Produk</h2>
          <p>
            <strong>Kategori</strong>:{" "}
            <span className="text-green-500">{product.category}</span>
          </p>
          <p>
            <strong>Umur Simpan</strong>: {product.storage}
          </p>
          <div className="text-gray-600 mt-2">
            {parse(product.richTextDescription)}
          </div>
          <h3 className="text-lg font-semibold mt-4">Petunjuk Penyimpanan</h3>
          <ul className="list-disc ml-6 text-gray-600">
            {product.storageInstructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ul>
          <div className="flex items-center mt-6">
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
            <button className="ml-4 bg-green-500 text-white px-4 py-2 rounded-md flex items-center">
              <FaShoppingCart className="mr-2" /> Tambah ke Keranjang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
