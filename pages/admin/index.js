import { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import AdminDashboard from '../../components/AdminDashboard';

export default function AdminPage() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
            <input type="email" name="email" required />
          </label>
          <label>
            Password:
            <input type="password" name="password" required />
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
import { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import AdminDashboard from '../../components/AdminDashboard';

export default function AdminPage() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
            <input type="email" name="email" required />
          </label>
          <label>
            Password:
            <input type="password" name="password" required />
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
