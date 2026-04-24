import { NavLink, Outlet, useNavigate } from "react-router-dom";

function Layout() {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };
  const linkClass = ({ isActive }) =>
  isActive
    ? "block text-blue-400 font-semibold"
    : "block hover:text-blue-400";

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-slate-950 text-white p-6 border-r border-white/10">
  <h1 className="text-2xl font-bold mb-10 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
    MoneyWise
  </h1>

  <nav className="space-y-3">
  <NavLink
    to="/"
    end
    className={({ isActive }) =>
      `group block rounded-2xl px-4 py-3 transition-all duration-300 ${
        isActive
          ? "bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/30"
          : "text-white/90 hover:bg-white/10 hover:text-cyan-300 hover:shadow-md hover:shadow-cyan-500/10"
      }`
    }
  >
    <span className="flex items-center justify-between">
      Dashboard
      <span className="opacity-0 transition duration-300 group-hover:opacity-100">
        →
      </span>
    </span>
  </NavLink>

  <NavLink
    to="/monthly"
    className={({ isActive }) =>
      `group block rounded-2xl px-4 py-3 transition-all duration-300 ${
        isActive
          ? "bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/30"
          : "text-white/90 hover:bg-white/10 hover:text-cyan-300 hover:shadow-md hover:shadow-cyan-500/10"
      }`
    }
  >
    <span className="flex items-center justify-between">
      Monthly View
      <span className="opacity-0 transition duration-300 group-hover:opacity-100">
        →
      </span>
    </span>
  </NavLink>

  <NavLink
    to="/daily"
    className={({ isActive }) =>
      `group block rounded-2xl px-4 py-3 transition-all duration-300 ${
        isActive
          ? "bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/30"
          : "text-white/90 hover:bg-white/10 hover:text-cyan-300 hover:shadow-md hover:shadow-cyan-500/10"
      }`
    }
  >
    <span className="flex items-center justify-between">
      Daily View
      <span className="opacity-0 transition duration-300 group-hover:opacity-100">
        →
      </span>
    </span>
  </NavLink>

  <NavLink
    to="/filter"
    className={({ isActive }) =>
      `group block rounded-2xl px-4 py-3 transition-all duration-300 ${
        isActive
          ? "bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/30"
          : "text-white/90 hover:bg-white/10 hover:text-cyan-300 hover:shadow-md hover:shadow-cyan-500/10"
      }`
    }
  >
    <span className="flex items-center justify-between">
      Filter
      <span className="opacity-0 transition duration-300 group-hover:opacity-100">
        →
      </span>
    </span>
  </NavLink>

  <NavLink
    to="/stats"
    className={({ isActive }) =>
      `group block rounded-2xl px-4 py-3 transition-all duration-300 ${
        isActive
          ? "bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/30"
          : "text-white/90 hover:bg-white/10 hover:text-cyan-300 hover:shadow-md hover:shadow-cyan-500/10"
      }`
    }
  >
    <span className="flex items-center justify-between">
      Statistics
      <span className="opacity-0 transition duration-300 group-hover:opacity-100">
        →
      </span>
    </span>
  </NavLink>
</nav>

  <button
    onClick={logoutHandler}
    className="mt-10 w-full rounded-xl bg-red-500/90 px-4 py-2 hover:bg-red-600 transition"
  >
    Logout
  </button>
</div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;