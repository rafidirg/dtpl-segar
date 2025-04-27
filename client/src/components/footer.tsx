"use client";

import { useState } from "react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
} from "react-icons/fa";

export default function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start">
            {/* PesanPanen and Social Media */}
            <div className="mb-6 md:mb-0">
              <h2 className="text-lg font-semibold">PesanPanen</h2>
              <div className="flex space-x-4 mt-4 text-gray-600">
                <FaFacebookF className="text-xl cursor-pointer" />
                <FaLinkedinIn className="text-xl cursor-pointer" />
                <FaYoutube className="text-xl cursor-pointer" />
                <FaInstagram className="text-xl cursor-pointer" />
              </div>
            </div>

            {/* Hubungi Kami */}
            <div className="mb-6 md:mb-0">
              <h3 className="text-sm font-semibold mb-2">Hubungi Kami</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li className="flex items-center">
                  <FaMapMarkerAlt className="mr-2" />
                  Desa Manud Jaya, Kec. Manud, Kab. Garut, Jawa Barat, 44172
                </li>
                <li className="flex items-center">
                  <FaPhoneAlt className="mr-2" />
                  0800-123-4567 (Bebas Pulsa)
                </li>
                <li className="flex items-center">
                  <FaPhoneAlt className="mr-2" />
                  +62 812 3456 7890
                </li>
                <li className="flex items-center">
                  <FaEnvelope className="mr-2" />
                  support@pesanpanen.com
                </li>
                <li className="flex items-center">
                  <FaClock className="mr-2" />
                  Jam Operasional Setiap Hari, Senin – Minggu 08.00 – 20.00 WIB
                </li>
              </ul>
            </div>

            {/* Links */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full md:w-auto">
              <div>
                <h3 className="text-sm font-semibold mb-2">Tentang Kami</h3>
                <ul className="text-gray-600 space-y-1 text-sm">
                  <li>
                    <a href="#" className="hover:underline">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-2">Berita</h3>
                <ul className="text-gray-600 space-y-1 text-sm">
                  <li>
                    <a href="#" className="hover:underline">
                      Berita & Promo
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Blog
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-2">
                  Bantuan & Panduan
                </h3>
                <ul className="text-gray-600 space-y-1 text-sm">
                  <li>
                    <a href="#" className="hover:underline">
                      Bantuan
                    </a>
                  </li>
                  <li>
                    <a href="/faq-petani" className="hover:underline">
                      FAQ Admin Petani
                    </a>
                  </li>
                  <li>
                    <a href="/faq" className="hover:underline">
                      FAQ
                    </a>
                  </li>
                  <li>
                    <button onClick={openModal} className="hover:underline">
                      Teman PesanPanen
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 h-3/4 p-4 relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              ✕
            </button>
            <iframe
              src="https://copilotstudio.microsoft.com/environments/Default-485d0c2a-b3bc-407c-98fb-825408258656/bots/cr145_temanPesanPanen/webchat?_version_=2"
              title="Chat with Teman PesanPanen"
              style={{ width: "100%", height: "100%" }}
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
}
