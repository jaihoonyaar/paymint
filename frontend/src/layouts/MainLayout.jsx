import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  LayoutDashboard,
  Settings,
  CreditCard,
  Receipt,
  Wallet,
  LogOut
} from "lucide-react";
import logo from "../assets/logo.png";

export default function MainLayout() {

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
  logout();
  navigate("/", { replace: true });
};

  const linkStyle = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2 rounded-md transition ${
      isActive
        ? "bg-[#33658A] text-white"
        : "text-gray-300 hover:bg-[#33658A]/30"
    }`;

  return (
    <div className="flex h-screen bg-slate-100">

      {/* Sidebar */}
      <div className="w-64 bg-[#2F4858] text-white p-5 flex flex-col">

        <h1 className="text-xl font-semibold mb-8">
          Cashback Admin
        </h1>

        <nav className="flex flex-col gap-2">

          <NavLink to="/dashboard" className={linkStyle}>
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>

          <NavLink to="/rules" className={linkStyle}>
            <Settings size={18} />
            Rules
          </NavLink>

          <NavLink to="/payments" className={linkStyle}>
            <CreditCard size={18} />
            Payments
          </NavLink>

          <NavLink to="/transactions" className={linkStyle}>
            <Receipt size={18} />
            Transactions
          </NavLink>

          <NavLink to="/wallet" className={linkStyle}>
            <Wallet size={18} />
            Wallet
          </NavLink>

        </nav>

      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Navbar */}
        <div className="bg-white shadow px-6 py-4 flex items-center justify-between">

          {/* Spacer */}
          <div className="w-24"></div>

          {/* Center Logo */}
          <img
            src={logo}
            alt="PayMint"
            className="h-10"
          />

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-[#F26419] text-white px-4 py-2 rounded-md hover:bg-[#F6AE2D] transition"
          >
            <LogOut size={16} />
            Logout
          </button>

        </div>

        {/* Page Content */}
        <div className="p-6 overflow-auto flex-1">
          <Outlet />
        </div>

        {/* Footer */}
        <div className="text-center py-3 text-sm text-gray-500 bg-white border-t">
          © 2026 PayMint • Built by Jai Prakash Rai
        </div>

      </div>
    </div>
  );
}