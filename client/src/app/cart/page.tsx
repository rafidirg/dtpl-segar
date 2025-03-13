"use client";

import { useState } from "react";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";

interface CartItem {
  id: number;
  seller: string;
  name: string;
  variant: string;
  price: number;
  quantity: number;
  image: string;
}

const cartItems: CartItem[] = [
  {
    id: 1,
    seller: "Petani123",
    name: "Daging Sapi Rendang",
    variant: "250 gram",
    price: 39900,
    quantity: 1,
    image: "/beef.png",
  },
  {
    id: 2,
    seller: "Petani123",
    name: "Daging Sapi Rendang",
    variant: "250 gram",
    price: 39900,
    quantity: 1,
    image: "/beef.png",
  },
  {
    id: 3,
    seller: "Petani123",
    name: "Daging Sapi Rendang",
    variant: "250 gram",
    price: 39900,
    quantity: 1,
    image: "/beef.png",
  },
];

export default function Cart() {
  const [cart, setCart] = useState<CartItem[]>(cartItems);

  const updateQuantity = (id: number, change: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Keranjang Belanja</h1>
      <div className="bg-white shadow-md rounded-md p-4">
        <div className="grid grid-cols-5 font-semibold border-b pb-2">
          <div className="col-span-2">Produk</div>
          <div>Harga Satuan</div>
          <div>Kuantitas</div>
          <div>Total Harga</div>
        </div>
        {cart.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-5 items-center py-4 border-b"
          >
            <div className="col-span-2 flex items-center">
              <Image
                src={item.image}
                alt={item.name}
                width={50}
                height={50}
                className="mr-4"
              />
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">
                  {item.seller} | {item.variant}
                </p>
              </div>
            </div>
            <div>Rp{item.price.toLocaleString()}</div>
            <div className="flex items-center">
              <button
                onClick={() => updateQuantity(item.id, -1)}
                className="border px-2"
              >
                -
              </button>
              <span className="mx-2">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, 1)}
                className="border px-2"
              >
                +
              </button>
            </div>
            <div className="flex justify-between items-center">
              <span>Rp{(item.price * item.quantity).toLocaleString()}</span>
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500 ml-4"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
        <div className="flex justify-between items-center mt-4">
          <p className="font-semibold">Total ({cart.length} Produk):</p>
          <p className="text-green-500 font-bold text-lg">
            Rp{totalPrice.toLocaleString()}
          </p>
          <button className="bg-green-500 text-white px-6 py-2 rounded-md">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
