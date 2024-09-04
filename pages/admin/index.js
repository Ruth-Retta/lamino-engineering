import { useState, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import AdminDashboard from '../../components/AdminDashboard';
import { useRouter } from 'next/router';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function AdminPage() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (router.query.email) {
      setEmail(router.query.email);
    }
  }, [router.query.email]);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (!session) {
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError('');

      const email = e.target.email.value;
      const password = e.target.password.value;

      
      localStorage.setItem('authEmail', email);

      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result.error) {
        setError(result.error);
      }
      setLoading(false);
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
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className="admin-login-input"
            />
          </label>
          <label className="admin-login-label">
            Password:
            <div className="admin-login-password-container">
              <input 
                type={showPassword ? 'text' : 'password'} 
                name="password" 
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
            {loading ? 'Loading...' : 'Login'}
          </button>
          {error && <p className="admin-login-error">{error}</p>}
        </form>
      </div>
    );
  }

  return <AdminDashboard />;
}
