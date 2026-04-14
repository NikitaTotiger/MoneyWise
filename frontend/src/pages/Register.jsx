import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
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
        "http://localhost:5000/api/auth/register",
        formData
      );

      localStorage.setItem("userInfo", JSON.stringify(res.data));
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950">
      <div className="absolute inset-0">
        <div className="absolute left-[-80px] top-[-80px] h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute right-[-80px] top-[120px] h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute bottom-[-100px] left-[25%] h-96 w-96 rounded-full bg-blue-500/15 blur-3xl" />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:36px_36px]" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10">
        <div className="grid w-full max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl md:grid-cols-2">
          <div className="hidden flex-col justify-between bg-gradient-to-br from-emerald-500/20 via-cyan-500/10 to-transparent p-10 text-white md:flex">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Build better money habits
              </div>

              <h1 className="text-5xl font-black leading-tight">
                Create your
                <span className="block bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
                  MoneyWise account
                </span>
              </h1>

              <p className="mt-5 max-w-md text-base text-slate-200/90">
                Start tracking expenses, viewing smart insights, and building a
                finance workflow that actually feels modern.
              </p>
            </div>

            <div className="mt-10 grid gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <p className="text-sm text-slate-200">Track Spending</p>
                <p className="mt-1 text-2xl font-bold">Daily, monthly, yearly</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <p className="text-sm text-slate-200">Smart Insights</p>
                <p className="mt-1 text-2xl font-bold">See where money goes</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-950/70 p-6 text-white sm:p-10">
            <div className="mx-auto w-full max-w-md">
              <div className="mb-8">
                <h2 className="text-3xl font-bold">Register</h2>
                <p className="mt-2 text-sm text-slate-400">
                  Create your account to get started
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm text-slate-300">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition duration-200 placeholder:text-slate-500 focus:border-emerald-400 focus:bg-white/10"
                    required
                  />
                </div>

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
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition duration-200 placeholder:text-slate-500 focus:border-emerald-400 focus:bg-white/10"
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
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition duration-200 placeholder:text-slate-500 focus:border-emerald-400 focus:bg-white/10"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-400 px-4 py-3 font-semibold text-slate-950 transition duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-emerald-500/25 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? "Creating account..." : "Create Account"}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-slate-400">
                Already have an account?{" "}
                <button
                  onClick={() => navigate("/login")}
                  className="font-medium text-emerald-400 transition hover:text-emerald-300"
                >
                  Login
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;