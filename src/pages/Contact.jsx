import { useState } from 'react';
import { submitContact } from '../api';

const defaultForm = { name: '', email: '', subject: '', message: '' };

const officeInfo = [
  { icon: '📍', label: 'Address', value: 'SISSU, MANALI - 171001\nHimachal Pradesh, India' },
  { icon: '📞', label: 'Phone', value: '+91 7807414944\n+91 7876838277' },
  { icon: '✉️', label: 'Email', value: 'harbhajanevil@gmail.com\nbooking@devbhoomitours.com' },
  { icon: '🕐', label: 'Working Hours', value: 'Mon - Sat: 9:00 AM – 7:00 PM\nSunday: 10:00 AM – 4:00 PM' },
];

export default function Contact() {
  const [form, setForm] = useState(defaultForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await submitContact(form);
      setSuccess(true);
      setForm(defaultForm);
    } catch {
      setError('Failed to send message. Please try again or call us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero Banner */}
      <div
        className="relative h-64 md:h-80 flex items-end pb-12 px-6"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/30" />
        <div className="relative max-w-7xl mx-auto w-full">
          <p className="font-accent text-accent-light italic text-lg mb-1">We'd Love to Hear From You</p>
          <h1 className="font-display text-5xl md:text-6xl text-white">Contact Us</h1>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div>
            <p className="font-accent text-accent italic text-lg mb-2">Send us a Message</p>
            <h2 className="font-display text-3xl text-primary mb-8">Get in Touch</h2>

            {success ? (
              <div className="bg-green-50 border border-green-200 p-8 text-center">
                <div className="text-5xl mb-4">✅</div>
                <h4 className="font-display text-2xl text-green-800 mb-2">Message Sent!</h4>
                <p className="font-body text-green-700 leading-relaxed mb-6">
                  Thank you for reaching out. Our team will respond within 24 hours.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="bg-primary text-white px-6 py-2.5 font-body tracking-wider uppercase text-sm"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-body text-xs uppercase tracking-wider text-gray-600 mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text" name="name" value={form.name} onChange={handleChange} required
                      className="w-full border border-gray-200 px-4 py-3 font-body text-sm focus:outline-none focus:border-primary transition-colors"
                      // placeholder="NITISH JASWAL"
                    />
                  </div>
                  <div>
                    <label className="block font-body text-xs uppercase tracking-wider text-gray-600 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email" name="email" value={form.email} onChange={handleChange} required
                      className="w-full border border-gray-200 px-4 py-3 font-body text-sm focus:outline-none focus:border-primary transition-colors"
                      // placeholder="nitishjaswal4516@gmail.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-body text-xs uppercase tracking-wider text-gray-600 mb-1.5">
                    Subject *
                  </label>
                  <input
                    type="text" name="subject" value={form.subject} onChange={handleChange} required
                    className="w-full border border-gray-200 px-4 py-3 font-body text-sm focus:outline-none focus:border-primary transition-colors"
                    placeholder="Enquiry about packages"
                  />
                </div>
                <div>
                  <label className="block font-body text-xs uppercase tracking-wider text-gray-600 mb-1.5">
                    Message *
                  </label>
                  <textarea
                    name="message" value={form.message} onChange={handleChange} required rows={6}
                    className="w-full border border-gray-200 px-4 py-3 font-body text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                    placeholder="Tell us about your dream Himachal trip, dates, number of travelers, and any special requirements..."
                  />
                </div>
                {error && <p className="text-red-500 text-sm font-body">{error}</p>}
                <button
                  type="submit" disabled={loading}
                  className="w-full bg-primary text-white py-4 font-body tracking-widest uppercase text-sm hover:bg-accent transition-colors duration-300 disabled:opacity-60"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>

          {/* Office Info */}
          <div>
            <p className="font-accent text-accent italic text-lg mb-2">Our Offices</p>
            <h2 className="font-display text-3xl text-primary mb-8">Find Us Here</h2>

            <div className="space-y-6 mb-10">
              {officeInfo.map((info) => (
                <div key={info.label} className="flex gap-4">
                  <span className="text-2xl flex-shrink-0 mt-0.5">{info.icon}</span>
                  <div>
                    <p className="font-body text-xs text-gray-500 uppercase tracking-wider mb-1">{info.label}</p>
                    <p className="font-body text-gray-800 leading-relaxed whitespace-pre-line">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Map Placeholder */}
            <div
              className="w-full h-64 relative overflow-hidden"
              style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute inset-0 bg-primary/60 flex items-center justify-center">
                <div className="text-center text-white">
                  <p className="text-4xl mb-2">📍</p>
                  <p className="font-display text-xl">MANALI, Himachal Pradesh</p>
                  <p className="font-body text-sm text-white/80 mt-1">MANALI, 171001</p>
                </div>
              </div>
            </div>

            {/* Quick Response Note */}
            <div className="mt-6 bg-cream-dark border-l-4 border-accent p-5">
              <p className="font-display text-lg text-primary mb-1">Quick Response Guarantee</p>
              <p className="font-body text-sm text-gray-700 leading-relaxed">
                We respond to all enquiries within 24 hours during working days. 
                For urgent booking assistance, please call us directly on our WhatsApp number.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
