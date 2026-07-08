import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchDestinations, fetchPackages } from '../api';

const stats = [
  { value: '500+', label: 'Happy Travellers' },
  { value: '50+', label: 'Destinations' },
  { value: '25+', label: 'Tour Packages' },
  { value: '10+', label: 'Years Experience' },
];

const whyUs = [
  {
    icon: '🏔️',
    title: 'Expert Local Guides',
    desc: 'Our guides are born and raised in Himachal — they know every hidden trail, every village story, and every best sunrise spot.',
  },
  {
    icon: '🛡️',
    title: 'Trusted & Safe',
    desc: 'Fully insured, safety-first operations with verified partners. We have maintained a pristine safety record for over a decade.',
  },
  {
    icon: '🌿',
    title: 'Responsible Tourism',
    desc: 'We follow Leave No Trace principles and contribute to local communities. Travel better, not just more.',
  },
  {
    icon: '💰',
    title: 'Best Value Guaranteed',
    desc: 'Transparent pricing with no hidden costs. If you find a better deal, we will match it — no questions asked.',
  },
];

export default function Home() {
  const [destinations, setDestinations] = useState([]);
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    fetchDestinations().then((data) => setDestinations(data.filter((d) => d.isPopular).slice(0, 3)));
    fetchPackages().then((data) => setPackages(data.slice(0, 3)));
  }, []);

  return (
    <div>
      {/* Hero */}
      <section
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

        {/* Decorative vertical lines */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-2 opacity-40">
          <div className="w-px h-24 bg-white" />
          <p className="text-white text-xs tracking-widest uppercase font-body" style={{ writingMode: 'vertical-rl' }}>
            Dev Bhoomi
          </p>
          <div className="w-px h-24 bg-white" />
        </div>

        <div className="relative text-center px-4 sm:px-8 max-w-5xl mx-auto">
          <p className="font-accent text-accent-light text-lg italic mb-3 animate-fade-in">
            Welcome to Himachal Pradesh
          </p>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-none mb-6 animate-fade-in-up">
            Where Heaven
            <span className="block italic text-accent-light">Meets Earth</span>
          </h1>
          <p className="font-body text-gray-200 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up delay-200">
            Snow-capped peaks, ancient monasteries, sacred rivers, and pine-scented valleys — 
            Himachal Pradesh holds the world's most extraordinary landscapes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-300">
            <Link
              to="/packages"
              className="bg-accent text-white px-8 py-4 font-body tracking-widest uppercase text-sm hover:bg-accent-dark transition-all duration-300"
            >
              Explore Packages
            </Link>
            <Link
              to="/destinations"
              className="border-2 border-white text-white px-8 py-4 font-body tracking-widest uppercase text-sm hover:bg-white hover:text-primary transition-all duration-300"
            >
              View Destinations
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <div className="w-px h-12 bg-white/60" />
          <p className="text-white/60 text-xs tracking-widest uppercase font-body">Scroll</p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-4xl text-accent font-bold">{s.value}</p>
              <p className="font-body text-white/80 text-sm tracking-wider uppercase mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="font-accent text-accent italic text-lg mb-2">Discover Himachal</p>
          <h2 className="section-title">Featured Destinations</h2>
          <div className="w-16 h-0.5 bg-accent mx-auto mt-4" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 shadow-2xl">
          {destinations.length === 0 ? (
            // Fallback static cards if API fails
            [
              { name: 'Shimla', region: 'Southern Himachal', image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80', description: 'The Queen of Hills — colonial charm meets Himalayan grandeur.' },
              { name: 'Manali', region: 'Kullu Valley', image: 'https://images.unsplash.com/photo-1597167231350-d057a45dc868?q=80&w=1082&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', description: 'Adventure capital of Himachal — ski slopes, snow peaks, and ancient temples.' },
              { name: 'Spiti Valley', region: 'Cold Desert', image: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=800&q=80', description: 'A cold desert moonscape with thousand-year-old monasteries.' },
            ].map((d, i) => (
              <div key={i} className="relative overflow-hidden h-[420px] group cursor-pointer">
                <img src={d.image} alt={d.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="font-accent text-accent italic text-sm mb-1">{d.region}</p>
                  <h3 className="font-display text-3xl text-white mb-2">{d.name}</h3>
                  <p className="font-body text-gray-300 text-sm leading-relaxed">{d.description}</p>
                </div>
              </div>
            ))
          ) : (
            destinations.map((d) => (
              <div key={d._id} className="relative overflow-hidden h-[420px] group cursor-pointer">
                <img src={d.image} alt={d.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="font-accent text-accent italic text-sm mb-1">{d.region}</p>
                  <h3 className="font-display text-3xl text-white mb-2">{d.name}</h3>
                  <p className="font-body text-gray-300 text-sm leading-relaxed line-clamp-2">{d.description}</p>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="text-center mt-10">
          <Link to="/destinations" className="btn-outline">View All Destinations</Link>
        </div>
      </section>

      {/* Featured Packages */}
<section className="relative py-24 overflow-hidden">
  
  {/* Background Video */}
  <video
    autoPlay
    muted
    loop
    playsInline
    className="absolute inset-0 w-full h-full object-cover -z-10"
  >
    <source src="/ocean.mp4" type="video/mp4" />
  </video>

{/* Dark Overlay */}
<div className="absolute inset-0 bg-black/40 -z-10"></div>    
<div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent"></div>
<div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent"></div>

<div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">            <div className="text-center mb-14">
            <p className="font-accent text-accent italic text-lg mb-2">Plan Your Journey</p>
            <h2 className="section-title">Featured Packages</h2>
            <div className="w-16 h-0.5 bg-accent mx-auto mt-4" />
          </div>
          
          <div data-aos="fade-up"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.length === 0 ? (
              [
                { name: 'Himalayan Grand Circuit', duration: '10N/11D', price: 45000, type: 'scenic', image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80', highlights: ['Shimla', 'Manali', 'Spiti', 'Dharamshala'] },
                { name: 'Spiti Expedition', duration: '7N/8D', price: 32000, type: 'adventure', image: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=800&q=80', highlights: ['Key Monastery', 'Chandratal Lake', 'Pin Valley'] },
                { name: 'Parvati Valley Serenity', duration: '5N/6D', price: 18500, type: 'cultural', image: 'https://images.unsplash.com/photo-1591017403286-fd8493524e1e?w=800&q=80', highlights: ['Kasol', 'Kheerganga', 'Manikaran'] },
              ].map((p, i) => (
                <PackageCard key={i} pkg={p} />
              ))
            ) : (
              packages.map((p) => <PackageCard key={p._id} pkg={p} />)
            )}
          </div>
          <div className="text-center mt-12">
            <Link to="/packages" className="btn-primary">View All Packages</Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="font-accent text-accent italic text-lg mb-2">Why Travel With Us</p>
            <h2 className="section-title mb-6">We Know Himachal<br />Like Our Own Backyard</h2>
            <p className="font-body text-gray-600 leading-relaxed mb-8 text-lg">
              Born from a deep love for these mountains, Dev Bhoomi Tourism has been crafting authentic 
              Himalayan experiences since 2014. Every journey we design is a story — one you will tell for years.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {whyUs.map((w) => (
                <div key={w.title} className="flex gap-4">
                  <span className="text-3xl">{w.icon}</span>
                  <div>
                    <h4 className="font-display text-primary text-lg mb-1">{w.title}</h4>
                    <p className="font-body text-gray-600 text-sm leading-relaxed">{w.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <Link to="/about" className="btn-outline">Our Story</Link>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=800&q=80"
              alt="Spiti Valley"
              className="w-full h-[520px] object-cover"
            />
            <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-accent/20 -z-10" />
            <div className="absolute -top-6 -right-6 w-48 h-48 border-4 border-primary/20 -z-10" />
            <div className="absolute top-6 left-6 bg-primary text-white p-5">
              <p className="font-display text-4xl font-bold">10+</p>
              <p className="font-body text-sm tracking-wider">Years of Excellence</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section
        className="py-24 relative"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
        }}
      >
        <div className="absolute inset-0 bg-primary/80" />
        <div className="relative text-center px-4">
          <p className="font-accent text-accent-light italic text-xl mb-3">Ready for an Adventure?</p>
          <h2 className="font-display text-4xl md:text-5xl text-white mb-4">Start Your Himalayan Journey Today</h2>
          <p className="font-body text-white/80 text-lg max-w-xl mx-auto mb-10">
            Let us plan the perfect trip for you — customized itineraries, expert guidance, and memories that last a lifetime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/packages" className="bg-accent text-white px-8 py-4 font-body tracking-widest uppercase text-sm hover:bg-accent-dark transition-all">
              Browse Packages
            </Link>
            <Link to="/contact" className="border-2 border-white text-white px-8 py-4 font-body tracking-widest uppercase text-sm hover:bg-white hover:text-primary transition-all">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function PackageCard({ pkg }) {
  const typeColors = {
    adventure: 'bg-red-100 text-red-700',
    cultural: 'bg-purple-100 text-purple-700',
    scenic: 'bg-green-100 text-green-700',
    spiritual: 'bg-amber-100 text-amber-700',
  };

  return (
<div className="bg-white rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-3 hover:scale-[1.03] transition-all duration-500 group overflow-hidden">  <div className="relative h-52 overflow-hidden">
        <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-3 left-3">
          <span className={`text-xs font-body px-2 py-1 uppercase tracking-wider ${typeColors[pkg.type] || 'bg-gray-100 text-gray-700'}`}>
            {pkg.type}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-display text-xl text-primary mb-1">{pkg.name}</h3>
        <p className="font-body text-accent text-sm mb-3">{pkg.duration}</p>
        <ul className="space-y-1 mb-5">
          {pkg.highlights.slice(0, 3).map((h, i) => (
            <li key={i} className="font-body text-gray-600 text-sm flex items-center gap-2">
              <span className="w-1 h-1 bg-accent rounded-full flex-shrink-0" />
              {h}
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <p className="font-body text-xs text-gray-500 uppercase tracking-wider">Starting from</p>
            <p className="font-display text-2xl text-primary">₹{pkg.price.toLocaleString('en-IN')}</p>
          </div>
          <Link to="/packages" className="bg-primary text-white px-4 py-2 text-sm font-body tracking-wider hover:bg-accent transition-colors duration-300">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

