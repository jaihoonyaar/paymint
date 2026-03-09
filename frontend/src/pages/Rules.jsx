import { useEffect, useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

export default function Rules() {

  const [type, setType] = useState("FLAT");
  const [percentage, setPercentage] = useState("");
  const [chance, setChance] = useState("");
  const [reward, setReward] = useState("");

  const [tiers, setTiers] = useState([
    { min: "", max: "", percent: "" }
  ]);

  const [rules, setRules] = useState([]);

  const fetchRules = async () => {
    try {
      const res = await API.get("/cashback/rules");
      setRules(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRules();
  }, []);

  const addTier = () => {
    setTiers([...tiers, { min: "", max: "", percent: "" }]);
  };

  const updateTier = (index, field, value) => {
    const updated = [...tiers];
    updated[index][field] = value;
    setTiers(updated);
  };

  const createRule = async () => {

    let config = {};

    if (type === "FLAT") {
      config = { percentage: Number(percentage) };
    }

    if (type === "LOTTERY") {
      config = {
        chance: Number(chance),
        reward: Number(reward)
      };
    }

    if (type === "TIERED") {
      config = {
        tiers: tiers.map(t => ({
          min: Number(t.min),
          max: Number(t.max),
          percent: Number(t.percent)
        }))
      };
    }

    try {

      await API.post("/cashback/rule", {
        type,
        ruleConfig: JSON.stringify(config)
      });

      toast.success("Rule created successfully");

      fetchRules();

      setPercentage("");
      setChance("");
      setReward("");
      setTiers([{ min: "", max: "", percent: "" }]);

    } catch (err) {
      console.error(err);
      toast.error("Failed to create rule");
    }
  };

  const toggleRule = async (id, active) => {

    try {

      await API.put(`/cashback/rule/${id}/toggle`);

      if (!active) {
        toast.success("Rule activated. Other rules disabled automatically.");
      } else {
        toast.success("Rule deactivated.");
      }

      fetchRules();

    } catch (err) {

      console.error(err);

      const message =
        err.response?.data?.message || "Failed to update rule";

      toast.error(message);

    }
  };

  return (

    <div className="flex flex-col min-h-screen space-y-8">

      <div className="flex-1 space-y-8">

        <h1 className="text-3xl font-semibold text-[#2F4858]">
          Create Cashback Rule
        </h1>

        {/* Rule Form */}
        <div className="bg-white p-6 rounded-xl shadow space-y-4 border">

          <div>

            <label className="block mb-1 text-sm font-medium text-[#2F4858]">
              Rule Type
            </label>

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="border p-2 rounded w-full focus:ring-2 focus:ring-[#86BBD8]"
            >
              <option value="FLAT">Flat Cashback</option>
              <option value="TIERED">Tiered Cashback</option>
              <option value="LOTTERY">Lottery Cashback</option>
            </select>

          </div>

          {type === "FLAT" && (
            <div>

              <label className="block mb-1 text-sm font-medium text-[#2F4858]">
                Cashback Percentage
              </label>

              <input
                type="number"
                placeholder="Enter % cashback"
                className="border p-2 rounded w-full focus:ring-2 focus:ring-[#86BBD8]"
                value={percentage}
                onChange={(e) => setPercentage(e.target.value)}
              />

            </div>
          )}

          {type === "LOTTERY" && (
            <>
              <input
                type="number"
                placeholder="Win Chance %"
                className="border p-2 rounded w-full focus:ring-2 focus:ring-[#86BBD8]"
                value={chance}
                onChange={(e) => setChance(e.target.value)}
              />

              <input
                type="number"
                placeholder="Reward Amount"
                className="border p-2 rounded w-full focus:ring-2 focus:ring-[#86BBD8]"
                value={reward}
                onChange={(e) => setReward(e.target.value)}
              />
            </>
          )}

          {type === "TIERED" && (
            <div className="space-y-3">

              <label className="block text-sm font-medium text-[#2F4858]">
                Tier Rules
              </label>

              {tiers.map((tier, index) => (
                <div key={index} className="flex gap-3">

                  <input
                    placeholder="Min"
                    value={tier.min}
                    onChange={(e) => updateTier(index, "min", e.target.value)}
                    className="border p-2 rounded w-full"
                  />

                  <input
                    placeholder="Max"
                    value={tier.max}
                    onChange={(e) => updateTier(index, "max", e.target.value)}
                    className="border p-2 rounded w-full"
                  />

                  <input
                    placeholder="%"
                    value={tier.percent}
                    onChange={(e) => updateTier(index, "percent", e.target.value)}
                    className="border p-2 rounded w-full"
                  />

                </div>
              ))}

              <button
                onClick={addTier}
                className="bg-[#86BBD8] text-[#2F4858] px-3 py-1 rounded hover:bg-[#33658A] hover:text-white transition"
              >
                + Add Tier
              </button>

            </div>
          )}

          <button
            onClick={createRule}
            className="bg-[#F26419] text-white px-4 py-2 rounded hover:bg-[#F6AE2D] transition"
          >
            Create Rule
          </button>

        </div>

        {/* Rules Table */}
        <div className="bg-white p-6 rounded-xl shadow border">

          <h2 className="text-xl font-semibold mb-4 text-[#2F4858]">
            Existing Rules
          </h2>

          <table className="w-full text-left border-collapse">

            <thead>
              <tr className="border-b bg-[#33658A] text-white">
                <th className="p-3">ID</th>
                <th className="p-3">Type</th>
                <th className="p-3">Config</th>
                <th className="p-3">Active</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody>

              {rules.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-gray-500">
                    No rules created yet
                  </td>
                </tr>
              ) : (
                rules.map((rule) => (
                  <tr key={rule.id} className="border-b hover:bg-gray-50">

                    <td className="p-3">{rule.id}</td>
                    <td className="p-3">{rule.type}</td>
                    <td className="p-3">{rule.ruleConfig}</td>

                    <td className="p-3">
                      {rule.active ? "✅ Active" : "❌ Disabled"}
                    </td>

                    <td className="p-3">

                      <button
                        onClick={() => toggleRule(rule.id, rule.active)}
                        className={`px-3 py-1 rounded text-white ${
                          rule.active
                            ? "bg-[#F26419] hover:bg-red-600"
                            : "bg-[#33658A] hover:bg-[#2F4858]"
                        }`}
                      >
                        {rule.active ? "Deactivate" : "Activate"}
                      </button>

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