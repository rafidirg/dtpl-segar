"use client";

import Link from "next/link";
import React, { useEffect } from "react";

export default function Header() {
  const [isLloggedIn, setIsLoggedIn] = React.useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLoggedIn(!!localStorage.getItem("userEmail"));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <header className="bg-green-600 text-white p-6 flex items-center justify-between">
      <div>
        <a href="/" className="text-white text-2xl font-bold">
          Pesan Panen
        </a>
        <p className="mt-2 text-xl">
          Memenuhi kebutuhan buah dan sayuran segar anda
        </p>
      </div>
      <nav className="mt-4">
        <ul className="flex space-x-4">
          <li>
            <Link href="/" className="text-lg hover:underline">
              Home
            </Link>
          </li>
          {!isLloggedIn ? (
            <>
              <li>
                <Link href="/" className="text-lg hover:underline">
                  About
                </Link>
              </li>
              <li>
                <Link href="/" className="text-lg hover:underline">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-lg hover:underline">
                  Login
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <a href="/cart" className="text-lg hover:underline">
                  Cart
                </a>
              </li>
              <li>
                <a href="/order" className="text-lg hover:underline">
                  Order
                </a>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="text-lg hover:underline"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
