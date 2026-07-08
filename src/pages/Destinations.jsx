import { useEffect, useState } from 'react';
import { fetchDestinations } from '../api';

const staticDestinations = [
  {
    _id: '1',
    name: 'Shimla',
    region: 'Southern Himachal',
    altitude: '2200m',
    rating: '4.8',
    description: 'The "Queen of Hills", Shimla is Himachal Pradesh\'s capital and a colonial-era hill station perched at 2,200m. Its mall road, Viceregal Lodge, and pine forests make it iconic. The town blends British heritage with Himalayan charm — toy trains, wooden chalets, and panoramic snow peaks.',
    image: 'https://plus.unsplash.com/premium_photo-1697730487072-c7c29e113007?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aGltYWNoYWwlMjBwcmFkZXNoJTIwc2hpbWxhfGVufDB8fDB8fHww',
    isPopular: true,
  },
  {
    _id: '2',
    name: 'Manali',
    region: 'Kullu Valley',
    description: 'Nestled in the Beas River Valley at 2,050m, Manali is the adventure capital of Himachal. From the ancient Hadimba Temple to Rohtang Pass, Manali offers paragliding, skiing, trekking, and river rafting against a dramatic backdrop of snow-capped peaks.',
    image: 'https://images.unsplash.com/photo-1678261151315-887e2dd253e8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTY1fHxoaW1hY2hhbCUyMHByYWRlc2h8ZW58MHx8MHx8fDA%3D',
    isPopular: true,
  },
  {
    _id: '3',
    name: 'Dharamshala',
    region: 'Kangra Valley',
    description: 'Home to the Dalai Lama and the Tibetan government-in-exile, Dharamshala sits at the foothills of the Dhauladhar range. McLeod Ganj is a vibrant mix of Buddhist monasteries, backpacker cafés, and mountain trails.',
    image: 'https://images.unsplash.com/photo-1622225074638-1d80c0388697?q=80&w=1086&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    isPopular: true,
  },
  {
    _id: '4',
    name: 'Spiti Valley',
    region: 'Cold Desert',
    description: 'Spiti is a cold desert mountain valley at 3,800m — raw, remote, and utterly otherworldly. The ancient Key Monastery perches on a cliff, the villages of Kibber and Langza sit above the clouds, and the fossil beds reveal prehistoric seas.',
    image: 'https://images.unsplash.com/photo-1680729962018-86ae6ba260e8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzU5fHxoaW1hY2hhbCUyMHByYWRlc2h8ZW58MHx8MHx8fDA%3D',
    isPopular: true,
  },
  {
    _id: '5',
    name: 'Kasol',
    region: 'Parvati Valley',
    description: 'A tiny hamlet along the Parvati River, Kasol has become the trekker\'s paradise and "Mini Israel" of India. Dense deodar forests, the pilgrim town of Manikaran with its hot springs, and the challenging Kheerganga trek make it a beloved escape.',
    image: 'https://images.unsplash.com/photo-1716746021360-3081b62f4f15?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzYzfHxoaW1hY2hhbCUyMHByYWRlc2h8ZW58MHx8MHx8fDA%3D',
    isPopular: false,
  },
  {
    _id: '6',
    name: 'Kullu',
    region: 'Kullu Valley',
    description: 'Known as the "Valley of Gods," Kullu offers apple orchards, river rafting on the Beas, and easy access to the Great Himalayan National Park. Its traditional wooden temples and weekly bazaars are a cultural highlight.',
    image: 'https://images.unsplash.com/photo-1609948545248-b4f2b2054f15?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjI2fHxoaW1hY2hhbCUyMHByYWRlc2h8ZW58MHx8MHx8fDA%3D',
    isPopular: false,
  },
  {
    _id: '7',
    name: 'Rohtang Pass',
    region: 'Kullu District',
    description: 'At nearly 4,000m, Rohtang Pass connects the Kullu Valley with the Lahaul–Spiti region. The high‑altitude road is snow‑bound for much of the year and offers stunning vistas, snow activities, and a sense of remote Himalayan wilderness.',
    image: 'https://images.unsplash.com/photo-1642693411901-804bb310c6da?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fGhpbWFjaGFsJTIwcHJhZGVzaHxlbnwwfHwwfHx8MA%3D%3D',
    isPopular: true,
  },
  {
    _id: '8',
    name: 'Chamba',
    region: 'Pangi Valley',
    description: 'Chamba is a lesser-known jewel with medieval temples, the Bhuri Singh Museum, and the sacred Ravi River. Surrounded by high ridges, it is a great base for trekking and experiencing Himachali folk festivals.',
    image: 'https://images.unsplash.com/photo-1672844804274-a3871f6e75b2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjM4fHxoaW1hY2hhbCUyMHByYWRlc2h8ZW58MHx8MHx8fDA%3D',
    isPopular: false,
  },
  {
    _id: '9',
    name: 'Kinnaur',
    region: 'Kinnaur District',
    description: 'Kinnaur is known for its dramatic landscapes, apple orchards, and the sacred Kinner Kailash range. Villages like Kalpa and Sangla offer breathtaking views of snow peaks and traditional wooden houses.',
    image: 'https://images.unsplash.com/photo-1608723451450-6fe11e0aa857',
    isPopular: true,
  },

  {
    _id: '10',
    name: 'Tirthan Valley',
    region: 'Kullu District',
    description: 'Tirthan Valley is a hidden paradise near the Great Himalayan National Park. It offers crystal-clear rivers, peaceful villages, trout fishing, and untouched natural beauty away from crowds.',
    image: 'https://images.unsplash.com/photo-1529251709126-13669520d1fa?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8VGlydGhhbiUyMFZhbGxleXxlbnwwfHwwfHx8MA%3D%3D',
    isPopular: false,
  },

  {
    _id: '11',
    name: 'Dalhousie',
    region: 'Chamba District',
    description: 'Dalhousie is a charming hill station with colonial architecture, pine forests, and panoramic mountain views. Nearby Khajjiar, known as Mini Switzerland, adds to its beauty.',
    image: 'https://images.unsplash.com/photo-1714381638889-63f8c626d85c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fERhbGhvdXNpZXxlbnwwfHwwfHx8MA%3D%3D',
    isPopular: true,
  },

  {
    _id: '12',
    name: 'Khajjiar',
    region: 'Chamba District',
    description: 'Khajjiar is a scenic meadow surrounded by dense forests and snow-clad mountains. Often called Mini Switzerland of India, it is ideal for nature lovers and peaceful retreats.',
    image: 'https://images.unsplash.com/photo-1589702413183-ca141958b7c5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8S2hhamppYXJ8ZW58MHx8MHx8fDA%3D',
    isPopular: true,
  },

  {
    _id: '13',
    name: 'Palampur',
    region: 'Kangra District',
    description: 'Palampur is famous for its lush tea gardens, pleasant climate, and stunning views of the Dhauladhar range. It offers a peaceful escape with rich natural beauty.',
    image: 'https://images.unsplash.com/photo-1774766860883-40d4daa21d55?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fFBhbGFtcHVyfGVufDB8fDB8fHww',
    isPopular: false,
  },

  {
    _id: '14',
    name: 'Bir Billing',
    region: 'Kangra District',
    description: 'Bir Billing is the paragliding capital of India, attracting adventure seekers from around the world. It also offers monasteries, cafes, and scenic landscapes.',
    image: 'https://images.unsplash.com/photo-1620720970374-5b7e67e1e610?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QmlyJTIwQmlsbGluZ3xlbnwwfHwwfHx8MA%3D%3D',
    isPopular: true,
  },
  {
    _id: '15',
    name: 'Chitkul',
    region: 'Kinnaur District',
    description: 'Chitkul is the last inhabited village near the Indo-Tibet border. Located on the banks of the Baspa River, it offers breathtaking landscapes and a peaceful atmosphere.',
    image: 'https://images.unsplash.com/photo-1716128033373-60b172383931?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Q2hpdGt1bHxlbnwwfHwwfHx8MA%3D%3D',
    isPopular: true,
  },

];

