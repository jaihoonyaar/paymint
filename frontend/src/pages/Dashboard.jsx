import { useEffect, useState } from "react";
import API from "../services/api";
import {
  Wallet,
  Receipt,
  CheckCircle,
  IndianRupee
} from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

import {
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import ChatBox from "../components/ChatBox";

export default function Dashboard() {

  const [summary, setSummary] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    fetchSummary();
    fetchChartData();
  }, []);

  const fetchSummary = async () => {
    try {
      const res = await API.get("/dashboard/summary");
      setSummary(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchChartData = async () => {

    try {

      const res = await API.get("/transactions?page=0&size=20");

      const tx = res.data.data.content;

      const lineData = tx.map(t => ({
        id: t.id,
        amount: t.amount,
        cashback: t.cashback
      }));

      setChartData(lineData);

      const totalAmount = tx.reduce((sum, t) => sum + t.amount, 0);
      const totalCashback = tx.reduce((sum, t) => sum + t.cashback, 0);

      setPieData([
        { name: "Payments", value: totalAmount },
        { name: "Cashback", value: totalCashback }
      ]);

    } catch (err) {

      console.error(err);

    }

  };

  const COLORS = ["#33658A", "#F26419"];

  if (!summary) {
    return <p>Loading dashboard...</p>;
  }

  return (
    <div className="min-h-screen flex flex-col">

      <div className="flex-1">

        <h1 className="text-3xl font-semibold mb-8 text-[#2F4858]">
          Dashboard Overview
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Wallet */}
          <div className="bg-gradient-to-r from-[#33658A] to-[#86BBD8] text-white p-6 rounded-xl shadow-lg hover:scale-105 transition">

            <div className="flex justify-between items-center">
              <p className="text-sm opacity-90">Wallet Balance</p>
              <Wallet size={28} />
            </div>

            <h2 className="text-3xl font-bold mt-4">
              ₹{summary.walletBalance}
            </h2>

          </div>

          {/* Transactions */}
          <div className="bg-white border border-gray-200 p-6 rounded-xl shadow hover:shadow-xl transition">

            <div className="flex justify-between items-center text-[#2F4858]">
              <p>Total Transactions</p>
              <Receipt size={26} />
            </div>

            <h2 className="text-3xl font-bold mt-4 text-[#33658A]">
              {summary.totalTransactions}
            </h2>

          </div>

          {/* Successful */}
          <div className="bg-gradient-to-r from-[#F6AE2D] to-[#F26419] text-white p-6 rounded-xl shadow-lg hover:scale-105 transition">

            <div className="flex justify-between items-center">
              <p>Successful Payments</p>
              <CheckCircle size={26} />
            </div>

            <h2 className="text-3xl font-bold mt-4">
              {summary.successfulPayments}
            </h2>

          </div>

          {/* Cashback */}
          <div className="bg-gradient-to-r from-[#2F4858] to-[#33658A] text-white p-6 rounded-xl shadow-lg hover:scale-105 transition">

            <div className="flex justify-between items-center">
              <p>Cashback Given</p>
              <IndianRupee size={26} />
            </div>

            <h2 className="text-3xl font-bold mt-4">
              ₹{summary.totalCashbackGiven}
            </h2>

          </div>

        </div>

        {/* Line Chart */}
        <div className="bg-white rounded-xl shadow p-6 mt-6">

          <h2 className="text-xl font-semibold mb-4 text-[#2F4858]">
            Recent Transactions
          </h2>

          <ResponsiveContainer width="100%" height={300}>

            <LineChart data={chartData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="id" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="amount"
                stroke="#33658A"
                strokeWidth={3}
                name="Amount"
              />

              <Line
                type="monotone"
                dataKey="cashback"
                stroke="#F26419"
                strokeWidth={3}
                name="Cashback"
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-xl shadow p-6 mt-6">

          <h2 className="text-xl font-semibold mb-4 text-[#2F4858]">
            Cashback Distribution
          </h2>

          <ResponsiveContainer width="100%" height={300}>

            <PieChart>

              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >

                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}

              </Pie>

              <Legend />

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

      <ChatBox />
    </div>
  );
}