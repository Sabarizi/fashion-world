// app/products/page.tsx

// Disable static generation and caching, ensuring fresh data on each request
export const revalidate = 0; 
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import { client } from "@/sanity/lib/client";
import ProductCard from "@/app/compunents/ProductCard";

// Define your Product interface
interface Product {
  Id: number;
  _id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
}

// Fetch data from Sanity
async function getData(): Promise<Product[]> {
  const fetchData = await client.fetch(
    `*[_type == "products"] {
      Id,
      _id,
      title,
      description,
      price,
      "imageUrl": image.asset->url
    }`
  );
  console.log("Fetched Products:", fetchData);
  return fetchData;
}

// Export the page component
export default async function ProductsPage() {
  const data: Product[] = await getData();

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900">Our Products</h1>
        <p className="text-gray-800">
          Explore our latest collection of products!
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
