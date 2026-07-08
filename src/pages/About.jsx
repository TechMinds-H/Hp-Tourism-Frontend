// const nitishImg = "/nitish.jpg";
// const nikhilImg = "/nikhil.jpeg";
// const divakarImg = "/DIVAKAR DUBEY.jpg";
const team = [
  {
    name: 'Harbhajan Singh',
    role: 'Founder & Chief Guide',
    // image: nitishImg,
    bio: 'Born in kangra, Harbhajan has developed deep knowledge of Himachal’s terrain through years of exploration, uncovering hidden trails, local culture, and scenic landscapes.',
  },
  // {
  //   name: 'Nikhil',
  //   role: 'Spiti & Lahaul Specialist',
  //   image: nikhilImg,
  //   bio: 'With a background in hospitality management, Nikhil ensures every trip runs like clockwork — from accommodation to emergency logistics.',
  // },
  // {
  //   name: 'Divakar Dubey',
  //   role: 'Head of Operations',
  //   image: divakarImg,
  //   bio: 'Divakar grew up in a Kibber village homestay. His intimate knowledge of Spiti culture and landscape is unmatched anywhere in the tourism industry.',
  // },
];

const values = [
  { icon: '🌿', title: 'Responsible Tourism', desc: 'We follow Leave No Trace principles, support local businesses, and contribute 2% of revenue to Himachal conservation projects.' },
  { icon: '🤝', title: 'Community First', desc: 'Our guides are local residents. Our homestays are family-run. Every rupee spent goes directly into the communities we visit.' },
  { icon: '🏔️', title: 'Authentic Experiences', desc: 'We reject cookie-cutter tourism. Every itinerary is crafted around genuine encounters with Himachal\'s landscapes and people.' },
];

export default function About() {
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
          <p className="font-accent text-accent-light italic text-lg mb-1">Our Story</p>
          <h1 className="font-display text-5xl md:text-6xl text-white">About Us</h1>
        </div>
      </div>

      {/* Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="font-accent text-accent italic text-lg mb-3">Since 2014</p>
            <h2 className="font-display text-4xl text-primary mb-6">Born from a Love<br />for These Mountains</h2>
            <div className="space-y-4 font-body text-gray-700 leading-relaxed">
              <p>
                Dev Bhoomi Tourism started with a single jeep and a dream. Rajesh Thakur, a Manali-born mountaineer, 
                watched foreign tourists miss the soul of Himachal while following generic tour group itineraries. 
                In 2014, he decided to do something about it.
              </p>
              <p>
                Today, we are a team of 15 passionate local experts who have collectively spent over 200 years 
                exploring every corner of Himachal Pradesh. We have led expeditions in -20°C Spiti winters, 
                camped under aurora-like Milky Ways in Chandratal, and shared butter tea with Dalai Lama's monks in Dharamshala.
              </p>
              <p>
                Our mission is simple: to help you experience Himachal Pradesh not as a tourist, 
                but as someone who genuinely belongs here — even if just for a week.
              </p>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80"
              alt="Shimla"
              className="w-full h-[420px] object-cover"
            />
            <div className="absolute -bottom-4 -right-4 bg-primary text-white p-6 text-center">
              <p className="font-display text-5xl font-bold text-accent">500+</p>
              <p className="font-body text-sm tracking-wider mt-1">Journeys Crafted</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="bg-primary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="font-accent text-accent italic text-lg mb-2">What We Stand For</p>
            <h2 className="font-display text-4xl text-white">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v) => (
              <div key={v.title} className="bg-white/10 p-8 text-center">
                <div className="text-5xl mb-4">{v.icon}</div>
                <h3 className="font-display text-xl text-accent mb-3">{v.title}</h3>
                <p className="font-body text-white/80 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 ">
        <div className="text-center mb-14 ">
          <p className="font-accent text-accent italic text-lg mb-2">The People Behind the Magic</p>
          <h2 className="font-display text-4xl text-primary">Owner</h2>
          <div className="w-16 h-0.5 bg-accent mx-auto mt-4" />
        </div>
        <div className="grid grid-cols-1 flex-wrap justify-center gap-10">
          {team.map((member) => (
            <div key={member.name} className="text-center group">
              <div className="relative w-48 h-48 mx-auto mb-5 overflow-hidden">
                <img
                  src={member.image}
                  // alt={member.name}
                  // className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* <div className="absolute inset-0 border-4 border-accent/0 group-hover:border-accent/60 transition-all duration-300" /> */}
              </div>
              <h3 className="font-display text-xl text-primary mb-1 group-hover:scale-105 transition-transform duration-500">{member.name}</h3>
              <p className="font-body text-accent text-sm uppercase tracking-wider mb-3">{member.role}</p>
              <p className="font-body text-gray-600 text-sm leading-relaxed max-w-xs mx-auto">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

