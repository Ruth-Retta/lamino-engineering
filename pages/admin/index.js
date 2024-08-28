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

      // Optionally save the email in local storage or session
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
      <div>
        <h1>Admin Login</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input 
              type="email" 
              name="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </label>
          <label>
            Password:
            <div style={{ position: 'relative' }}>
              <input 
                type={showPassword ? 'text' : 'password'} 
                name="password" 
                required 
              />
              <span 
                style={{ 
                  position: 'absolute', 
                  right: '10px', 
                  top: '50%', 
                  transform: 'translateY(-50%)', 
                  cursor: 'pointer' 
                }}
                onClick={toggleShowPassword}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </label>
          <button type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Login'}
          </button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      </div>
    );
  }

  return <AdminDashboard />;
}
