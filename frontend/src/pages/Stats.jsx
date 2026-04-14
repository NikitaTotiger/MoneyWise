import axios from "axios";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis, YAxis
} from "recharts";

function Stats() {
  const [expenses, setExpenses] = useState([]);
  const [chartType, setChartType] = useState("pie");
  const [filterType, setFilterType] = useState("monthly");

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/expenses", {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
        },
      });

      setExpenses(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // 🔥 Dynamic Data Based on Filter
  let data = [];

  if (filterType === "monthly") {
  const monthOrder = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec"
  ];

  // Step 1: initialize ALL months with 0
  const monthlyMap = {};
  for (let i = 0; i < 12; i++) {
    monthlyMap[i] = 0;
  }

  // Step 2: add actual expenses
  expenses.forEach((exp) => {
    const monthIndex = new Date(exp.date).getMonth();
    monthlyMap[monthIndex] += exp.amount;
  });

  // Step 3: convert to array (already ordered!)
  data = monthOrder.map((month, index) => ({
    name: month,
    value: monthlyMap[index],
  }));
}

  else if (filterType === "yearly") {
  const yearlyMap = {};

  expenses.forEach((exp) => {
    const year = new Date(exp.date).getFullYear();

    yearlyMap[year] = (yearlyMap[year] || 0) + exp.amount;
  });

  data = Object.keys(yearlyMap)
    .map((key) => ({
      name: key,
      value: yearlyMap[key],
    }))
    .sort((a, b) => b.name - a.name)   // ✅ sorted
}

  else {
    // Daily → category split
    const categoryMap = {};

    expenses.forEach((exp) => {
      categoryMap[exp.category] =
        (categoryMap[exp.category] || 0) + exp.amount;
    });

    data = Object.keys(categoryMap).map((key) => ({
      name: key,
      value: categoryMap[key],
    }));
  }

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#A855F7",
    "#EF4444",
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Statistics</h1>

      {/* 🔥 Controls */}
      <div className="flex gap-4 mb-6">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="daily">Daily (Category)</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>

        <select
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="pie">Pie Chart</option>
          <option value="bar">Bar Chart</option>
          <option value="line">Line Chart</option>
        </select>
      </div>

      {/* 🔥 Chart */}
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="w-full h-96">

          {/* PIE */}
          {chartType === "pie" && (
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={120}
                  label
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}

          {/* BAR */}
          {chartType === "bar" && (
            <ResponsiveContainer>
              <BarChart data={[...data]}>
                <XAxis dataKey="name" interval={0} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          )}

          {/* LINE */}
          {chartType === "line" && (
            <ResponsiveContainer>
              <LineChart data={[...data]}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#10b981"
                />
              </LineChart>
            </ResponsiveContainer>
          )}

        </div>
      </div>
    </div>
  );
}

export default Stats;