export default function Destinations() {
  const [destinations, setDestinations] = useState(staticDestinations);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchDestinations()
      .then((data) => { if (data.length) setDestinations(data); })
      .catch(() => { });
  }, []);

  const filtered = filter === 'popular' ? destinations.filter((d) => d.isPopular) : destinations;

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
          <p className="font-accent text-accent-light italic text-lg mb-1">Explore Himachal</p>
          <h1 className="font-display text-5xl md:text-6xl text-white">Destinations</h1>
        </div>
      </div>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Filters */}
        <div className="flex items-center gap-4 mb-10">
          <span className="font-body text-sm text-gray-500 uppercase tracking-wider">Filter:</span>
          {(['all', 'popular']).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2 text-sm font-body tracking-wider uppercase transition-all duration-300 ${filter === f ? 'bg-primary text-white' : 'border border-primary text-primary hover:bg-primary hover:text-white'
                }`}
            >
              {f === 'all' ? 'All Destinations' : 'Popular'}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((d) => (
            <div
              key={d._id}
              className="bg-white shadow-md hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 overflow-hidden group"
            > <div className="relative h-60 overflow-hidden">
                <img
                  src={d.image}
                  alt={d.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-4 left-4 flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs">
                    🏔️ {d.altitude}
                  </span>

                  <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs">
                    ⭐ {d.rating}
                  </span>
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                {d.isPopular && (
                  <div className="absolute top-3 right-3 bg-accent text-white text-xs px-2 py-1 font-body tracking-wider uppercase">
                    Popular
                  </div>
                )}
              </div>
              <div className="p-6">
                <p className="font-accent text-accent italic text-sm mb-1">{d.region}</p>
                <h3 className="font-display text-2xl text-primary mb-3">{d.name}</h3>
                <p className="font-body text-gray-600 text-sm leading-relaxed">{d.description}</p>
                <div className="mt-5 pt-4 border-t border-gray-100">
                  <a
                    href="/packages"
                    className="font-body text-sm text-primary hover:text-accent transition-colors tracking-wider uppercase"
                  >
                    View Packages →
                  </a>
                </div>

              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
