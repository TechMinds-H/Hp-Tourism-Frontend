import { useEffect, useState } from 'react';
import { fetchBlogs } from '../api';

const staticBlogs = [
  {
    _id: '1',
    title: 'Crossing Rohtang Pass: A Journey Above the Clouds',
    excerpt: 'At 3,978 metres, Rohtang Pass is not just a mountain crossing — it is a threshold between worlds. On one side, the lush Kullu Valley; on the other, the stark moonscape of Lahaul.',
    content: '',
    thumbnail: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',    author: 'Nitish Jaswal',
    publishedAt: '2024-09-15T00:00:00Z',
  },
  {
    _id: '2',
    title: 'Living Like a Monk: A Week in Spiti Valley',
    excerpt: "Spiti does not ease you in. The road from Shimla climbs relentlessly for two days, through Kinnaur's apple orchards and into a landscape that looks like another planet.",
    content: '',
    thumbnail: 'https://images.unsplash.com/photo-1609961245797-9cc9231012d8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhpbWFjaGFsJTIwcHJhZGVzaCUyMGthc29sfGVufDB8fDB8fHww',
    author: 'Priya Nair',
    publishedAt: '2024-10-02T00:00:00Z',
  },
  {
    _id: '3',
    title: 'The Triund Trek: Dharamshala\'s Most Rewarding Day Hike',
    excerpt: 'From McLeod Ganj to Triund is only 9 kilometres, but those kilometres rise 900 metres through rhododendron forests and pine groves to a ridge with one of the finest views in Himachal.',
    content: '',
    thumbnail: 'https://images.unsplash.com/photo-1620684979162-e8ffbb2fd462?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGltYWNoYWwlMjBwcmFkZXNoJTIwdHJpdW5kfGVufDB8fDB8fHww',
    author: 'Riya Kapoor',
    publishedAt: '2024-11-10T00:00:00Z',
  },
  {
    _id: '4',
    title: 'Apple Country: Autumn in the Kinnaur Valley',
    excerpt: 'In October, the Kinnaur Valley transforms into a painter\'s dream. Orchards heavy with red apples line the roadside, and the Kinner Kailash range glows in the golden afternoon light.',
    content: '',
    thumbnail: 'https://plus.unsplash.com/premium_photo-1661930516466-04ffc555c510?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aGltYWNoYWwlMjBwcmFkZXNoJTIwa2lubmF1cnxlbnwwfHwwfHx8MA%3D%3D',
    author: 'Vikram Mehta',
    publishedAt: '2024-10-25T00:00:00Z',
  },
  {
    _id: '5',
    title: 'Test Apple Country: Autumn in the Kinnaur Valley',
    excerpt: 'In October, the Kinnaur Valley transforms into a painter\'s dream. Orchards heavy with red apples line the roadside, and the Kinner Kailash range glows in the golden afternoon light.',
    content: '',
    thumbnail: 'https://media.istockphoto.com/id/1356011772/photo/the-most-dangerous-road-in-the-himalayas.webp?a=1&b=1&s=612x612&w=0&k=20&c=cYMaHRyhvaAF9L2jJcbLHQPnT-C8ttx6nZDB88YuW90=',
    author: 'Vikram Mehta',
    publishedAt: '2024-10-25T00:00:00Z',
  },
  {
  _id: '6',
  title: 'Kinner Kailash Trek: A Spiritual Yet Dangerous Journey',
  excerpt: 'Kinner Kailash trek is one of the toughest and most dangerous treks in Himachal Pradesh, known for its steep climbs and spiritual significance.',
  content: '',
  thumbnail: 'https://images.unsplash.com/photo-1734375869167-c2144891c518?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8a2lubmVyJTIwa2FpbGFzaCUyMHRyZWslMjBoaW1hY2hhbHxlbnwwfHwwfHx8MA%3D%3D',
  author: 'Nitish Jaswal',
  publishedAt: '2024-11-15T00:00:00Z',
},
{
  _id: '7',
  title: 'Pin Parvati Pass Trek: Extreme Adventure in the Himalayas',
  excerpt: 'This high-altitude trek connects Kullu to Spiti and involves glacier crossings, making it one of the most challenging treks in India.',
  content: '',
  thumbnail: 'https://images.unsplash.com/photo-1666545384591-7839f3259548?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHBpbiUyMHBhcnZhdGklMjB0cmVrJTIwaGltYWNoYWx8ZW58MHx8MHx8fDA%3D',
  author: 'Aman Verma',
  publishedAt: '2024-11-20T00:00:00Z',
},
{
  _id: '8',
  title: 'Indrahar Pass Trek: Gateway to the Dhauladhar Range',
  excerpt: 'Indrahar Pass trek offers breathtaking views of the Dhauladhar mountains but comes with unpredictable weather conditions.',
  content: '',
  thumbnail: 'https://media.istockphoto.com/id/1368606047/photo/nature-landscape-blue-sky.webp?a=1&b=1&s=612x612&w=0&k=20&c=WkB544fI6r3k7fE3J-8Tt_pFHm043wEjFp80-SyPvw4=',
  author: 'Rohit Sharma',
  publishedAt: '2024-12-01T00:00:00Z',
},
{
  _id: '9',
  title: 'Hampta Pass Trek: The Perfect Crossover Adventure',
  excerpt: 'Hampta Pass trek is famous for its dramatic landscape changes from lush green valleys to barren Spiti terrain.',
  content: '',
  thumbnail: 'https://plus.unsplash.com/premium_photo-1749548851356-7bf22a3c4531?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aGFtcHRhJTIwcGFzcyUyMHRyZWt8ZW58MHx8MHx8fDA%3D',
  author: 'Sneha Gupta',
  publishedAt: '2024-12-05T00:00:00Z',
},
];

