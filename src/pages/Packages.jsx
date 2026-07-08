import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import { fetchPackages, submitApplication } from '../api';


const staticPackages = [
  {
    _id: '1',
    name: 'Himalayan Grand Circuit',
    duration: '10 Nights / 11 Days',
    price: 45000,
    highlights: [
      'Shimla colonial walk & heritage train ride',
      'Manali Rohtang Pass snow experience',
      'Spiti Valley monastery circuit',
      'Dharamshala Triund sunrise trek',
      'River rafting in Kullu',
    ],
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80',
    type: 'scenic',
  },
  {
    _id: '2',
    name: 'Spiti Adventure Expedition',
    duration: '7 Nights / 8 Days',
    price: 32000,
    highlights: [
      'Key Monastery & Kibber village exploration',
      'Chandratal Lake camping',
      'Pin Valley National Park wildlife spotting',
      'Fossil hunting at Langza',
      'High altitude camping at 4,500m',
    ],
    image: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=800&q=80?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fGhpbWFjaGFsJTIwcHJhZGVzaHxlbnwwfHwwfHx8MA%3D%3D',
    type: 'adventure',
  },
  {
    _id: '3',
    name: 'Parvati Valley Serenity',
    duration: '5 Nights / 6 Days',
    price: 18500,
    highlights: [
      'Kasol riverside camping',
      'Kheerganga hot spring trek',
      'Manikaran Gurudwara spiritual visit',
      'Chalal village nature walk',
      'Local Himachali cuisine experience',
    ],
    image: 'https://plus.unsplash.com/photo-1591017403286-fd8493524e1e?w=800&q=80-8844637b400e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    type: 'cultural',
  },
  {
    _id: '4',
    name: 'Shimla Heritage Walk',
    duration: '4 Nights / 5 Days',
    price: 22000,
    highlights: [
      'Mall Road evening stroll',
      'Viceregal Lodge tour',
      'Toy train ride to Kalka',
      'Jakhu Temple visit',
      'Local Himachali cuisine tasting',
    ],
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fGhpbWFjaGFsJTIwcHJhZGVzaHxlbnwwfHwwfHx8MA%3D%3D',
    type: 'cultural',
  },
  {
    _id: '5',
    name: 'Kullu River Rafting Challenge',
    duration: '3 Nights / 4 Days',
    price: 15000,
    highlights: [
      'White water rafting on Beas',
      'Campfire under the stars',
      'Visit Naggar Castle',
      'Local village walk',
      'Adventure sports in Solang Valley',
    ],
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    type: 'adventure',
  },
  {
    _id: '6',
    name: 'Dharamshala Yoga & Wellness',
    duration: '6 Nights / 7 Days',
    price: 26000,
    highlights: [
      'Daily yoga sessions in McLeod Ganj',
      'Meditation at Bhagsu waterfalls',
      'Visit to Dalai Lama temple',
      'Bhuti Kothi heritage walk',
      'Organic Himachali meals',
    ],
    image: 'https://plus.unsplash.com/photo-1593693397690-362cb9666fc2?w=800&q=80-40448c8042fb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDl8fGhpbWFjaGFsJTIwcHJhZGVzaHxlbnwwfHwwfHx8MA%3D%3D',
    type: 'spiritual',
  },
  {
    _id: '7',
    name: 'Spiti Photography Expedition',
    duration: '8 Nights / 9 Days',
    price: 38000,
    highlights: [
      'Sunrise at Chandratal lake',
      'Key Monastery golden hour',
      'Village homestays in Kibber',
      'Fossil hunting & landscape photography',
      'Night sky astrophotography',
    ],
    image: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=800&q=80?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTMxfHxoaW1hY2hhbCUyMHByYWRlc2h8ZW58MHx8MHx8fDA%3D',
    type: 'scenic',
  },
  {
    _id: '8',
    name: 'Chamba Heritage & Festivals',
    duration: '5 Nights / 6 Days',
    price: 20000,
    highlights: [
      'Bhuri Singh Museum tour',
      'Visit Laxmi Narayan Temple',
      'Ravi River bank picnic',
      'Attend local folk festival',
      'Trekking to Khajjiar meadow',
    ],
    image: 'https://images.unsplash.com/photo-1580654843061-8c90a9bc1cb8?w=800&q=80?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTg3fHxoaW1hY2hhbCUyMHByYWRlc2h8ZW58MHx8MHx8fDA%3D',
    type: 'cultural',
  },
  {
    _id: '9',
    name: 'Rohtang Snow Adventure',
    duration: '2 Nights / 3 Days',
    price: 18000,
    highlights: [
      'Snow sledding at Rohtang',
      'Visit Solang Valley',
      'Snowman building workshop',
      'Jeep ride to Rahala Falls',
      'Snowshoe trekking',
    ],
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjc2fHxoaW1hY2hhbCUyMHByYWRlc2h8ZW58MHx8MHx8fDA%3D',
    type: 'adventure',
  },
  {
    _id: '10',
    name: 'Parvati Valley Yoga Retreat',
    duration: '7 Nights / 8 Days',
    price: 30000,
    highlights: [
      'Daily yoga by the Parvati River',
      'Kheerganga hot springs soak',
      'Holistic Ayurvedic treatments',
      'Riverside camping',
      'Visit Manikaran Gurudwara',
    ],
    image: 'https://images.unsplash.com/photo-1591017403286-fd8493524e1e?w=800&q=80?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDQ4fHxoaW1hY2hhbCUyMHByYWRlc2h8ZW58MHx8MHx8fDA%3D',
    type: 'spiritual',
  },
  {
    _id: '11',
    name: 'Kangra Fort Explorer',
    duration: '3 Nights / 4 Days',
    price: 17000,
    highlights: [
      'Guided tour of Kangra Fort',
      'Tea garden walk in Palampur',
      'Local pottery workshop',
      'Ancient temples visit',
      'Sunset at Bajreshwari Devi Temple',
    ],
    image: 'https://media.istockphoto.com/id/photo-1567157577867-05ccb1388e66?w=800&q=80.webp?a=1&b=1&s=612x612&w=0&k=20&c=bwlg_Q8CwbYdlwGdNYHsK68j7Ky_91eUgLLP0z1Tto4=',
    type: 'cultural',
  },
  {
    _id: '12',
    name: 'Great Himalayan Trek',
    duration: '12 Nights / 13 Days',
    price: 60000,
    highlights: [
      'Hike through Great Himalayan National Park',
      'Camping at waterfalls',
      'Wildlife spotting (snow leopards, ibex)',
      'Visit Raison village',
      'Magical sunset at Sainj valley',
    ],
    image: 'https://images.unsplash.com/photo-1549954145-85bdb07f685b?w=800&q=80?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGltYWNoYWwlMjBwcmFkZXNofGVufDB8fDB8fHww',
    type: 'adventure',
  },
  {
    _id: '13',
    name: 'Apple Orchard Experience',
    duration: '4 Nights / 5 Days',
    price: 19000,
    highlights: [
      'Apple picking in Kullu',
      'Visit to local orchards',
      'Homemade apple cider tasting',
      'Mehndipur Balaji Temple visit',
      'Traditional Himachali cooking class',
    ],
    image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=800&q=80?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aGltYWNoYWwlMjBwcmFkZXNofGVufDB8fDB8fHww',
    type: 'scenic',
  },

  {
    _id: '14',
    name: 'Yulla kanda trek',
    duration: '4 Nights / 5 Days',
    price: 50000 ,
    highlights: [
      'world highest krishna temple',
      'Visit to local orchards',
      'Homemade apple cider tasting',
      'yulla kanda lake visit',
      'Traditional Himachali cooking class',
    ],
    image: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=800&q=80&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8a2lubmF1cnxlbnwwfHwwfHx8MA%3D%3D',
    type: 'scenic',
  },

  {
    _id: '15',
    name: 'Bilaspur heritage tour',
    duration: '2Nights / 4 Days',
    price: 29000 ,
    highlights: [
      'Gobind Sagar Lake',
      'Naina Devi Temple',
      'Bhakra Dam',
      'Luhri and Barot Valleys',
      'Trek to Kandrour Bridge Viewpoint',
    ],
    image: 'https://media.istockphoto.com/id/photo-1626621341517-bbf3d9990a23?w=800&q=80-in-the-himalayan-foothills.webp?a=1&b=1&s=612x612&w=0&k=20&c=GcnZmXfNBdtGS0EOEiOQehaKbMhOrX2VlPBK6oXQc0s=',
    type: 'cultural',
  },
 {
    _id: '16',
    name: '“Exploring Mandi: Land of Temples and Natural Beauty”',
    duration: '5 Nights /  7 Days',
    price: 42000 ,
    highlights: [
      'Sunken Garden (Indira Market Plaza) ',
      'Barot Village',
      'Rewalsar Lake (Lotus Lake)',
      'Temples of Mandi (Bhimakali, Triloknath, Panchvaktra)',
      'Jalori Pass',
    ],
    image: 'https://media.istockphoto.com/id/photo-1580654843061-8c90a9bc1cb8?w=800&q=80-temple-dedicated-to-hindu-god-lord-shiva-mandi-himachal-pradesh-india.webp?a=1&b=1&s=612x612&w=0&k=20&c=-fjb8NK9on2VsdiwxBuRc8EPmajkmyN8w-BPUNG3QNM=',
    type: 'cultural',
  },
  {
    _id: '17',
    name: '“Exploring Hamirpur: Education Hub and Cultural Heritage”',
    duration: '3 Nights /  4 Days',
    price: 18000 ,
    highlights: [
      ' Awa Devi Temple (Jalpa Devi) ',
      'Sujanpur Fort & Ground',
      'Naduan Town (Beas River)',
      'Gasota Mahadev Temple',
      'Local markets and cuisine',
    ],
    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800&q=80?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aGltYWNoYWwlMjBoYW1pcnB1cnxlbnwwfHwwfHx8MA%3D%3D',
    type: 'cultural',
  },
  {
  _id: '18',
  name: 'Kinnaur Valley Exploration',
  duration: '6 Nights / 7 Days',
  price: 34000,
  highlights: [
    'Sangla Valley visit',
    'Kalpa village sunrise',
    'Kinner Kailash view',
    'Apple orchards',
    'Indo-Tibet Highway drive',
  ],
  image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80',
  type: 'scenic',
},

{
  _id: '19',
  name: 'Tirthan Valley Eco Tour',
  duration: '4 Nights / 5 Days',
  price: 21000,
  highlights: [
    'Great Himalayan National Park',
    'River side stay',
    'Trout fishing',
    'Waterfall trekking',
    'Village life experience',
  ],
  image: 'https://media.istockphoto.com/id/1213140570/photo/view-of-beautiful-pinus-wallichiana-trees-park-in-manali-himachal.webp?a=1&b=1&s=612x612&w=0&k=20&c=t8HIAqnb-P_NHmgRfoj-g1HwPoIf-a05REccBf2FGA0=',
  type: 'scenic',
},

{
  _id: '20',
  name: 'Dalhousie & Khajjiar Tour',
  duration: '4 Nights / 5 Days',
  price: 23000,
  highlights: [
    'Khajjiar meadow',
    'Panchpula waterfalls',
    'Dainkund peak',
    'Dalhousie churches',
    'Horse riding',
  ],
  image: 'https://images.unsplash.com/photo-1589702413183-ca141958b7c5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2hhamppYXIlMjBsYWtlfGVufDB8fDB8fHww',
  type: 'scenic',
},

{
  _id: '21',
  name: 'Lahaul Valley Scenic Tour',
  duration: '5 Nights / 6 Days',
  price: 36000,
  highlights: [
    'Atal Tunnel',
    'Sissu waterfall',
    'Keylong town',
    'Monastery visits',
    'Snow mountains',
  ],
  image: 'https://plus.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80-7ed3ed9b6d80?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8U2lzc3UlMjB3YXRlcmZhbGx8ZW58MHx8MHx8fDA%3D',
  type: 'scenic',
},

{
  _id: '22',
  name: 'Barot Valley Nature Tour',
  duration: '3 Nights / 4 Days',
  price: 16000,
  highlights: [
    'Uhl river',
    'Trout fishing',
    'Barot dam',
    'Trekking trails',
    'Peaceful stay',
  ],
  image: 'https://media.istockphoto.com/id/1191078079/photo/water-stream.webp?a=1&b=1&s=612x612&w=0&k=20&c=fW3s7wMTJJlenM1DnNcgBNS_R59k9zL9p4l7fpKElTA=',
  type: 'scenic',
},

{
  _id: '23',
  name: 'Shoja & Jalori Pass Tour',
  duration: '3 Nights / 4 Days',
  price: 18000,
  highlights: [
    'Jalori Pass',
    'Serolsar Lake trek',
    'Shoja village stay',
    'Dense forests',
    'Sunset viewpoints',
  ],
  image: 'https://media.istockphoto.com/id/2215523393/photo/mountain-landscape-with-blue-sky-and-clouds-himalayan-mountain-landscapes-are-a-favourite-for.webp?a=1&b=1&s=612x612&w=0&k=20&c=m_LX4KFOkUnNXkuXDNRNIqbmIWne5ch_zoNpE5yej78=',
  type: 'adventure',
},

{
  _id: '24',
  name: 'Chitkul & Sangla Valley Tour',
  duration: '5 Nights / 6 Days',
  price: 28000,
  highlights: [
    'Chitkul village',
    'Baspa river',
    'Wooden houses',
    'Mountain views',
    'Local culture',
  ],
  image: 'https://images.unsplash.com/photo-1731161780839-915e1503b715?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Q2hpdGt1bCUyMCUyNiUyMFNhbmdsYSUyMFZhbGxleSUyMFRvdXJ8ZW58MHx8MHx8fDA%3D',
  type: 'scenic',
},

{
  _id: '25',
  name: 'Kangra Valley Complete Tour',
  duration: '5 Nights / 6 Days',
  price: 25000,
  highlights: [
    'Kangra Fort',
    'Tea gardens',
    'Dharamshala',
    'McLeod Ganj',
    'Temple visits',
  ],
  image: 'https://media.istockphoto.com/id/1491302904/photo/aerial-view-of-dharamshala-of-himachal-pradesh-surrounded-by-cedar-forests-and-dhauladhar.webp?a=1&b=1&s=612x612&w=0&k=20&c=MD4ELY_mYm3Q2Lsq7P1WDT2lOyh5-jYujc61HZHeAHA=',
  type: 'cultural',
},

{
  _id: '26',
  name: 'Palampur Tea Garden Tour',
  duration: '3 Nights / 4 Days',
  price: 17000,
  highlights: [
    'Tea estates',
    'Baijnath temple',
    'Dhauladhar views',
    'Village walk',
    'Nature stay',
  ],
  image: 'https://media.istockphoto.com/id/2228664549/photo/tea-plants-in-tea-garden-natural-and-pure.webp?a=1&b=1&s=612x612&w=0&k=20&c=MDJ9IjdA_uRvNDpLg3GMAw-9R2V1AOsKSqoszq1FkeU=',
  type: 'cultural',
},

{
  _id: '27',
  name: 'Spiti Winter Snow Tour',
  duration: '7 Nights / 8 Days',
  price: 40000,
  highlights: [
    'Frozen Spiti river',
    'Snow villages',
    'Monastery visits',
    'Winter landscapes',
    'Unique experience',
  ],
  image: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=800&q=80?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fFNwaXRpJTIwV2ludGVyJTIwU25vdyUyMFRvdXJ8ZW58MHx8MHx8fDA%3D',
  type: 'adventure',
},

];

