"use client";

import { useCart } from "../context/CartContext";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const router = useRouter();

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleProceedToCheckout = () => {
    // Navigate to checkout
    router.push("/checkout");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center justify-between p-4 border rounded"
              >
                {/* Product info */}
                <div className="flex items-center mb-4 sm:mb-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={80}
                    height={80}
                    className="object-cover rounded mr-4"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">{item.title}</h2>
                    <p className="text-gray-600">ID: {item.Id}</p>
                    <p className="text-gray-700 font-bold">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Quantity controls + remove button */}
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border rounded">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, Math.max(1, item.quantity - 1))
                      }
                      className="px-2 py-1 bg-gray-200 text-black rounded-l disabled:bg-gray-100"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-3">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-1 bg-gray-200 text-black rounded-r"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* Total & Checkout */}
          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center">
            <h2 className="text-xl font-bold mb-2 sm:mb-0">
              Total: ${totalPrice.toFixed(2)}
            </h2>
            <button
              onClick={handleProceedToCheckout}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
