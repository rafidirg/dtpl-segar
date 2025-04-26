"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FaShoppingCart, FaTrash } from "react-icons/fa";
import { CartProps } from "@/types";
import { fetchCart, removeFromCart, updateCart } from "@/data/loaders";
import { getStrapiMedia } from "@/utils/get-strapi-url";
import { useRouter } from "next/navigation";

export default function Cart() {
  const [cart, setCart] = useState<CartProps[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem("userEmail");
    if (!userId) {
      if (
        window.confirm(
          "You must be logged in to show carts. Would you like to login now?"
        )
      ) {
        window.location.href = "/login";
      }
      return;
    }

    const fetchCartData = async () => {
      try {
        const cartData = await fetchCart(userId, "/api/carts");
        setCart(cartData.data);
      } catch (error) {
        console.error("Error fetching cart data:", error);
        setCart([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCartData();
  }, []);

  const updateQuantity = async (cartId: string, change: number) => {
    try {
      const item = cart.find((item) => item.documentId === cartId);
      const newQuantity = Math.max(1, item!.quantity + change);
      await updateCart(cartId, newQuantity, "/api/carts");
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.documentId === cartId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.error("Failed to update cart item:", error);
    }
  };
  const removeItem = async (cartId: string) => {
    try {
      await removeFromCart(cartId, "/api/carts");
      setCart((prevCart) =>
        prevCart.filter((item) => item.documentId !== cartId)
      );
    } catch (error) {
      console.error("Failed to remove cart item:", error);
    }
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

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
              {item.product.image && item.product.image.length > 0 ? (
                <Image
                  src={getStrapiMedia(item.product.image[0].url) ?? ""}
                  alt={item.product.name}
                  width={50}
                  height={50}
                  className="mr-4"
                />
              ) : (
                <FaShoppingCart className="text-gray-500 text-2xl mr-4" />
              )}
              <div>
                <p className="font-medium">{item.product.name}</p>
              </div>
            </div>
            <div>Rp{item.product.price.toLocaleString()}</div>
            <div className="flex items-center">
              <button
                onClick={() => updateQuantity(item.documentId, -1)}
                className="border px-2"
              >
                -
              </button>
              <span className="mx-2">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.documentId, 1)}
                className="border px-2"
              >
                +
              </button>
            </div>
            <div className="flex justify-between items-center">
              <span>
                Rp{(item.product.price * item.quantity).toLocaleString()}
              </span>
              <button
                onClick={() => removeItem(item.documentId)}
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
          <button
            className="bg-green-500 text-white px-6 py-2 rounded-md"
            onClick={() => router.push("/checkout")}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
