"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Apa itu PesanPanen?",
    answer:
      "PesanPanen adalah platform yang menyediakan buah dan sayuran segar langsung dari petani lokal Indonesia.",
  },
  {
    question: "Bagaimana cara memesan produk?",
    answer:
      "Anda dapat memilih produk yang diinginkan, menambahkannya ke keranjang, dan melanjutkan ke proses checkout.",
  },
  {
    question: "Apakah produk tersedia untuk pre-order?",
    answer:
      "Ya, beberapa produk tersedia untuk pre-order. Informasi ini akan ditampilkan pada halaman produk.",
  },
  {
    question: "Bagaimana cara pembayaran?",
    answer:
      "Kami menyediakan berbagai metode pembayaran, termasuk transfer bank melalui BCA dan BRI.",
  },
  {
    question: "Apakah ada layanan penyimpanan dingin?",
    answer:
      "Ya, kami menyediakan opsi penyimpanan dingin untuk produk tertentu dengan biaya tambahan.",
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Frequently Asked Questions</h1>
      <div className="bg-white shadow-md rounded-md p-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b last:border-b-0">
            <button
              className="w-full text-left py-4 font-semibold text-gray-700 flex justify-between items-center"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              <span className="text-gray-500">
                {activeIndex === index ? "-" : "+"}
              </span>
            </button>
            {activeIndex === index && (
              <p className="text-gray-600 mb-4">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
