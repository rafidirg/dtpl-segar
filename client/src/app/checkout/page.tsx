"use client";

import { useState } from "react";
import Image from "next/image";
import { FaMapMarkerAlt, FaCheckCircle } from "react-icons/fa";

interface CartItem {
  id: number;
  seller: string;
  name: string;
  variant: string;
  price: number;
  quantity: number;
  image: string;
  coldStorageName: string;
  coldStorageCost: number;
  shippingCost: number;
  estimatedDelivery: string;
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
    coldStorageName: "Penyimpanan Dingin ❄️",
    coldStorageCost: 5000,
    shippingCost: 12000,
    estimatedDelivery: "13 - 16 April 2025",
  },
];

const paymentMethods = [
  { id: 1, name: "BCA Virtual Account", logo: "/bca.png" },
  { id: 2, name: "BRI Virtual Account", logo: "/bri.png" },
  { id: 3, name: "GoPay", logo: "/gopay.png" },
];

export default function Checkout() {
  const [selectedPayment, setSelectedPayment] = useState<number>(1);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity + item.coldStorageCost + item.shippingCost,
    0
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <div className="bg-white shadow-md rounded-md p-4 mb-6">
        <h2 className="font-semibold mb-2">Alamat Pengiriman</h2>
        <div className="flex items-center text-gray-700">
          <FaMapMarkerAlt className="text-red-500 mr-2" />
          <p>
            <strong>Rumah - Danny (08123456789)</strong>
            <br /> XYZ Residence No. 1, Jalan Kelud, Kel. Beji, Kec. Beji, Kota
            Depok, Jawa Barat, 16421
          </p>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-md p-4 mb-6">
        <h2 className="font-semibold mb-2">Produk</h2>
        {cartItems.map((item) => (
          <div key={item.id} className="border-b pb-4 mb-4">
            <p className="font-semibold">{item.seller} • PreOrder 30 hari</p>
            <div className="flex items-center mt-2">
              <Image
                src={item.image}
                alt={item.name}
                width={80}
                height={80}
                className="mr-4"
              />
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">{item.variant}</p>
                <p className="text-green-500 font-semibold">
                  Rp{item.price.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500 italic">
                  Estimasi tiba {item.estimatedDelivery}
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <input type="checkbox" 
                  className="w-5 h-5 text-green-500"
                />
                <p className="font-medium">{item.coldStorageName}</p>
              </div>
              <p className="text-green-500 font-semibold">
                Rp{item.coldStorageCost.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>


      <div className="bg-white shadow-md rounded-md p-4 mb-6">
        <h2 className="font-semibold mb-2">Metode Pembayaran</h2>
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className={`flex items-center justify-between border p-2 rounded-md mb-2 cursor-pointer ${
              selectedPayment === method.id ? "border-green-500" : ""
            }`}
            onClick={() => setSelectedPayment(method.id)}
          >
            <div className="flex items-center">
              <Image
                src={method.logo}
                alt={method.name}
                width={40}
                height={40}
                className="mr-2"
              />
              <p>{method.name}</p>
            </div>
            {selectedPayment === method.id && (
              <FaCheckCircle className="text-green-500" />
            )}
          </div>
        ))}
      </div>

      <div className="bg-white shadow-md rounded-md p-4">
        <h2 className="font-semibold mb-2">Rincian Transaksi</h2>
        <div className="flex justify-between">
          <p>Total Harga</p>
          <p>Rp{cartItems[0].price.toLocaleString()}</p>
        </div>
        <div className="flex justify-between">
          <p>Biaya Penyimpanan Dingin</p>
          <p>Rp{cartItems[0].coldStorageCost.toLocaleString()}</p>
        </div>
        <div className="flex justify-between">
          <p>Total Ongkos Kirim</p>
          <p>Rp{cartItems[0].shippingCost.toLocaleString()}</p>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between font-bold text-lg">
          <p>Total Tagihan</p>
          <p>Rp{totalPrice.toLocaleString()}</p>
        </div>
        <button className="w-full bg-green-500 text-white py-2 mt-4 rounded-md flex justify-center items-center text-lg">
          <FaCheckCircle className="mr-2" /> Proses Pembayaran
        </button>
      </div>
    </div>
  );
}
