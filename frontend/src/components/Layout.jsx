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
      <div className="w-64 bg-gray-900 text-white p-6">
        <h1 className="text-2xl font-bold mb-8">MoneyWise</h1>

        <nav className="space-y-4">
  <NavLink to="/" end className={({ isActive }) =>
    isActive
      ? "block text-blue-400 font-semibold"
      : "block hover:text-blue-400"
  }>
    Dashboard
  </NavLink>

  <NavLink to="/monthly" className={({ isActive }) =>
    isActive
      ? "block text-blue-400 font-semibold"
      : "block hover:text-blue-400"
  }>
    Monthly View
  </NavLink>

  <NavLink to="/daily" className={({ isActive }) =>
    isActive
      ? "block text-blue-400 font-semibold"
      : "block hover:text-blue-400"
  }>
    Daily View
  </NavLink>

  <NavLink to="/filter" className={({ isActive }) =>
    isActive
      ? "block text-blue-400 font-semibold"
      : "block hover:text-blue-400"
  }>
    Filter
  </NavLink>

  <NavLink to="/stats" className={({ isActive }) =>
    isActive
      ? "block text-blue-400 font-semibold"
      : "block hover:text-blue-400"
  }>
    Statistics
  </NavLink>
</nav>

        <button
          onClick={logoutHandler}
          className="mt-10 bg-red-500 px-4 py-2 rounded w-full"
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