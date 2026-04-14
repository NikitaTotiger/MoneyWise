import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";
import DailyView from "./pages/DailyView";
import Dashboard from "./pages/Dashboard";
import Filter from "./pages/Filter";
import Login from "./pages/Login";
import MonthlyView from "./pages/MonthlyView";
import Register from "./pages/Register";
import Stats from "./pages/Stats";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* App Layout (Sidebar) */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="monthly" element={<MonthlyView />} />
          <Route path="daily" element={<DailyView />} />
          <Route path="filter" element={<Filter />} />
          <Route path="stats" element={<Stats />} />
        </Route>
        

      </Routes>
    </BrowserRouter>
  );
}

export default App;