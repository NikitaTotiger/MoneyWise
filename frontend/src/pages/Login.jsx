import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      localStorage.setItem("userInfo", JSON.stringify(res.data));
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950">
      {/* Background glow */}
      <div className="absolute inset-0">
        <div className="absolute left-[-80px] top-[-80px] h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute right-[-80px] top-[120px] h-80 w-80 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute bottom-[-100px] left-[25%] h-96 w-96 rounded-full bg-fuchsia-500/15 blur-3xl" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:36px_36px]" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10">
        <div className="grid w-full max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl md:grid-cols-2">
          {/* Left side */}
          <div className="hidden flex-col justify-between bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-transparent p-10 text-white md:flex">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Smart Finance Dashboard
              </div>

              <h1 className="text-5xl font-black leading-tight">
                Welcome back to
                <span className="block bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
                  MoneyWise
                </span>
              </h1>

              <p className="mt-5 max-w-md text-base text-slate-200/90">
                Track spending, monitor trends, and get AI-style insights with a
                finance dashboard that actually feels premium.
              </p>
            </div>

            <div className="mt-10 grid gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <p className="text-sm text-slate-200">Monthly Insights</p>
                <p className="mt-1 text-2xl font-bold">Smarter budgeting</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <p className="text-sm text-slate-200">Visual Analytics</p>
                <p className="mt-1 text-2xl font-bold">Charts that guide action</p>
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="bg-slate-950/70 p-6 text-white sm:p-10">
            <div className="mx-auto w-full max-w-md">
              <div className="mb-8">
                <h2 className="text-3xl font-bold">Login</h2>
                <p className="mt-2 text-sm text-slate-400">
                  Enter your credentials to continue
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm text-slate-300">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition duration-200 placeholder:text-slate-500 focus:border-cyan-400 focus:bg-white/10"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-slate-300">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition duration-200 placeholder:text-slate-500 focus:border-cyan-400 focus:bg-white/10"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 px-4 py-3 font-semibold text-slate-950 transition duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-500/25 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? "Signing in..." : "Login to MoneyWise"}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-slate-400">
                Don&apos;t have an account?{" "}
                <button
                  onClick={() => navigate("/register")}
                  className="font-medium text-cyan-400 transition hover:text-cyan-300"
                >
                  Create one
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;