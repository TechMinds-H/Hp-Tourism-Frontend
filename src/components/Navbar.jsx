
import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLocation } from "react-router-dom";


const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/destinations', label: 'Destinations', },
  { to: '/packages', label: 'Packages' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/blog', label: 'Blog' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
  console.log("Modal State:", showLogoutModal);
}, [showLogoutModal]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
  logout();
  navigate('/');
  setMenuOpen(false);
};

  const location = useLocation();
  return (
    <header
  className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
    scrolled
      ? "bg-white shadow-lg py-3"
      : "bg-transparent py-5"
  }`}
>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
        <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center shadow-md">            <span className="text-white font-display font-bold text-xl">H</span>
          </div>
          <div>
            <p className={`font-display font-bold text-xl leading-none transition-colors ${scrolled ? 'text-primary' : 'text-white'}`}>
              Dev Bhoomi
            </p>
            <p className={`font-accent text-xs tracking-widest uppercase transition-colors ${scrolled ? 'text-accent' : 'text-amber-200'}`}>
              Himachal Pradesh
            </p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8"
        
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `font-body text-sm tracking-wider uppercase transition-all duration-300 relative group ${
                  scrolled
                    ? isActive ? 'text-primary' : 'text-gray-700 hover:text-primary'
                    : isActive ? 'text-accent' : 'text-white hover:text-accent'
                }`
              }
            >
              {({ isActive }) => (
                
                <>
                  <span className="flex items-center gap-2">
                  {link.icon}
                  {link.label}
                  </span>

                  <span className={`absolute -bottom-1 left-0 h-px bg-accent transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </>
              )}
            </NavLink>
          ))}

          {/* Auth buttons */}
          {user ? (
            <div className="flex items-center gap-3">
              <Link
                to="/dashboard"
                className={`relative group font-body text-sm tracking-wider uppercase transition-all duration-300 ${
                  scrolled
                    ? 'text-primary hover:text-accent'
                    : 'text-white hover:text-accent'
                }`}
              >
                👤 {user.name.split(' ')[0]}

               <span
                 className="absolute -bottom-1 left-0 h-px bg-accent transition-all duration-300 w-0 group-hover:w-full"
               />
              </Link>
              
             <button
  onClick={() => {setShowLogoutModal(true)}}
                className={`relative group text-sm px-4 py-1.5 font-body tracking-wider uppercase transition-colors duration-300 ${
                scrolled
                  ? 'text-gray-700 hover:text-accent'
                  : 'text-white hover:text-accent'}`} > 
              Logout

              <span
              className="absolute -bottom-1 left-0 h-px bg-accent transition-all duration-300 w-0 group-hover:w-full"
              />
            </button>

            </div>
          ) : (
            <Link
              to="/login"
              className={`relative group font-body text-sm tracking-wider uppercase transition-colors duration-300
                ${scrolled ? 'text-gray-700 hover:text-accent' : 'text-white hover:text-accent'}`}
            >
              Login
              <span     
              className="absolute -bottom-1 left-0 h-px bg-accent transition-all duration-300 w-0 group-hover:w-full"
              />
              
            </Link>
          )}

         <Link
  to="/packages"
  className="relative overflow-hidden bg-gradient-to-r from-primary to-accent text-white px-6 py-2 text-center rounded-full text-sm font-semibold tracking-wider uppercase shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
>
  <span className="relative z-10">✈️ Book Now</span>
  <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
</Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className={`w-6 h-0.5 mb-1.5 transition-all duration-300 ${scrolled ? 'bg-primary' : 'bg-white'} ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <div className={`w-6 h-0.5 mb-1.5 transition-all duration-300 ${scrolled ? 'bg-primary' : 'bg-white'} ${menuOpen ? 'opacity-0' : ''}`} />
          <div className={`w-6 h-0.5 transition-all duration-300 ${scrolled ? 'bg-primary' : 'bg-white'} ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden bg-white shadow-xl transition-all duration-300 overflow-hidden ${menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
        <nav className="px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `font-body text-sm tracking-wider uppercase py-2 border-b border-gray-100 ${isActive ? 'text-primary font-bold' : 'text-gray-700'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
          {user ? (
            <>
              <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="font-body text-sm text-primary tracking-wider uppercase py-2 border-b border-gray-100">
               My Dashboard
              </Link>
              <button onClick={handleLogout} className="font-body text-sm text-red-500 tracking-wider uppercase py-2 border-b border-gray-100 text-left">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" onClick={() => setMenuOpen(false)} className="font-body text-sm text-gray-700 tracking-wider uppercase py-2 border-b border-gray-100">
              Login / Register
            </Link>
          )}
          <Link to="/packages" onClick={() => setMenuOpen(false)} className="bg-primary text-white px-5 py-3 text-sm tracking-wider uppercase font-body text-center mt-2">
          Book Now
          </Link>
        </nav>
      </div>

{showLogoutModal && (
  <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[99999]">
    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-[90%] text-center">

      <div className="text-6xl mb-4">🏔️</div>

      <h2 className="text-2xl font-display text-primary mb-2">
        Leaving Dev Bhoomi?
      </h2>

      <p className="text-gray-600 mb-6">
        Your Himalayan journey will be waiting for you.
      </p>

      <div className="flex gap-4 justify-center">
        <button
          onClick={() => setShowLogoutModal(false)}
          className="px-6 py-2 border rounded-full"
        >
          Stay Here
        </button>

        <button
          onClick={() => {
            logout();
            navigate('/');
            setShowLogoutModal(false);
          }}
          className="px-6 py-2 border border-gray-300 rounded-full hover:bg-primary hover:text-white hover:scale-105 hover:shadow-lg transition-all duration-300"        >
          Logout
        </button>
      </div>

    </div>
  </div>
)}

</header>
);
}
