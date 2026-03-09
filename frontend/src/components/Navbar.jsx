import { Link } from "react-router-dom";

export default function Navbar() {

  return (
    <div className="flex justify-between items-center px-10 py-5">

      {/* Logo */}
      <div className="flex items-center gap-2">

        <img
          src="/logo.png"
          alt="PayMint"
          className="w-10"
        />

        <h1 className="text-2xl font-bold text-[#2F4858]">
          Pay<span className="text-green-600">Mint</span>
        </h1>

      </div>

      {/* Menu */}
      <div className="flex items-center gap-6">

        <Link
          to="/login"
          className="text-[#2F4858] font-medium"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="bg-[#F26419] text-white px-5 py-2 rounded-lg"
        >
          Register
        </Link>

      </div>

    </div>
  );
}