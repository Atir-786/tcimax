import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-4xl font-bold text-red-500 mb-4">
          404 - Not Found
        </h2>
        <p className="text-gray-600 text-lg mb-6">
          Oops! The page you’re looking for doesn’t exist.
        </p>
        <Link
          href="/dashboard"
          className="px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
