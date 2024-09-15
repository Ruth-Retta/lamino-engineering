import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import AdminDashboard from "../../components/AdminDashboard";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (session && session.user.role) {
    return <AdminDashboard />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const email = e.target.email.value;
    const password = e.target.password.value;

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result.error) {
      setError(result.error);
    } else {
      router.push("/admin");
    }
    setLoading(false);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="admin-login-container">
      <h1 className="admin-login-title">Admin Login</h1>
      <form onSubmit={handleSubmit} className="admin-login-form">
        <label className="admin-login-label">
          Email:
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="admin-login-input"
          />
        </label>
        <label className="admin-login-label">
          Password:
          <div className="admin-login-password-container">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="*********"
              required
              className="admin-login-input"
            />
            <span
              className="admin-login-password-toggle"
              onClick={toggleShowPassword}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </label>
        <button type="submit" disabled={loading} className="admin-login-button">
          {loading ? "Loading..." : "Login"}
        </button>
        {error && <p className="admin-login-error">{error}</p>}
      </form>
    </div>
  );
}
