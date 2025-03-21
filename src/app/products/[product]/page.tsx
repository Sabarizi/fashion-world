// src/app/products/[product]/page.tsx
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import React from "react";
import AddToCartButton from "@/app/compunents/AddToCartButton"; // Adjust the import path accordingly
import Link from "next/link"; // Import Link for navigation
import { ToastContainer } from "react-toastify"; // For toast notifications
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

interface Product {
   Id:number;
  _id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
}

async function getProduct(productId: string): Promise<Product | null> {
  const product = await client.fetch(
    `*[_type == "products" && _id == $productId][0] {
      Id,
      title,
      description,
      price,
      "imageUrl": image.asset->url
    }`,
    { productId }
  );
  return product;
}

export default async function ProductPage({
  params,
}: {
  params: { product: string };
}) {
  const product = await getProduct(params.product);

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Product not found!
        </h1>
      </div>
    );
  }

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md flex flex-col md:flex-row overflow-hidden dark:bg-gray-800">
        {/* Left Side: Product Image */}
        <div className="md:w-1/2">
          <Image
            src={product.imageUrl}
            alt={product.title}
            width={800}
            height={800}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Right Side: Product Details */}
        <div className="p-8 md:w-1/2">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {product.Id}
          </h1>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {product.title}
          </h1>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            {product.description}
          </p>
          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            ${product.price}
          </div>

          {/* Size Selection */}
          <label
            htmlFor="size"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Select Size:
          </label>
          <select
            id="size"
            name="size"
            className="w-full p-2 border border-gray-300 rounded-lg mb-6 dark:bg-gray-700 dark:text-white"
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
            <option value="xlarge">X-Large</option>
          </select>

          {/* Add to Cart Button */}
          <AddToCartButton
            product={{
              Id:product.Id,
              id: product._id,
              title: product.title,
              price: product.price,
              image: product.imageUrl,
              
            }}
          />

          {/* View Cart Button */}
          <Link href="/Cart">
            <button className="mt-4 w-full px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600">
              View Cart
            </button>
          </Link>
        </div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
}

export async function generateStaticParams() {
  const products = await client.fetch(`*[_type == "products"]{_id}`);
  return products.map((product: any) => ({ product: product._id }));
}