const typeColors = {
  adventure: 'bg-red-100 text-red-700 border-red-200',
  cultural: 'bg-purple-100 text-purple-700 border-purple-200',
  scenic: 'bg-green-100 text-green-700 border-green-200',
  spiritual: 'bg-amber-100 text-amber-700 border-amber-200',
};

const defaultForm = {
  name: '', email: '', phone: '', travelDate: '',
  people: 1, message: '', packageName: '',
};

export default function Packages() {
  const { user } = useAuth();
  const [savedPackages, setSavedPackages] = useState([]);
  const handleSavePackage = async (packageId) => {
    try {
      const { data } = await axios.post(`/api/user/save/${packageId}`);

      if (data.saved) {
        alert('Package saved ❤️');
      } else {
        alert('Package removed');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to save package');
    }
  };
  const [packages, setPackages] = useState(staticPackages);
  const [selectedPkg, setSelectedPkg] = useState(null);
  const [form, setForm] = useState(defaultForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  

  useEffect(() => {
    fetchPackages()
      .then((data) => { if (data.length) setPackages(data); })
      .catch(() => {});
  }, []);

  const openForm = (pkg) => {
    setSelectedPkg(pkg);
    setForm({ ...defaultForm, packageName: pkg.name });
    setSuccess(false);
    setError('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: name === 'people' ? parseInt(value) || 1 : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await submitApplication(form);
      setSuccess(true);
      setForm(defaultForm);
    } catch {
      setError('Something went wrong. Please try again or contact us directly.');
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
          <p className="font-accent text-accent-light italic text-lg mb-1">Plan Your Trip</p>
          <h1 className="font-display text-5xl md:text-6xl text-white">Tour Packages</h1>
        </div>
      </div>

      {/* Packages Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <div key={pkg._id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
              <div className="relative h-56 overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className={`text-xs font-body px-2 py-1 uppercase tracking-wider border ${typeColors[pkg.type] || 'bg-gray-100 text-gray-700'}`}>
                    {pkg.type}
                  </span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-display text-xl text-primary mb-1">{pkg.name}</h3>
                <p className="font-body text-sm text-gray-500 mb-4 flex items-center gap-2">
                  <span className="text-accent">🕐</span> {pkg.duration}
                </p>
                <div className="flex-1">
                  <p className="font-body text-xs text-gray-500 uppercase tracking-wider mb-2">Package Highlights</p>
                  <ul className="space-y-1.5">
                    {pkg.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 font-body text-sm text-gray-700">
                        <span className="text-accent mt-0.5 flex-shrink-0">✓</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-between">
  <div>
    <p className="font-body text-xs text-gray-500 uppercase tracking-wider">
      Per person from
    </p>
    <p className="font-display text-2xl text-primary">
      ₹{pkg.price.toLocaleString('en-IN')}
    </p>
  </div>

  <div className="flex gap-2">
    <button
      onClick={() => openForm(pkg)}
      className="
      bg-gradient-to-r
      from-yellow-600
      to-yellow-400
      text-white rounded-full shadow-md hover:scale-105 transition-all duration-300 px-5 py-2.5 text-sm font-body tracking-wider uppercase "
    >
      Apply Now
    </button>

    {user && (
      <button
        onClick={() => handleSavePackage(pkg._id)}
        className="border border-pink-300 text-pink-500 px-2 py-3 rounded-full shadow-md hover:scale-105 transition-all duration-300 text-sm font-body tracking-wider uppercase hover:text-pink-600 "      >
        ❤️ Save
      </button>
    )}
  </div>
</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Apply Form Modal */}
      {selectedPkg && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setSelectedPkg(null); }}
        >
          <div className="bg-white max-w-lg w-full max-h-[90vh] overflow-y-auto relative">
            <div className="bg-primary px-6 py-5 flex items-start justify-between">
              <div>
                <p className="font-accent text-accent italic text-sm">Booking Application</p>
                <h3 className="font-display text-2xl text-white">{selectedPkg.name}</h3>
              </div>
              <button
                onClick={() => setSelectedPkg(null)}
                className="text-white/80 hover:text-white text-2xl leading-none ml-4"
              >
                ×
              </button>
            </div>

            <div className="p-6">
              {success ? (
                <div className="text-center py-10">
                  <div className="text-5xl mb-4">🎉</div>
                  <h4 className="font-display text-2xl text-primary mb-2">Application Submitted!</h4>
                  <p className="font-body text-gray-600 leading-relaxed mb-6">
                    Thank you for your interest. Our travel expert will contact you within 24 hours to confirm your booking and discuss customizations.
                  </p>
                  <button
                    onClick={() => setSelectedPkg(null)}
                    className="bg-primary text-white px-6 py-3 font-body tracking-wider uppercase text-sm"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-body text-xs uppercase tracking-wider text-gray-600 mb-1">Full Name *</label>
                      <input
                        type="text" name="name" value={form.name} onChange={handleChange} required
                        className="w-full border border-gray-200 px-3 py-2.5 font-body text-sm focus:outline-none focus:border-primary"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block font-body text-xs uppercase tracking-wider text-gray-600 mb-1">Email *</label>
                      <input
                        type="email" name="email" value={form.email} onChange={handleChange} required
                        className="w-full border border-gray-200 px-3 py-2.5 font-body text-sm focus:outline-none focus:border-primary"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-body text-xs uppercase tracking-wider text-gray-600 mb-1">Phone *</label>
                      <input
                        type="tel" name="phone" value={form.phone} onChange={handleChange} required
                        className="w-full border border-gray-200 px-3 py-2.5 font-body text-sm focus:outline-none focus:border-primary"
                        placeholder="+91 98000 00000"
                      />
                    </div>
                    <div>
                      <label className="block font-body text-xs uppercase tracking-wider text-gray-600 mb-1">Number of People *</label>
                      <input
                        type="number" name="people" value={form.people} onChange={handleChange} min={1} max={50} required
                        className="w-full border border-gray-200 px-3 py-2.5 font-body text-sm focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-body text-xs uppercase tracking-wider text-gray-600 mb-1">Preferred Travel Date *</label>
                    <input
                      type="date" name="travelDate" value={form.travelDate} onChange={handleChange} required
                      className="w-full border border-gray-200 px-3 py-2.5 font-body text-sm focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block font-body text-xs uppercase tracking-wider text-gray-600 mb-1">Message / Special Requests</label>
                    <textarea
                      name="message" value={form.message} onChange={handleChange} rows={3}
                      className="w-full border border-gray-200 px-3 py-2.5 font-body text-sm focus:outline-none focus:border-primary resize-none"
                      placeholder="Any special requirements, dietary preferences, or questions..."
                    />
                  </div>
                  {error && <p className="text-red-500 text-sm font-body">{error}</p>}
                  <button
                    type="submit" disabled={loading}
                    className="w-full bg-accent text-white py-3.5 font-body tracking-widest uppercase text-sm hover:bg-accent-dark transition-colors disabled:opacity-60"
                  >
                    {loading ? 'Submitting...' : 'Submit Application'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
