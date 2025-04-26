"use client";

import { useState, useEffect } from "react";
import { fetchOrder } from "@/data/loaders";
import { OrderProps } from "@/types";
import { useRouter } from "next/navigation";

const statusFilters = [
  "Pending",
  "Diproses",
  "Dalam Perjalanan",
  "Diterima",
  "Selesai",
];

export default function Orders() {
  const [orders, setOrders] = useState<OrderProps[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<OrderProps[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem("userEmail");
    if (!userId) {
      alert("You must be logged in to view your orders.");
      router.push("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        const orderData = await fetchOrder(userId, "/api/orders");
        setOrders(orderData.data);
        setFilteredOrders(orderData.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [router]);

  const handleStatusFilterChange = (status: string) => {
    setSelectedStatus(status);
    if (status === "All") {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(
        orders.filter((order) => order.status_order === status)
      );
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>

      {/* Status Filter */}
      <div className="bg-white shadow-md rounded-md p-4 mb-6">
        <h2 className="font-semibold mb-2">Filter by Status</h2>
        <div className="flex space-x-2">
          <button
            className={`px-4 py-2 rounded-md ${
              selectedStatus === "All"
                ? "bg-green-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => handleStatusFilterChange("All")}
          >
            All
          </button>
          {statusFilters.map((status) => (
            <button
              key={status}
              className={`px-4 py-2 rounded-md ${
                selectedStatus === status
                  ? "bg-green-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => handleStatusFilterChange(status)}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Order List */}
      <div className="bg-white shadow-md rounded-md p-4">
        <h2 className="font-semibold mb-2">Order List</h2>
        {filteredOrders.length === 0 ? (
          <p className="text-gray-500">No orders found.</p>
        ) : (
          filteredOrders.map((order, index) => (
            <div
              key={index}
              className="border-b pb-4 mb-4 last:border-b-0 last:pb-0"
            >
              <p className="font-semibold">Order #{index + 1}</p>
              <p className="text-sm text-gray-500">Address: {order.alamat}</p>
              <p className="text-sm text-gray-500">
                Status: <span className="font-bold">{order.status_order}</span>
              </p>
              <p className="text-sm text-gray-500">
                Latitude: {order.lat}, Longitude: {order.long}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
