import { useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";
import { IndianRupee, Wallet, Sparkles } from "lucide-react";

export default function Payments() {

  const [amount, setAmount] = useState("");
  const [result, setResult] = useState(null);
  const [processing, setProcessing] = useState(false);

  const processPayment = async () => {

    if (!amount || amount <= 0) {
      toast.error("Enter a valid payment amount");
      return;
    }

    try {

      setProcessing(true);

      const res = await API.post(
        "/payment/process",
        {
          amount: Number(amount)
        },
        {
          headers: {
            "Idempotency-Key": `payment-${Date.now()}`
          }
        }
      );

      setResult(res.data.data);

      toast.success("Payment processed successfully");

    } catch (err) {

      console.error(err);

      const message =
        err.response?.data?.message || "Payment failed";

      toast.error(message);

    } finally {

      setProcessing(false);

    }
  };

  return (

    <div className="flex flex-col min-h-screen space-y-8">

      <div className="flex-1 space-y-8">

        <h1 className="text-3xl font-semibold text-[#2F4858]">
          Simulate Customer Payment
        </h1>

        {/* Payment Card */}
        <div className="bg-white p-8 rounded-xl shadow border max-w-lg">

          <div className="flex items-center gap-2 mb-4 text-[#33658A] font-medium">
            <IndianRupee size={20} />
            Enter Payment Amount
          </div>

          <input
            type="number"
            placeholder="Enter payment amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border p-3 rounded-lg w-full mb-4 focus:ring-2 focus:ring-[#86BBD8]"
          />

          <button
            onClick={processPayment}
            disabled={processing}
            className="w-full bg-[#F26419] text-white px-4 py-3 rounded-lg hover:bg-[#F6AE2D] transition shadow-md disabled:opacity-50"
          >
            {processing ? "Processing Payment..." : "Process Payment"}
          </button>

        </div>

        {/* Payment Result */}
        {result && (

          <div className="bg-white border rounded-xl shadow p-6 max-w-2xl">

            <div className="flex items-center gap-2 mb-4 text-[#2F4858] font-semibold text-lg">
              <Sparkles size={18} />
              Payment Result
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              {/* Payment */}
              <div className="bg-gradient-to-r from-[#33658A] to-[#86BBD8] text-white p-4 rounded-lg">

                <p className="text-sm opacity-80">
                  Payment Amount
                </p>

                <h3 className="text-xl font-bold">
                  ₹{result.paymentAmount}
                </h3>

              </div>

              {/* Cashback */}
              <div className="bg-gradient-to-r from-[#F6AE2D] to-[#F26419] text-white p-4 rounded-lg">

                <p className="text-sm opacity-80">
                  Cashback Given
                </p>

                <h3 className="text-xl font-bold">
                  ₹{result.cashback}
                </h3>

              </div>

              {/* Wallet */}
              <div className="bg-gradient-to-r from-[#2F4858] to-[#33658A] text-white p-4 rounded-lg">

                <p className="text-sm opacity-80">
                  Wallet Balance
                </p>

                <h3 className="text-xl font-bold">
                  ₹{result.remainingBalance}
                </h3>

              </div>

            </div>

          </div>

        )}

      </div>

      

    </div>

  );
}