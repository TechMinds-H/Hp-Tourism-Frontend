import { Link } from 'react-router-dom';
import { FaXTwitter, FaInstagram } from "react-icons/fa6";

const socialLinks = [
  { name: 'Twitter', url: 'https://www.x.com/mindstech43138', icon: <FaXTwitter />},
  { name: 'Instagram', url: 'https://www.instagram.com/_harbhajan_1', icon: <FaInstagram />}
]

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white">
      {/* Top Bar */}
      <div className="bg-primary py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-accent italic text-amber-200 text-sm">
            "The mountains are calling and I must go." — John Muir
          </p>
          <div className="flex gap-4 font-accent italic">
            {socialLinks.map((s)=>(
              <a key={s.icon}
                href={s.url}
                target='_blank'
                rel='noonpener noreferrer'>
                  
                {s.icon}
                </a>
            ))}
          
  
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 bg-accent flex items-center justify-center">
              <span className="text-white font-display font-bold text-lg">H</span>
            </div>
            <div>
              <p className="font-display text-lg leading-none">Dev Bhoomi</p>
              <p className="font-accent text-xs text-accent-light tracking-widest">Himachal Pradesh</p>
            </div>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed font-body">
            Your trusted companion for exploring the Himalayan paradise. We craft unforgettable journeys through mountains, monasteries, and meadows.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-display text-accent mb-5 text-lg">Quick Links</h4>
          <ul className="space-y-2">
            {[
              { to: '/', label: 'Home' },
              { to: '/destinations', label: 'Destinations' },
              { to: '/packages', label: 'Packages' },
              { to: '/gallery', label: 'Gallery' },
              { to: '/about', label: 'About Us' },
              { to: '/contact', label: 'Contact' },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-gray-400 text-sm hover:text-accent transition-colors duration-300 font-body">
                  → {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Destinations */}
        <div>
          <h4 className="font-display text-accent mb-5 text-lg">Top Destinations</h4>
          <ul className="space-y-2">
            {['Shimla', 'Manali', 'Dharamshala', 'Spiti Valley', 'Kasol', 'Kullu'].map((d) => (
              <li key={d}>
                <Link to="/destinations" className="text-gray-400 text-sm hover:text-accent transition-colors duration-300 font-body">
                  → {d}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-display text-accent mb-5 text-lg">Get in Touch</h4>
          <div className="space-y-3 text-gray-400 text-sm font-body">
            <div>
              <p className="text-white font-semibold text-xs uppercase tracking-wider mb-1">Address</p>
              <p>SISSU, MANALI - 171001<br />Himachal Pradesh, India</p>
            </div>
            <div>
              <p className="text-white font-semibold text-xs uppercase tracking-wider mb-1">Phone</p>
              <p>+91 7807414944</p>
              <p>+91 7876838277</p>
            </div>
            <div>
              <p className="text-white font-semibold text-xs uppercase tracking-wider mb-1">Email</p>
              <p>harbhajanevil@gmail.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-gray-500 text-xs font-body">
            © {new Date().getFullYear()} Dev Bhoomi Himachal Pradesh Tourism. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs font-body">
            Crafted with ♥ for the Himalayas
          </p>
        </div>
      </div>
    </footer>
  );
}
