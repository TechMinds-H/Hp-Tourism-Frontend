import { useEffect, useState } from 'react';
import { fetchGallery } from '../api';

const staticGallery = [
  { _id: '1', imageUrl: 'https://images.unsplash.com/photo-1697116158425-c1c7b34f57d7?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c2hpbWxhJTIwbmF0dXJlfGVufDB8fDB8fHww', location: 'Shimla', category: 'nature' },
  { _id: '2', imageUrl: 'https://media.istockphoto.com/id/1288983064/photo/people-enjoying-snow-in-manali.jpg?s=612x612&w=0&k=20&c=9fK_oeK0HrKzcv_ByS5uwoO71nMG0S2mq54VJNsrdSM=', location: 'Spiti Valley', category: 'snow' },
  { _id: '3', imageUrl: 'https://plus.unsplash.com/premium_photo-1697729693552-40448c8042fb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDl8fGhpbWFjaGFsJTIwcHJhZGVzaHxlbnwwfHwwfHx8MA%3D%3D', location: 'Dharamshala', category: 'temples' },
  { _id: '4', imageUrl: 'https://images.unsplash.com/photo-1587623266208-c1784a7da10d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTZ8fGhpbWFjaGFsJTIwcHJhZGVzaHxlbnwwfHwwfHx8MA%3D%3D', location: 'Kasol', category: 'nature' },
  { _id: '5', imageUrl: 'https://images.unsplash.com/photo-1600947509785-29fb4e7d1362?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTB8fGhpbWFjaGFsJTIwcHJhZGVzaHxlbnwwfHwwfHx8MA%3D%3D', location: 'Manali', category: 'adventure' },
  { _id: '6', imageUrl: 'https://images.unsplash.com/photo-1650643615094-c436eb79e8a5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA2fHxoaW1hY2hhbCUyMHByYWRlc2h8ZW58MHx8MHx8fDA%3D', location: 'Kullu', category: 'culture' },
  { _id: '7', imageUrl: 'https://plus.unsplash.com/premium_photo-1673491311436-6f24588b2a51?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA5fHxoaW1hY2hhbCUyMHByYWRlc2h8ZW58MHx8MHx8fDA%3D', location: 'Rohtang Pass', category: 'snow' },
  { _id: '8', imageUrl: 'https://plus.unsplash.com/premium_photo-1661963698896-6ecc8afcf6fa?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTEzfHxoaW1hY2hhbCUyMHByYWRlc2h8ZW58MHx8MHx8fDA%3D', location: 'Himalayas', category: 'nature' },
  { _id: '9', imageUrl: 'https://images.unsplash.com/photo-1627625335607-60187d590493?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTIwfHxoaW1hY2hhbCUyMHByYWRlc2h8ZW58MHx8MHx8fDA%3D', location: 'Triund', category: 'adventure' },
  { _id: '10', imageUrl: 'https://images.unsplash.com/photo-1733553891841-a8b0a9fdadd7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTI3fHxoaW1hY2hhbCUyMHByYWRlc2h8ZW58MHx8MHx8fDA%3D', location: 'Kullu', category: 'culture' },
  { _id: '11', imageUrl: 'https://images.unsplash.com/photo-1552761814-7e3fd0b3aa86?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTQ1fHxoaW1hY2hhbCUyMHByYWRlc2h8ZW58MHx8MHx8fDA%3D', location: 'Rohtang Pass', category: 'snow' },
  { _id: '12', imageUrl: 'https://images.unsplash.com/photo-1667977557003-19e8c75f7192?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTU1fHxoaW1hY2hhbCUyMHByYWRlc2h8ZW58MHx8MHx8fDA%3D', location: 'Chamba', category: 'nature' },
  { _id: '13', imageUrl: 'https://media.istockphoto.com/id/1279673397/photo/mandi-town-aerial-view-in-india.jpg?s=2048x2048&w=is&k=20&c=xICp2JYlyy1HBKXiUgbfKnXoPgntb0q_aQBqByAd4VY=',location: 'Mandi', category: 'temples' },
  { _id: '14', imageUrl: 'https://media.istockphoto.com/id/1322194621/photo/rewalsar-buddhist-town-near-mandi-india.webp?a=1&b=1&s=612x612&w=0&k=20&c=6LctBdj77e9wLjAuwE8WAX3za1a9Q-tn2wQMfDQnqHI=',location: 'Rewalsar', category: 'temples' },
  { _id: '15', imageUrl: 'https://images.unsplash.com/photo-1645173098154-59b9a701b6a1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGhpbWFjaGFsJTIwc2hpbWxhfGVufDB8fDB8fHww', location: 'Shimla', category: 'temples' },
  ];

const categories = ['all', 'nature', 'snow', 'temples', 'adventure', 'culture'];

export default function Gallery() {
  const [images, setImages] = useState(staticGallery);
  const [category, setCategory] = useState('all');
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    fetchGallery()
      .then((data) => { if (data.length) setImages(data); })
      .catch(() => {});
  }, []);

  const filtered = category === 'all' ? images : images.filter((img) => img.category === category);

  return (
    <div>
      {/* Hero Banner */}
      <div
        className="relative h-64 md:h-80 flex items-end pb-12 px-6"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/30" />
        <div className="relative max-w-7xl mx-auto w-full">
          <p className="font-accent text-accent-light italic text-lg mb-1">Visual Himachal</p>
          <h1 className="font-display text-5xl md:text-6xl text-white">Gallery</h1>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Category Filter */}
        
        <div className="flex flex-wrap gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-5 py-2 text-sm font-body tracking-wider uppercase transition-all duration-300 capitalize ${
                category === cat ? 'bg-primary text-white' : 'border border-primary text-primary hover:bg-primary hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {filtered.map((img) => (
            <div
              key={img._id}
              className="break-inside-avoid cursor-pointer group relative overflow-hidden"
              onClick={() => setLightbox(img)}
            >
              <img
                src={img.imageUrl}
                alt={img.location}
                className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end">
                <div className="p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white font-display text-lg">{img.location}</p>
                  <p className="text-accent-light text-xs font-body uppercase tracking-wider capitalize">{img.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 text-white text-3xl hover:text-accent transition-colors"
            onClick={() => setLightbox(null)}
          >
            ×
          </button>
          <div className="max-w-4xl w-full">
            <img
              src={lightbox.imageUrl}
              alt={lightbox.location}
              className="w-full max-h-[80vh] object-contain"
            />
            <div className="text-center mt-4">
              <p className="font-display text-2xl text-white">{lightbox.location}</p>
              <p className="font-body text-accent text-sm uppercase tracking-wider capitalize">{lightbox.category}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