export default function Blog() {
  const [blogs, setBlogs] = useState(staticBlogs);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchBlogs()
      .then((data) => { if (data.length) setBlogs(data); })
      .catch(() => {});
  }, []);

  const formatDate = (d) =>
    new Date(d).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div>
      {/* Hero Banner */}
      <div
        className="relative h-64 md:h-80 flex items-end pb-12 px-6"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/30" />
        <div className="relative max-w-7xl mx-auto w-full">
          <p className="font-accent text-accent-light italic text-lg mb-1">Stories From The Mountains</p>
          <h1 className="font-display text-5xl md:text-6xl text-white">Travel Blog</h1>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
          {blogs.map((blog) => (
            <article
              key={blog._id}
              className="bg-white shadow-md hover:shadow-xl transition-all duration-300 group overflow-hidden cursor-pointer"
              onClick={() => setSelected(blog)}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={blog.thumbnail}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-7">
                <div className="flex items-center gap-4 mb-3">
                  <span className="font-body text-xs text-accent uppercase tracking-wider">{blog.author}</span>
                  <span className="text-gray-300">|</span>
                  <span className="font-body text-xs text-gray-500">{formatDate(blog.publishedAt)}</span>
                </div>
                <h3 className="font-display text-2xl text-primary mb-3 group-hover:text-accent transition-colors duration-300">
                  {blog.title}
                </h3>
                <p className="font-body text-gray-600 text-sm leading-relaxed">{blog.excerpt}</p>
                <div className="mt-5 pt-4 border-t border-gray-100">
                  <span className="font-body text-sm text-primary hover:text-accent transition-colors tracking-wider uppercase">
                    Read More →
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Blog Modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-start justify-center p-4 overflow-y-auto"
          onClick={(e) => { if (e.target === e.currentTarget) setSelected(null); }}
        >
          <div className="bg-white max-w-3xl w-full my-8 relative">
            <img src={selected.thumbnail} alt={selected.title} className="w-full h-72 object-cover" />
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 bg-black/50 text-white w-10 h-10 flex items-center justify-center text-2xl hover:bg-black transition-colors"
            >
              ×
            </button>
            <div className="p-8">
              <div className="flex items-center gap-4 mb-4">
                <span className="font-body text-sm text-accent uppercase tracking-wider">{selected.author}</span>
                <span className="text-gray-300">|</span>
                <span className="font-body text-sm text-gray-500">{new Date(selected.publishedAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <h2 className="font-display text-3xl text-primary mb-6">{selected.title}</h2>
              <p className="font-body text-gray-700 leading-relaxed text-lg">
                {selected.content || selected.excerpt}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
