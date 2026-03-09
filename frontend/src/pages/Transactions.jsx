import { useEffect, useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

export default function Transactions() {

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const fetchTransactions = async (currentPage = 0) => {

    try {

      setLoading(true);

      const res = await API.get(`/transactions?page=${currentPage}&size=5`);

      const data = res.data.data;

      setTransactions(data.content);
      setTotalPages(data.totalPages);
      setPage(data.number);

    } catch (err) {

      console.error(err);
      toast.error("Failed to fetch transactions");

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    fetchTransactions(0);
  }, []);

  const nextPage = () => {
    if (page + 1 < totalPages && !loading) {
      fetchTransactions(page + 1);
    }
  };

  const prevPage = () => {
    if (page > 0 && !loading) {
      fetchTransactions(page - 1);
    }
  };

  return (

    <div className="flex flex-col min-h-screen space-y-6">

      <div className="flex-1 space-y-6">

        {/* Header */}
        <div className="flex justify-between items-center">

          <h1 className="text-3xl font-semibold text-[#2F4858]">
            Transactions
          </h1>

          <span className="text-[#33658A] font-medium">
            Page {page + 1} / {totalPages}
          </span>

        </div>

        {/* Table Card */}
        <div className="bg-white rounded-xl shadow border overflow-hidden">

          {loading ? (

            <div className="text-center py-10 text-gray-500 animate-pulse">
              Loading transactions...
            </div>

          ) : (

            <table className="w-full text-left border-collapse">

              <thead className="bg-[#33658A] text-white">

                <tr>
                  <th className="p-4">ID</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Cashback</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Date</th>
                </tr>

              </thead>

              <tbody>

                {transactions.length === 0 ? (

                  <tr>
                    <td colSpan="5" className="p-6 text-center text-gray-500">
                      No transactions yet
                    </td>
                  </tr>

                ) : (

                  transactions.map((tx) => (

                    <tr
                      key={tx.id}
                      className="border-b hover:bg-[#f5f9fc] transition"
                    >

                      <td className="p-4 font-medium text-[#2F4858]">
                        #{tx.id}
                      </td>

                      <td className="p-4 font-semibold text-[#2F4858]">
                        ₹{tx.amount}
                      </td>

                      <td className="p-4 font-medium text-[#F26419]">
                        ₹{tx.cashback}
                      </td>

                      <td className="p-4">

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
                            tx.status === "SUCCESS"
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                        >
                          {tx.status}
                        </span>

                      </td>

                      <td className="p-4 text-gray-500">
                        {new Date(tx.createdAt).toLocaleString()}
                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          )}

          {/* Pagination */}
          <div className="flex justify-between items-center p-6">

            <button
              onClick={prevPage}
              disabled={page === 0 || loading}
              className="bg-[#86BBD8] text-[#2F4858] px-4 py-2 rounded hover:bg-[#33658A] hover:text-white transition disabled:opacity-50"
            >
              Previous
            </button>

            <span className="text-[#2F4858] font-medium">
              Page {page + 1} of {totalPages}
            </span>

            <button
              onClick={nextPage}
              disabled={page + 1 >= totalPages || loading}
              className="bg-[#86BBD8] text-[#2F4858] px-4 py-2 rounded hover:bg-[#33658A] hover:text-white transition disabled:opacity-50"
            >
              Next
            </button>

          </div>

        </div>

      </div>

      

    </div>

  );
}