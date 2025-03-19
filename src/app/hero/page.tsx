// File: components/Hero.tsx

import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";

// Define the TypeScript interface for your data
interface HomeData {
  _id: string;
  title: string;
  slogn: string;
  description: string;
  imageUrl: string;
}

// Function to fetch data from Sanity
async function getData(): Promise<HomeData[]> {
  const fetchData = await client.fetch<HomeData[]>(`
    *[_type == "home"] {
      _id,
      slogn,
      title,
      description,
      "imageUrl": image.asset->url
    }
  `);
  return fetchData;
}

// The Hero component
const Hero: React.FC = async () => {
  const data = await getData();
  console.log("Fetched Home Data:", data);

  return (
    <>
      {data.map((val) => (
        <section key={val._id} className="relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-20 sm:py-24">
          <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
            {/* Text Content */}
            <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
              <h1 className="title-font sm:text-6xl text-3xl mb-4 py-11 font-medium text-gray-300">
                {val.title} <br/> {val.slogn}
              </h1>
              <p className="mb-8 leading-relaxed text-2xl">
                {val.description}
              </p>
              <div className="flex justify-center">
                <Link href="/products">
                  <button className="relative inline-flex text-black bg-gradient-to-r from-yellow-500 to-red-500 border-0 py-3 px-8 font-bold text-lg rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:from-red-500 hover:to-yellow-500 focus:outline-none 
                      animate-pulse">
                    Shop All Products
                    <span className="absolute inset-0 border-2 border-white rounded-lg animate-glow"></span>
                  </button>
                </Link>
              </div>
            </div>
            {/* Image */}
            <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
              <Image
                className="object-cover object-center rounded"
                alt="Hero Image"
                src={val.imageUrl}
                height={500}
                width={500}
                priority // Optional: to prioritize loading
              />
            </div>
          </div>
        </section>
      ))}
    </>
  );
};

export default Hero;
