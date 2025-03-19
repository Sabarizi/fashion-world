"use client";

import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface AddToCartButtonProps {
  product: {
    id: string;
    title: string;
    price: number;
    image: string;
  };
  quantity?: number;
  onAdd?: () => void;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  product,
  quantity = 1,
  onAdd,
}) => {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity,
    });

    toast.success(`${product.title} added to cart!`);
    setIsAdded(true);
    setShowPopup(true);

    if (onAdd) onAdd();

    // Reset the added state after 2 seconds
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <>
      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white rounded-full transition-all duration-300
          bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        aria-label={`Add ${product.title} to cart`}
      >
        🛒 Add to Cart
      </button>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
            <img
              src={product.image}
              alt={product.title}
              className="w-32 h-32 mx-auto rounded-md"
            />
            <h3 className="text-lg font-semibold mt-3">{product.title}</h3>
            <p className="text-gray-600">${product.price.toFixed(2)}</p>

            {/* Buttons */}
            <div className="mt-4 space-y-2">
              <button
                onClick={() => router.push("/Cart")}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                View Cart 🛒
              </button>
              <button
                onClick={() => setShowPopup(false)}
                className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
              >
                Continue Shopping 🛍️
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddToCartButton;
