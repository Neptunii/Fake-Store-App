import { useState, useEffect, useCallback } from "react";

export default function useFavorites() {
  const [favorites, setFavorites] = useState({});
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const fav =
      typeof window !== "undefined" ? localStorage.getItem("favorites") : null;
    if (fav) {
      const parsed = JSON.parse(fav);
      const cleaned = {};
      for (const key in parsed) {
        if (parsed[key]) cleaned[key] = true;
      }
      setFavorites(cleaned);
      if (JSON.stringify(parsed) !== JSON.stringify(cleaned)) {
        localStorage.setItem("favorites", JSON.stringify(cleaned));
      }
    }
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initialized && typeof window !== "undefined") {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }, [favorites, initialized]);

  useEffect(() => {
    function handleStorage(e) {
      if (e.key === "favorites") {
        setFavorites(e.newValue ? JSON.parse(e.newValue) : {});
      }
    }
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const toggleFavorite = useCallback((id) => {
    setFavorites((prev) => {
      const updated = { ...prev };
      if (updated[id]) {
        delete updated[id];
      } else {
        updated[id] = true;
      }
      return updated;
    });
  }, []);

  return [favorites, toggleFavorite];
}
