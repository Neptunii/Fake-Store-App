"use client";
<Header />;
import { useState, useEffect } from "react";
import useFavorites from "../hooks/useFavorites";
import { FaRegStar, FaStar } from "react-icons/fa";
import Link from "next/link";
import Header from "../components/Header";

function ProductGrid({ products, favorites, toggleFavorite }) {
  console.log("test");
  return (
    <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <div key={product.id} className="relative group">
          <button
            type="button"
            aria-label="Favorite"
            className="absolute top-3 right-3 z-10 p-1 rounded-full bg-neutral-800/60 hover:bg-neutral-700/80 focus:outline-none transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              toggleFavorite(product.id);
            }}
          >
            {favorites[product.id] ? (
              <FaStar className="w-6 h-6 text-purple-400 favorite-star transition-colors" />
            ) : (
              <FaRegStar className="w-6 h-6 text-gray-400 hover:text-purple-400 favorite-star transition-colors" />
            )}
          </button>
          <Link href={`/product/${product.id}`} className="block h-full">
            <div className="border border-neutral-800 rounded-lg shadow-sm p-4 flex flex-col bg-neutral-900 hover:shadow-md transition h-full cursor-pointer transform transition-transform duration-200 group-hover:scale-105">
              <img
                src={product.image}
                alt={product.title}
                className="h-48 object-contain mb-4 mx-auto"
              />
              <h2 className="font-semibold text-lg mb-2 line-clamp-2 text-white">
                {product.title}
              </h2>
              <p className="text-gray-400 text-sm mb-2 capitalize">
                {product.category}
              </p>
              <p className="text-white text-base mb-2 line-clamp-3">
                {product.description}
              </p>
              <div className="mt-auto flex items-center justify-between">
                <span className="text-xl font-bold text-purple-400">
                  ${product.price}
                </span>
                <span className="text-xs text-gray-500">ID: {product.id}</span>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const [products, setProducts] = useState([]);
  const [favorites, toggleFavorite] = useFavorites();

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      setProducts(data);
    }
    fetchProducts();
  }, []);

  return (
    <>
      <Header />
      <main className="bg-black min-h-screen w-full p-8 pt-0">
        <div className="max-w-7xl mx-auto w-full">
          <ProductGrid
            products={products}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
        </div>
      </main>
    </>
  );
}
