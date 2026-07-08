import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const tabs = ['bookings', 'saved', 'profile', 'password'];

export default function Dashboard() {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('bookings');
  const [bookings, setBookings] = useState([]);
  const [savedPackages, setSavedPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    city: user?.city || '',
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchData();
  }, [user]);

  const fetchData = async () => {
    try {
      const [bookingsRes, savedRes] = await Promise.all([
        axios.get('/api/user/bookings'),
        axios.get('/api/user/saved'),
      ]);
      setBookings(bookingsRes.data);
      setSavedPackages(savedRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setMessage(''); setError('');
    try {
      const { data } = await axios.put('/api/user/profile', profileForm);
      updateUser(data.user);
      setMessage('Profile updated successfully!');
    } catch (err) {
      setError(err.response?.data?.error || 'Update failed.');
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setMessage(''); setError('');
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      return setError('New passwords do not match.');
    }
    try {
      await axios.put('/api/user/change-password', {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      setMessage('Password changed successfully!');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      setError(err.response?.data?.error || 'Password change failed.');
    }
  };

  const handleUnsave = async (packageId) => {
    try {
      await axios.post(`/api/user/save/${packageId}`);
      setSavedPackages(savedPackages.filter((p) => p._id !== packageId));
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleCancelBooking = async (bookingId) => {
  if (!window.confirm('Are you sure you want to cancel this trip?')) {
    return;
  }

  try {
    await axios.put(`/api/user/bookings/${bookingId}/cancel`);

    setBookings((prev) =>
      prev.map((booking) =>
        booking._id === bookingId
          ? { ...booking, status: 'cancelled' }
          : booking
      )
    );

    setMessage('Trip cancelled successfully.');
  } catch (err) {
    setError(err.response?.data?.error || 'Failed to cancel trip.');
  }
};


  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-yellow-100 text-yellow-700';
    }
  };

  const formatDate = (d) =>
    new Date(d).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="font-body text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
<div className="min-h-screen bg-gray-50"> 
   {/* Dashboard Header */}
<div className="bg-primary text-white pt-28 pb-8 px-4">
<div className="max-w-6xl mx-auto text-center">
  <p className="font-accent text-accent-light italic text-sm mb-1">
    Welcome back
  </p>

  <h1 className="font-display text-4xl">
    {user?.name}
  </h1>

  <p className="font-body text-white/70 text-sm mt-1">
    {user?.email}
  </p>
</div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
<div className="bg-gradient-to-b from-[#1E4D4F] to-[#2F6B6D] text-white shadow-xl rounded-xl overflow-hidden">           
             {[
                { id: 'bookings', label: '📋 My Bookings', count: bookings.length },
                { id: 'saved', label: '❤️ Saved Packages', count: savedPackages.length },
                { id: 'profile', label: '👤 My Profile', count: null },
                { id: 'password', label: '🔒 Password', count: null },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setActiveTab(item.id); setMessage(''); setError(''); }}
                  className={`w-full text-left px-5 py-4 font-body text-sm border-b border-white/10 flex items-center justify-between transition-all duration-300 ${
                  activeTab === item.id
                  ? 'bg-white/25 text-white border-l-4 border-black'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
                >
                  <span>{item.label}</span>
                  {item.count !== null && (
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                          activeTab === item.id
                           ? 'bg-white/20 text-white'
                           : 'bg-white/10 text-white/70'                    }`}>
                      {item.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {message && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 text-sm font-body mb-5">
                ✅ {message}
              </div>
            )}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm font-body mb-5">
                ❌ {error}
              </div>
            )}

            {/* MY BOOKINGS */}
            {activeTab === 'bookings' && (
              <div>
                <h2 className="font-display text-2xl text-primary mb-6">My Bookings</h2>
                {bookings.length === 0 ? (
                  <div className="bg-white p-12 text-center shadow-sm">
                    <p className="text-5xl mb-4">🏔️</p>
                    <p className="font-display text-xl text-primary mb-2">No bookings yet</p>
                    <p className="font-body text-gray-500 text-sm mb-6">Start planning your Himalayan adventure!</p>
                    <Link to="/packages" className="bg-primary text-white px-6 py-3 font-body text-sm tracking-wider uppercase hover:bg-accent transition-colors">
                      Explore Packages
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <div key={booking._id} className="bg-white shadow-sm p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div>
                            <h3 className="font-display text-lg text-primary">{booking.packageName || 'Tour Package'}</h3>
                            <div className="flex flex-wrap gap-4 mt-2 font-body text-sm text-gray-600">
                              <span>📅 Travel Date: {formatDate(booking.travelDate)}</span>
                              <span>👥 {booking.people} {booking.people === 1 ? 'Person' : 'People'}</span>
                              <span>📞 {booking.phone}</span>
                            </div>
                            {booking.message && (
                              <p className="font-body text-sm text-gray-500 mt-2 italic">"{booking.message}"</p>
                            )}
                            <p className="font-body text-xs text-gray-400 mt-2">
                              Submitted on {formatDate(booking.createdAt)}
                            </p>
                          </div>
                          
                          {booking.status !== 'cancelled' && (
                          <button
                            onClick={() => handleCancelBooking(booking._id)}
                            className="mt-3 bg-red-500 hover:bg-red-600 text-white px-4 py-2 text-xs uppercase tracking-wider transition-colors">
                            Cancel Trip
                        </button>

                        )}
                          <span className={`px-3 py-1 text-xs font-body uppercase tracking-wider rounded-full flex-shrink-0 ${getStatusColor(booking.status || 'Confirmed')}`}>
                            {booking.status || 'Confirmed'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* SAVED PACKAGES */}
            {activeTab === 'saved' && (
              <div>
                <h2 className="font-display text-2xl text-primary mb-6">Saved Packages</h2>
                {savedPackages.length === 0 ? (
                  <div className="bg-white p-12 text-center shadow-sm">
                    <p className="text-5xl mb-4">❤️</p>
                    <p className="font-display text-xl text-primary mb-2">No saved packages</p>
                    <p className="font-body text-gray-500 text-sm mb-6">Save packages you love to view them later.</p>
                    <Link to="/packages" className="bg-primary text-white px-6 py-3 font-body text-sm tracking-wider uppercase hover:bg-accent transition-colors">
                      Browse Packages
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {savedPackages.map((pkg) => (
                      <div key={pkg._id} className="bg-white shadow-sm overflow-hidden group">
                        <div className="relative h-44 overflow-hidden">
                          <img
                            src={pkg.image}
                            alt={pkg.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-3 right-3">
                            <span className="bg-white/90 text-primary text-xs px-2 py-1 font-body uppercase tracking-wider">
                              {pkg.type}
                            </span>
                          </div>
                        </div>
                        <div className="p-5">
                          <h3 className="font-display text-lg text-primary mb-1">{pkg.name}</h3>
                          <p className="font-body text-accent text-sm mb-3">{pkg.duration}</p>
                          <div className="flex items-center justify-between">
                            <p className="font-display text-xl text-primary">₹{pkg.price?.toLocaleString('en-IN')}</p>
                            <div className="flex gap-2">
                              <Link
                                to="/packages"
                                className="bg-primary text-white px-3 py-1.5 text-xs font-body tracking-wider hover:bg-accent transition-colors"
                              >
                                Book Now
                              </Link>
                              <button
                                onClick={() => handleUnsave(pkg._id)}
                                className="border border-red-300 text-red-500 px-3 py-1.5 text-xs font-body hover:bg-red-50 transition-colors"
                              >
                                Remove ❤️
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* PROFILE */}
            {activeTab === 'profile' && (
              <div>
                <h2 className="font-display text-2xl text-primary mb-6">My Profile</h2>
                <div className="bg-white shadow-sm p-8">
                  <form onSubmit={handleProfileUpdate} className="space-y-5 max-w-lg">
                    <div>
                      <label className="block font-body text-xs uppercase tracking-wider text-gray-600 mb-1.5">Full Name</label>
                      <input
                        type="text" required
                        value={profileForm.name}
                        onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                        className="w-full border border-gray-200 px-4 py-3 font-body text-sm focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block font-body text-xs uppercase tracking-wider text-gray-600 mb-1.5">Email (cannot change)</label>
                      <input
                        type="email" disabled
                        value={user?.email}
                        className="w-full border border-gray-100 bg-gray-50 px-4 py-3 font-body text-sm text-gray-400 cursor-not-allowed"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block font-body text-xs uppercase tracking-wider text-gray-600 mb-1.5">Phone</label>
                        <input
                          type="tel"
                          value={profileForm.phone}
                          onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                          className="w-full border border-gray-200 px-4 py-3 font-body text-sm focus:outline-none focus:border-primary"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                      <div>
                        <label className="block font-body text-xs uppercase tracking-wider text-gray-600 mb-1.5">City</label>
                        <input
                          type="text"
                          value={profileForm.city}
                          onChange={(e) => setProfileForm({ ...profileForm, city: e.target.value })}
                          className="w-full border border-gray-200 px-4 py-3 font-body text-sm focus:outline-none focus:border-primary"
                          placeholder="Delhi"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="bg-primary text-white px-8 py-3 font-body tracking-widest uppercase text-sm hover:bg-accent transition-colors"
                    >
                      Save Changes
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* CHANGE PASSWORD */}
            {activeTab === 'password' && (
              <div>
                <h2 className="font-display text-2xl text-primary mb-6">Change Password</h2>
                <div className="bg-white shadow-sm p-8">
                  <form onSubmit={handlePasswordChange} className="space-y-5 max-w-lg">
                    <div>
                      <label className="block font-body text-xs uppercase tracking-wider text-gray-600 mb-1.5">Current Password</label>
                      <input
                        type="password" required
                        value={passwordForm.currentPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                        className="w-full border border-gray-200 px-4 py-3 font-body text-sm focus:outline-none focus:border-primary"
                        placeholder="••••••••"
                      />
                    </div>
                    <div>
                      <label className="block font-body text-xs uppercase tracking-wider text-gray-600 mb-1.5">New Password</label>
                      <input
                        type="password" required minLength={6}
                        value={passwordForm.newPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                        className="w-full border border-gray-200 px-4 py-3 font-body text-sm focus:outline-none focus:border-primary"
                        placeholder="Min 6 characters"
                      />
                    </div>
                    <div>
                      <label className="block font-body text-xs uppercase tracking-wider text-gray-600 mb-1.5">Confirm New Password</label>
                      <input
                        type="password" required
                        value={passwordForm.confirmPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                        className="w-full border border-gray-200 px-4 py-3 font-body text-sm focus:outline-none focus:border-primary"
                        placeholder="Repeat new password"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-primary text-white px-8 py-3 font-body tracking-widest uppercase text-sm hover:bg-accent transition-colors"
                    >
                      Change Password
                    </button>
                  </form>
                </div>
              </div>
            )}

          </main>
        </div>
      </div>
    </div>
  );
}
