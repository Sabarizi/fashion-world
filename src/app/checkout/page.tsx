"use client";

import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";

export default function Checkout() {
  const { cart } = useCart();
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    postalCode: "",
    country: "",
    phone: "",
    email: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false });
  };

  const handleProceedToPayment = async () => {
    const newErrors: { [key: string]: boolean } = {};
    let hasError = false;

    for (const key in formData) {
      if (!formData[key as keyof typeof formData].trim()) {
        newErrors[key] = true;
        hasError = true;
      }
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    console.log("✅ Cart Before Saving:", cart.map((item) => item.title));

    const checkoutData = {
      ...formData,
      products: cart,
    };

    setLoading(true);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData, cart }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Order placed! A confirmation email has been sent.");
        localStorage.setItem("checkoutData", JSON.stringify(checkoutData));

        // ✅ FIX: If `/payment` page doesn't exist, redirect to `/order-success`
        router.push("/order-success"); // Change this to `/payment` if you have that page
      } else {
        alert(`Failed to process the order: ${result.message}`);
      }
    } catch (error) {
      console.error("Error sending order details:", error);
      alert("Error processing the order. Please check your internet connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 grid grid-cols-2 gap-6">
      {/* Left Side: Order Summary */}
      <div className="border p-4 rounded">
        <h2 className="text-2xl font-semibold mb-4">Your Order</h2>
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between mb-2">
            <p>{item.title} {item.Id} (Quantity={item.quantity})</p>
            <p>${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
        <hr className="my-2" />
        <h3 className="text-lg font-semibold">
          Total: $
          {cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
        </h3>
      </div>

      {/* Right Side: User Details Form */}
      <div className="border p-4 rounded">
        <h2 className="text-2xl font-semibold mb-4">Billing Details</h2>
        <form className="space-y-3">
          {Object.keys(formData).map((field) => (
            <input
              key={field}
              type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, " $1")}
              required
              onChange={handleChange}
              className={`border p-2 w-full ${errors[field] ? "border-red-500" : ""}`}
            />
          ))}
          <button
            type="button"
            onClick={handleProceedToPayment}
            className="bg-blue-600 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? "Processing..." : "Proceed to Payment"}
          </button>
        </form>
      </div>
    </div>
  );
}
