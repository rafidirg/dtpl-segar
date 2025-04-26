"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FaMapMarkerAlt, FaCheckCircle } from "react-icons/fa";
import { fetchCart, removeFromCart, addOrder } from "@/data/loaders";
import { CartProps } from "@/types";
import { getStrapiMedia } from "@/utils/get-strapi-url";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useRouter } from "next/navigation";
import { getGoogleMapsApiKey } from "@/utils/get-google-maps-api-key";

const paymentMethods = [
  { id: 1, name: "BCA Transfer", logo: "/bca.png" },
  { id: 2, name: "BRI Transfer", logo: "/bri.png" },
];

export default function Checkout() {
  const [cartItems, setCartItems] = useState<CartProps[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState<string>(
    "Jl. Kenari 2 No.4, RW.5, Kenari, Kec. Senen, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10430"
  );
  const [mapCenter, ] = useState({
    lat: -6.1942008,
    lng: 106.8482101,
  });
  const [markerPosition, setMarkerPosition] = useState(mapCenter);
  const [coldStorageSelections, setColdStorageSelections] = useState<{
    [key: string]: boolean;
  }>({});
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const router = useRouter();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: getGoogleMapsApiKey(),
  });

  useEffect(() => {
    const userId = localStorage.getItem("userEmail");
    if (!userId) {
      if (
        window.confirm(
          "You must be logged in to proceed with checkout. Would you like to login now?"
        )
      ) {
        window.location.href = "/login";
      }
      return;
    }

    const fetchCartData = async () => {
      try {
        const cartData = await fetchCart(userId, "/api/carts");
        setCartItems(cartData.data);

        // Initialize cold storage selections
        const initialSelections = cartData.data.reduce(
          (acc: any, item: CartProps) => {
            if (item.product.cold_storage) {
              acc[item.id] = false; // Default to unchecked
            }
            return acc;
          },
          {}
        );
        setColdStorageSelections(initialSelections);
      } catch (error) {
        console.error("Error fetching cart data:", error);
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCartData();
  }, []);

  const handleMapClick = async (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      setMarkerPosition({ lat, lng });

      // Reverse geocoding to get the address
      const geocoder = new google.maps.Geocoder();
      const response = await geocoder.geocode({ location: { lat, lng } });
      if (response.results[0]) {
        setSelectedAddress(response.results[0].formatted_address);
      }
    }
  };

  const handleCreateOrder = async () => {
    const userId = localStorage.getItem("userEmail");
    if (!userId) {
      alert("User not logged in!");
      return;
    }

    try {
      // Delete all cart items for the user
      for (const item of cartItems) {
        await removeFromCart(item.documentId, "/api/carts");
      }

      // Create a new order
      await addOrder(
        userId,
        selectedAddress,
        markerPosition.lat,
        markerPosition.lng,
        "Pending",
        "/api/orders"
      );

      alert("Order created successfully!");
      setShowPaymentModal(false);
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Failed to create order. Please try again.");
    }
    router.push("/order");
  };

  const totalPrice = cartItems.reduce((total, item) => {
    const coldStorageFee =
      item.product.cold_storage && coldStorageSelections[item.id] ? 5000 : 0;
    return total + item.product.price * item.quantity + coldStorageFee;
  }, 0);

  if (loading || !isLoaded) {
    return <div className="text-center">Loading...</div>;
  }

  const handleColdStorageChange = (cartId: number) => {
    setColdStorageSelections((prev) => ({
      ...prev,
      [cartId]: !prev[cartId],
    }));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <div className="bg-white shadow-md rounded-md p-4 mb-6">
        <h2 className="font-semibold mb-2">Alamat Pengiriman</h2>
        <div className="flex items-center text-gray-700 mb-4">
          <FaMapMarkerAlt className="text-red-500 mr-2" />
          <p>{selectedAddress}</p>
        </div>
        <div className="h-64 w-full">
          <GoogleMap
            center={mapCenter}
            zoom={15}
            mapContainerStyle={{ width: "100%", height: "100%" }}
            onClick={handleMapClick}
          >
            <Marker position={markerPosition} />
          </GoogleMap>
        </div>
      </div>

      {/* Cart Items */}
      <div className="bg-white shadow-md rounded-md p-4 mb-6">
        <h2 className="font-semibold mb-2">Produk</h2>
        {cartItems.map((item) => (
          <div key={item.id} className="border-b pb-4 mb-4">
            <p className="font-semibold">
              {item.product.name} • {item.product.isPreOrder ? "PreOrder" : ""}
            </p>
            <div className="flex items-center mt-2">
              {item.product.image && item.product.image.length > 0 ? (
                <Image
                  src={getStrapiMedia(item.product.image[0].url) ?? ""}
                  alt={item.product.name}
                  width={80}
                  height={80}
                  className="mr-4"
                />
              ) : (
                <div className="w-20 h-20 bg-gray-200 mr-4"></div>
              )}
              <div>
                <p className="font-medium">{item.product.name}</p>
                <p className="text-sm text-gray-500">
                  Kuantitas: {item.quantity}
                </p>
                <p className="text-green-500 font-semibold">
                  Rp{item.product.price.toLocaleString()}
                </p>
                {item.product.cold_storage && (
                  <div className="mt-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={coldStorageSelections[item.id] || false}
                        onChange={() => handleColdStorageChange(item.id)}
                        className="mr-2"
                      />
                      <span>Penyimpanan Dingin ❄️ (Disarankan) - Rp5.000</span>
                    </label>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Payment Methods */}
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
          <p>Rp{totalPrice.toLocaleString()}</p>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between font-bold text-lg">
          <p>Total Tagihan</p>
          <p>Rp{totalPrice.toLocaleString()}</p>
        </div>
        <button
          className="w-full bg-green-500 text-white py-2 mt-4 rounded-md flex justify-center items-center text-lg"
          onClick={() => setShowPaymentModal(true)}
        >
          <FaCheckCircle className="mr-2" /> Proses Pembayaran
        </button>
      </div>

      {showPaymentModal && (
        <div
          className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
          onClick={() => setShowPaymentModal(false)} // Close modal when clicking outside
        >
          <div
            className="bg-white rounded-md p-6 w-96 relative"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPaymentModal(false)}
            >
              ✕
            </button>

            <h2 className="text-lg font-bold mb-4">BRI Virtual Account</h2>
            <p className="text-sm text-gray-500 mb-2">
              Batas Akhir Pembayaran: Kamis, 13 Maret 2025 13:42 WIB
            </p>
            <div className="flex justify-between items-center bg-gray-100 p-2 rounded-md mb-4">
              <p className="font-semibold">5011508123456789</p>
              <button
                className="text-blue-500 font-semibold"
                onClick={() =>
                  navigator.clipboard.writeText("5011508123456789")
                }
              >
                Salin
              </button>
            </div>
            <div className="flex justify-between items-center">
              <p>Total Tagihan</p>
              <p className="font-bold">Rp{totalPrice.toLocaleString()}</p>
            </div>
            <div className="flex justify-between mt-4">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md"
                onClick={handleCreateOrder}
              >
                Buat Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
