import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signinUser } from "../services/api";
import { useAuth } from "../context/AuthContext";

function Login() {
    const navigate = useNavigate();
    const { setUser } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
        ...previousData,
        [name]: value,
    }));
    };

    const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
        const data = await signinUser(formData);

        localStorage.setItem("token", data.token);

        setUser(data.user);

        navigate("/dashboard", { replace: true });
        
    } catch (error) {
        setError(error.message);
    } finally {
        setLoading(false);
    }
    };

  return (
    <div className="min-h-screen bg-[#0B0D10] text-[#F5F7FA]">
      <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-12">

        {/* Logo */}
        <div className="mb-10 text-center">
          <Link
            to="/"
            className="text-2xl font-bold tracking-tight"
          >
            Drop<span className="text-[#8B5CF6]">Note</span>
          </Link>

          <h1 className="mt-8 text-3xl font-bold">
            Welcome back
          </h1>

          <p className="mt-3 text-sm text-[#9AA3AF]">
            Sign in to continue to your notes.
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-2xl border border-[#252A32] bg-[#13161B] p-6 shadow-2xl sm:p-8">

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium"
              >
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-[#252A32] bg-[#0B0D10] px-4 py-3 text-sm text-white outline-none transition placeholder:text-[#606975] focus:border-[#8B5CF6]"
              />
            </div>

            {/* Password */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium"
                >
                  Password
                </label>
              </div>

              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full rounded-xl border border-[#252A32] bg-[#0B0D10] px-4 py-3 text-sm text-white outline-none transition placeholder:text-[#606975] focus:border-[#8B5CF6]"
              />
            </div>

            {error && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                    {error}
                </div>
            )}

            {/* Submit */}
           <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-[#8B5CF6] px-4 py-3 font-semibold text-white transition hover:bg-[#7C3AED] disabled:cursor-not-allowed disabled:opacity-60"
                >
                {loading ? "Signing in..." : "Sign in"}
            </button>

          </form>

          {/* Signup Link */}
          <p className="mt-6 text-center text-sm text-[#9AA3AF]">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-[#A78BFA] transition hover:text-[#8B5CF6]"
            >
              Create one
            </Link>
          </p>

        </div>

        {/* Back to Home */}
        <Link
          to="/"
          className="mt-6 text-center text-sm text-[#606975] transition hover:text-[#9AA3AF]"
        >
          ← Back to home
        </Link>

      </div>
    </div>
  );
}

export default Login;