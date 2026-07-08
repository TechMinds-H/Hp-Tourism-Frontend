import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [tab, setTab] = useState('login'); // 'login' | 'register'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({
    name: '', email: '', password: '', confirmPassword: '', phone: '', city: '',
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await axios.post('/api/auth/login', loginForm);
      login(data.token, data.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (registerForm.password !== registerForm.confirmPassword) {
      return setError('Passwords do not match.');
    }
    setLoading(true);
    setError('');
    try {
      const { data } = await axios.post('/api/auth/register', registerForm);
      login(data.token, data.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-20"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=1920&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative bg-white w-full max-w-md shadow-2xl">
        {/* Header */}
        <div className="bg-primary p-6 text-center">
          <Link to="/" className="inline-flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-accent flex items-center justify-center">
              <span className="text-white font-bold text-xl">H</span>
            </div>
            <div className="text-left">
              <p className="font-display text-white text-lg leading-none">Dev Bhoomi</p>
              <p className="text-amber-200 text-xs tracking-widest">Himachal Pradesh</p>
            </div>
          </Link>
          <p className="text-white/80 text-sm font-body mt-2">
            {tab === 'login' ? 'Welcome back! Sign in to continue.' : 'Create your account to get started.'}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => { setTab('login'); setError(''); }}
            className={`flex-1 py-3 text-sm font-body tracking-wider uppercase transition-colors ${
              tab === 'login' ? 'text-primary border-b-2 border-primary font-semibold' : 'text-gray-500'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => { setTab('register'); setError(''); }}
            className={`flex-1 py-3 text-sm font-body tracking-wider uppercase transition-colors ${
              tab === 'register' ? 'text-primary border-b-2 border-primary font-semibold' : 'text-gray-500'
            }`}
          >
            Register
          </button>
        </div>

        <div className="p-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm font-body mb-5">
              {error}
            </div>
          )}

          {/* LOGIN FORM */}
          {tab === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block font-body text-xs uppercase tracking-wider text-gray-600 mb-1.5">Email</label>
                <input
                  type="email" required
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  className="w-full border border-gray-200 px-4 py-3 font-body text-sm focus:outline-none focus:border-primary"
                  placeholder="your@gmail.com"
                />
              </div>
              <div>
                <label className="block font-body text-xs uppercase tracking-wider text-gray-600 mb-1.5">Password</label>
                <input
                  type="password" required
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  className="w-full border border-gray-200 px-4 py-3 font-body text-sm focus:outline-none focus:border-primary"
                  placeholder="••••••••"
                />
              </div>
              <button
                type="submit" disabled={loading}
                className="w-full bg-primary text-white py-3 font-body tracking-widest uppercase text-sm hover:bg-accent transition-colors disabled:opacity-60"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
              <p className="text-center text-sm text-gray-500 font-body">
                Don't have an account?{' '}
                <button type="button" onClick={() => setTab('register')} className="text-accent hover:underline">
                  Register here
                </button>
              </p>
            </form>
          )}

          {/* REGISTER FORM */}
          {tab === 'register' && (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block font-body text-xs uppercase tracking-wider text-gray-600 mb-1.5">Full Name *</label>
                  <input
                    type="text" required
                    value={registerForm.name}
                    onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                    className="w-full border border-gray-200 px-4 py-3 font-body text-sm focus:outline-none focus:border-primary"
                    placeholder="Rahul Mehta"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block font-body text-xs uppercase tracking-wider text-gray-600 mb-1.5">Email *</label>
                  <input
                    type="email" required
                    value={registerForm.email}
                    onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                    className="w-full border border-gray-200 px-4 py-3 font-body text-sm focus:outline-none focus:border-primary"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block font-body text-xs uppercase tracking-wider text-gray-600 mb-1.5">Password *</label>
                  <input
                    type="password" required minLength={6}
                    value={registerForm.password}
                    onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                    className="w-full border border-gray-200 px-4 py-3 font-body text-sm focus:outline-none focus:border-primary"
                    placeholder="Min 6 chars"
                  />
                </div>
                <div>
                  <label className="block font-body text-xs uppercase tracking-wider text-gray-600 mb-1.5">Confirm *</label>
                  <input
                    type="password" required
                    value={registerForm.confirmPassword}
                    onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                    className="w-full border border-gray-200 px-4 py-3 font-body text-sm focus:outline-none focus:border-primary"
                    placeholder="Repeat password"
                  />
                </div>
                <div>
                  <label className="block font-body text-xs uppercase tracking-wider text-gray-600 mb-1.5">Phone</label>
                  <input
                    type="tel"
                    value={registerForm.phone}
                    onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value })}
                    className="w-full border border-gray-200 px-4 py-3 font-body text-sm focus:outline-none focus:border-primary"
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <label className="block font-body text-xs uppercase tracking-wider text-gray-600 mb-1.5">City</label>
                  <input
                    type="text"
                    value={registerForm.city}
                    onChange={(e) => setRegisterForm({ ...registerForm, city: e.target.value })}
                    className="w-full border border-gray-200 px-4 py-3 font-body text-sm focus:outline-none focus:border-primary"
                    placeholder="Delhi"
                  />
                </div>
              </div>
              <button
                type="submit" disabled={loading}
                className="w-full bg-primary text-white py-3 font-body tracking-widest uppercase text-sm hover:bg-accent transition-colors disabled:opacity-60"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
              <p className="text-center text-sm text-gray-500 font-body">
                Already have an account?{' '}
                <button type="button" onClick={() => setTab('login')} className="text-accent hover:underline">
                  Login here
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
