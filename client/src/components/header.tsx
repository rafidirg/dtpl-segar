import React from "react";

export default function Header() {
  return (
    <header className="bg-green-600 text-white p-6 flex items-center justify-between">
      <div>
        <h1 className="text-4xl font-bold">Pesan Panen</h1>
        <p className="mt-2 text-xl">
          Memenuhi kebutuhan buah dan sayuran segar anda
        </p>
      </div>
      <nav className="mt-4">
        <ul className="flex space-x-4">
          <li>
            <a href="#home" className="text-lg hover:underline">
              Home
            </a>
          </li>
          <li>
            <a href="#about" className="text-lg hover:underline">
              About
            </a>
          </li>
          <li>
            <a href="#products" className="text-lg hover:underline">
              Products
            </a>
          </li>
          <li>
            <a href="#contact" className="text-lg hover:underline">
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
