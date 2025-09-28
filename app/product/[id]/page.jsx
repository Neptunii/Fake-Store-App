"use client";
import React from "react";
import Link from "next/link";
import { FaRegStar, FaStar } from "react-icons/fa";
import Header from "../../../components/Header";

import { useState, useEffect } from "react";
import useFavorites from "../../../hooks/useFavorites";

export default function ProductPage({ params }) {
  const unwrappedParams = React.use(params);
  const [product, setProduct] = useState(null);
  const [favorites, toggleFavorite] = useFavorites();

  useEffect(() => {
    async function fetchProduct() {
      const res = await fetch(
        `https://fakestoreapi.com/products/${unwrappedParams.id}`
      );
      const data = await res.json();
      setProduct(data);
    }
    fetchProduct();
  }, [unwrappedParams.id]);

  if (!product) {
    return (
      <>
        <Header />
        <main className="bg-black min-h-screen w-full flex items-center justify-center">
          <span className="text-gray-500">Loading...</span>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="bg-black min-h-screen w-full p-8 flex flex-col items-center">
        <div className="max-w-2xl w-full border border-neutral-800 rounded-lg shadow-sm p-8 bg-neutral-900 relative">
          {/* Favorite Star Button */}
          <button
            type="button"
            aria-label="Favorite"
            className="absolute top-3 right-3 z-10 p-1 rounded-full bg-neutral-800/60 hover:bg-neutral-700/80 focus:outline-none transition-colors"
            onClick={() => toggleFavorite(product.id)}
          >
            {favorites[product.id] ? (
              <FaStar className="w-6 h-6 text-purple-400 transition-colors" />
            ) : (
              <FaRegStar className="w-6 h-6 text-gray-400 hover:text-purple-400 transition-colors" />
            )}
          </button>
          <img
            src={product.image}
            alt={product.title}
            className="h-96 object-contain mb-6 mx-auto"
          />
          <h1 className="text-2xl font-bold mb-2 text-white">
            {product.title}
          </h1>
          <p className="text-gray-400 text-base mb-2 capitalize">
            {product.category}
          </p>
          <p className="text-white text-lg mb-4">{product.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-purple-400">
              ${product.price}
            </span>
            <span className="text-xs text-gray-500">ID: {product.id}</span>
          </div>
        </div>
      </main>
    </>
  );
}
