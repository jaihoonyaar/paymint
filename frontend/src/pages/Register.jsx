import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import logo from "../assets/logo.png";

export default function Register() {

  const [name, setName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const register = async () => {

    try {

      await API.post("/auth/register", {
        name,
        businessName,
        email,
        password
      });

      toast.success("Account created successfully");

      navigate("/login");

    } catch (err) {

      console.error(err);

      toast.error(
        err.response?.data?.message || "Registration failed"
      );

    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">

      {/* FULLSCREEN ANIMATED GRADIENT */}
      <div className="gradient-bg fixed inset-0 -z-20"></div>

      {/* COLOR GLOWS */}
      <div className="absolute w-[600px] h-[600px] bg-[#F6AE2D]/25 blur-[140px] rounded-full top-[-120px] left-[-120px] -z-10"></div>

      <div className="absolute w-[500px] h-[500px] bg-[#F26419]/25 blur-[140px] rounded-full bottom-[-120px] right-[-120px] -z-10"></div>

      {/* REGISTER CARD */}
      <div className="relative bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md">

        {/* LOGO */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="PayMint" className="h-16 drop-shadow-md" />
        </div>

        {/* TITLE */}
        <h1 className="text-2xl font-semibold text-center text-[#2F4858] mb-8">
          Register Merchant
        </h1>

        <input
          placeholder="Name of the Owner"
          className="w-full p-3 rounded-lg border border-gray-300 mb-4 focus:outline-none focus:ring-2 focus:ring-[#86BBD8]"
          onChange={(e) => setName(e.target.value)}
        />
        {/* BUSINESS NAME */}
        <input
          placeholder="Business Name"
          className="w-full p-3 rounded-lg border border-gray-300 mb-4 focus:outline-none focus:ring-2 focus:ring-[#86BBD8]"
          onChange={(e) => setBusinessName(e.target.value)}
        />

        {/* EMAIL */}
        <input
          placeholder="Email"
          className="w-full p-3 rounded-lg border border-gray-300 mb-4 focus:outline-none focus:ring-2 focus:ring-[#86BBD8]"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded-lg border border-gray-300 mb-6 focus:outline-none focus:ring-2 focus:ring-[#86BBD8]"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* BUTTON */}
        <button
          onClick={register}
          className="w-full bg-[#F26419] hover:bg-[#F6AE2D] text-white p-3 rounded-lg font-medium transition duration-300 shadow-md hover:shadow-xl"
        >
          Register
        </button>
        <p className="text-center text-sm text-gray-500 mt-4">
  Already have an account? 
  <span
    onClick={() => navigate("/login")}
    className="text-[#F26419] cursor-pointer ml-1 hover:underline"
  >
    Login
  </span>
</p>

      </div>

      {/* FOOTER */}
      <div className="absolute bottom-5 text-center w-full text-white text-sm opacity-90">
        © 2026 PayMint • Built by Jai Prakash Rai
      </div>

    </div>
  );
}