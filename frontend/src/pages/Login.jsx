import { useState } from "react";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import toast from "react-hot-toast";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      const token = res.data.data;

      login(token);

      toast.success("Logged In Successfully");

      setTimeout(() => {
        navigate("/dashboard");
      }, 100);

    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message || "Login failed"
      );
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">

      {/* FULLSCREEN ANIMATED GRADIENT BACKGROUND */}
      <div className="gradient-bg fixed inset-0 -z-20"></div>

      {/* SOFT COLOR GLOWS */}
      <div className="absolute w-[600px] h-[600px] bg-[#F6AE2D]/25 blur-[140px] rounded-full top-[-120px] left-[-120px] -z-10"></div>

      <div className="absolute w-[500px] h-[500px] bg-[#F26419]/25 blur-[140px] rounded-full bottom-[-120px] right-[-120px] -z-10"></div>

      {/* LOGIN CARD */}
      <div className="relative bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md">

        {/* LOGO */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="PayMint" className="h-16 drop-shadow-md" />
        </div>

        {/* TITLE */}
        <h2 className="text-2xl font-semibold text-center text-[#2F4858] mb-8">
          Welcome Back
        </h2>

        {/* EMAIL */}
        <div className="mb-6">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#86BBD8]"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* PASSWORD */}
        <div className="mb-8">
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#86BBD8]"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* LOGIN BUTTON */}
        <button
          onClick={handleLogin}
          className="w-full bg-[#F26419] hover:bg-[#F6AE2D] text-white p-3 rounded-lg font-medium transition duration-300 shadow-md hover:shadow-xl"
        >
          Login
        </button>
        <p className="text-center text-sm text-gray-500 mt-4">
  Don't have an account? 
  <span
    onClick={() => navigate("/register")}
    className="text-[#F26419] cursor-pointer ml-1 hover:underline"
  >
    Sign Up!
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