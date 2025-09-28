import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full flex items-center justify-between px-8 py-4 bg-gradient-to-r from-purple-700 to-blue-950 border-b border-black mb-8">
      <Link
        href="/"
        className="text-2xl font-bold text-white hover:underline focus:outline-none"
        style={{ textDecoration: "none" }}
      >
        Fake Store App
      </Link>
      <Link
        href="/favorites"
        className="px-4 py-2 rounded bg-purple-600 text-white font-semibold hover:bg-purple-700 transition"
      >
        See Favorites
      </Link>
    </header>
  );
}
