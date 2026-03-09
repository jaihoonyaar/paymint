import { useEffect, useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

export default function Wallet() {

  const [balance, setBalance] = useState(0);
  const [ledger, setLedger] = useState([]);
  const [topupAmount, setTopupAmount] = useState("");

  const fetchWallet = async () => {
    try {

      const res = await API.get("/wallet/balance");
      setBalance(res.data.data);

    } catch (err) {

      console.error(err);
      toast.error("Failed to load wallet");

    }
  };

  const topUpWallet = async () => {

    if (!topupAmount || topupAmount <= 0) {
      toast.error("Enter a valid amount");
      return;
    }

    try {

      await API.post("/wallet/credit", {
        amount: Number(topupAmount),
        description: "Manual wallet top-up"
      });

      toast.success("Wallet credited successfully");

      setTopupAmount("");

      fetchWallet();
      fetchLedger();

    } catch (err) {

      console.error(err);
      toast.error("Top-up failed");

    }

  };

  const fetchLedger = async () => {

    try {

      const res = await API.get("/wallet/ledger");
      setLedger(res.data.data);

    } catch (err) {

      console.error(err);
      toast.error("Failed to load ledger");

    }

  };

  useEffect(() => {
    fetchWallet();
    fetchLedger();
  }, []);

  return (

    <div className="flex flex-col min-h-screen space-y-6">

      <div className="flex-1 space-y-6">

        <h1 className="text-3xl font-semibold text-[#2F4858]">
          Wallet
        </h1>

        {/* Balance Card */}
        <div className="bg-gradient-to-r from-[#33658A] to-[#86BBD8] text-white shadow rounded-xl p-6">

          <h2 className="text-sm opacity-90">
            Current Balance
          </h2>

          <p className="text-4xl font-bold mt-2">
            ₹{balance}
          </p>

        </div>

        {/* Top-up */}
        <div className="bg-white shadow rounded-xl p-6 space-y-4 border max-w-md">

          <h2 className="text-lg font-semibold text-[#2F4858]">
            Top Up Wallet
          </h2>

          <input
            type="number"
            placeholder="Enter amount"
            value={topupAmount}
            onChange={(e) => setTopupAmount(e.target.value)}
            className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-[#86BBD8]"
          />

          <button
            onClick={topUpWallet}
            className="w-full bg-[#F26419] text-white px-4 py-3 rounded-lg hover:bg-[#F6AE2D] transition shadow-md"
          >
            Add Funds
          </button>

        </div>

        {/* Ledger Table */}
        <div className="bg-white rounded-xl shadow border overflow-hidden">

          <div className="p-6 border-b">

            <h2 className="text-xl font-semibold text-[#2F4858]">
              Recent Activity
            </h2>

          </div>

          <table className="w-full text-left border-collapse">

            <thead className="bg-[#33658A] text-white">

              <tr>
                <th className="p-4">Type</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Reference</th>
                <th className="p-4">Description</th>
                <th className="p-4">Date</th>
              </tr>

            </thead>

            <tbody>

              {ledger.length === 0 ? (

                <tr>
                  <td colSpan="5" className="p-6 text-center text-gray-500">
                    No ledger activity
                  </td>
                </tr>

              ) : (

                ledger.map((entry, index) => (

                  <tr
                    key={index}
                    className="border-b hover:bg-[#f5f9fc] transition"
                  >

                    <td className="p-4">

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
                          entry.type === "DEBIT"
                            ? "bg-[#F26419]"
                            : "bg-green-500"
                        }`}
                      >
                        {entry.type}
                      </span>

                    </td>

                    <td className="p-4 font-semibold text-[#2F4858]">
                      ₹{entry.amount}
                    </td>

                    <td className="p-4">
                      {entry.referenceType}
                    </td>

                    <td className="p-4">
                      {entry.description}
                    </td>

                    <td className="p-4 text-gray-500">
                      {new Date(entry.createdAt).toLocaleString()}
                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

     

    </div>
  );
}