"use client";

import ThreeDViewer from "@/components/ThreeDViewer";
import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim()) {
      setError('Please enter your name');
      return;
    }
    if (!formData.email.trim()) {
      setError('Please enter your email');
      return;
    }
    if (!formData.phone.trim()) {
      setError('Please enter your phone number');
      return;
    }
    if (!formData.date) {
      setError('Please select a date');
      return;
    }

    // Here you would typically send this to a backend API
    console.log('Booking submitted:', formData);
    
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', date: '' });
    
    // Reset success message after 3 seconds
    setTimeout(() => setSubmitted(false), 3000);
  };
  return (
    <main className="bg-[#F5F7FB] text-[#2F428C] overflow-hidden select-none">
{/* NAVBAR */}
<header className="fixed top-0 left-0 w-full z-50 bg-white/50 backdrop-blur-md border-b border-gray-100">

  <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between gap-2 md:gap-4">

    <div className="flex items-center gap-4">

      <img
        src="/logo.png"
        alt="Kira Diam"
        className="h-10 md:h-14 w-auto"
      />

    </div>

    <nav className="flex gap-4 md:gap-10 text-[#1a1a2e] font-semibold text-sm md:text-base">
      <a href="#about" className="border-b-2 border-transparent hover:border-[#D4AF37] transition-all duration-300 pb-1">About</a>
      <a href="#process" className="border-b-2 border-transparent hover:border-[#D4AF37] transition-all duration-300 pb-1">Process</a>
      <a href="#collections" className="border-b-2 border-transparent hover:border-[#D4AF37] transition-all duration-300 pb-1">Collections</a>
      <a href="#booking" className="border-b-2 border-transparent hover:border-[#D4AF37] transition-all duration-300 pb-1">Contact</a>
    </nav>

    <button onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })} className="bg-[#2F428C] text-white px-3 md:px-6 py-2 md:py-3 rounded-full hover:bg-[#1d2d68] active:scale-95 cursor-pointer transition-all duration-200 font-semibold shadow-md text-sm md:text-base">
      Book Appointment
    </button>

  </div>

</header>
      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center overflow-hidden">

        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/diamond-video.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">

          <p className="tracking-[8px] text-sm mb-4 text-white">
            KIRA DIAM
          </p>

          <h1 className="text-4xl md:text-6xl font-black leading-tight text-white">
            FUTURE <br />
            OF <br />
            DIAMONDS
          </h1>

          <p className="mt-8 text-lg text-white max-w-2xl leading-relaxed">
            Sustainable brilliance crafted with precision, innovation, and modern luxury. KIRA delivers ethically sourced, lab-grown diamonds that combine timeless elegance with environmental responsibility.
          </p>

          <button onClick={() => document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' })} className="mt-10 px-8 py-4 rounded-full bg-white text-[#2F428C] font-semibold hover:bg-gray-100 active:scale-95 cursor-pointer transition-all duration-200 shadow-lg">
            Explore Collection
          </button>

        </div>

      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-28 px-6">

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">

          <div>

            <p className="text-sm tracking-[6px] text-gray-500 mb-4">
              ABOUT COMPANY
            </p>

            <h2 className="text-5xl font-black mb-6 leading-tight text-[#2F428C]">
              Redefining Modern Luxury
            </h2>

            <p className="text-gray-700 leading-relaxed text-lg">
              KIRA Diamonds is a premium jewelry manufacturer specializing in lab-grown diamonds and exquisite jewelry designs. We combine cutting-edge technology with traditional craftsmanship to create stunning pieces that combine timeless elegance with modern sustainability.
            </p>

            <p className="text-gray-700 leading-relaxed text-lg mt-6">
              Our mission is to provide globally accessible luxury diamonds without compromising on quality, ethics, or environmental responsibility. Each piece is meticulously crafted, certified, and delivered with pride.
            </p>

            <div className="grid grid-cols-2 gap-8 mt-12">

              <div>
                <h3 className="text-4xl font-black text-[#2F428C]">
                  5000+
                </h3>

                <p className="text-gray-600 mt-2">
                  Diamonds Crafted
                </p>
              </div>

              <div>
                <h3 className="text-4xl font-black text-[#2F428C]">
                  25+
                </h3>

                <p className="text-gray-600 mt-2">
                  Global Partners
                </p>
              </div>

              <div>
                <h3 className="text-4xl font-black text-[#2F428C]">
                  99%
                </h3>

                <p className="text-gray-600 mt-2">
                  Precision Quality
                </p>
              </div>

              <div>
                <h3 className="text-4xl font-black text-[#2F428C]">
                  100%
                </h3>

                <p className="text-gray-600 mt-2">
                  Ethical Process
                </p>
              </div>

            </div>

          </div>

          <div className="w-full h-auto">

            <img
              src="/jewelry.jpg"
              alt="Diamond"
              className="w-full h-auto rounded-[40px] shadow-2xl object-cover"
            />

          </div>

        </div>

      </section>

      {/* PROCESS SECTION */}
      <section id="process" className="py-28 px-6 bg-white">

        <div className="max-w-7xl mx-auto">

          <p className="text-sm tracking-[6px] text-gray-500 mb-4">
            OUR PROCESS
          </p>

          <h2 className="text-5xl font-black mb-16 text-[#2F428C]">
            Precision In Every Step
          </h2>

          <div className="grid md:grid-cols-4 gap-8">

            {[
              {
                number: "01",
                title: "Diamond Growth",
                desc: "Advanced lab-grown creation process.",
              },
              {
                number: "02",
                title: "Precision Cutting",
                desc: "High-accuracy modern cutting systems.",
              },
              {
                number: "03",
                title: "Quality Inspection",
                desc: "Multi-stage grading and certification.",
              },
              {
                number: "04",
                title: "Global Delivery",
                desc: "Secure worldwide distribution.",
              },
            ].map((item) => (
              <div
                key={item.number}
                className="bg-[#EEF2FF] border border-gray-200 rounded-[32px] p-8 hover:scale-105 transition"
              >

                <p className="text-5xl font-black text-[#2F428C]/30">
                  {item.number}
                </p>

                <h3 className="text-2xl font-bold mt-6 text-[#2F428C]">
                  {item.title}
                </h3>

                <p className="text-gray-600 mt-4 leading-relaxed">
                  {item.desc}
                </p>

              </div>
            ))}

          </div>

        </div>

      </section>

      {/* FEATURED COLLECTIONS SECTION */}
      <section id="collections" className="py-28 px-6 bg-gradient-to-b from-[#F5F7FB] to-white">

        <div className="max-w-7xl mx-auto">

          <p className="text-sm tracking-[6px] text-gray-500 mb-4">
            FEATURED COLLECTIONS
          </p>

          <h2 className="text-5xl font-black mb-16 text-[#2F428C]">
            Exquisite Designs
          </h2>

          <div className="grid md:grid-cols-3 gap-6 md:gap-12">

            <div className="group cursor-pointer transform hover:scale-105 transition-transform duration-300">
              <div className="bg-white rounded-[32px] p-4 md:p-8 shadow-lg overflow-hidden h-72 md:h-80 flex items-center justify-center">
                <img
                  src="/bracelet.jpg"
                  alt="Diamond Bracelet"
                  className="w-full h-full object-contain rounded-[24px]"
                />
              </div>
              <h3 className="text-2xl font-bold mt-6 text-[#2F428C]">
                Diamond Bracelets
              </h3>
              <p className="text-gray-600 mt-3">
                Elegant and timeless designs crafted with precision-cut diamonds and premium gold.
              </p>
            </div>

            <div className="group cursor-pointer transform hover:scale-105 transition-transform duration-300">
              <div className="bg-white rounded-[32px] p-4 md:p-8 shadow-lg overflow-hidden h-72 md:h-80 flex items-center justify-center">
                <img
                  src="/earring.jpg"
                  alt="Diamond Earrings"
                  className="w-full h-full object-contain rounded-[24px]"
                />
              </div>
              <h3 className="text-2xl font-bold mt-6 text-[#2F428C]">
                Diamond Earrings
              </h3>
              <p className="text-gray-600 mt-3">
                Sophisticated stud and drop earrings that add brilliance and elegance to any occasion.
              </p>
            </div>

            <div className="group cursor-pointer transform hover:scale-105 transition-transform duration-300">
              <div className="bg-white rounded-[32px] p-4 md:p-8 shadow-lg overflow-hidden h-72 md:h-80 flex items-center justify-center">
                <img
                  src="/ring.jpg"
                  alt="Diamond Rings"
                  className="w-full h-full object-contain rounded-[24px]"
                />
              </div>
              <h3 className="text-2xl font-bold mt-6 text-[#2F428C]">
                Engagement Rings
              </h3>
              <p className="text-gray-600 mt-3">
                Stunning rings with center stones and complementary diamonds, symbolizing eternal love.
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* WHY CHOOSE KIRA SECTION */}
      <section className="py-28 px-6">

        <div className="max-w-7xl mx-auto">

          <p className="text-sm tracking-[6px] text-gray-500 mb-4">
            WHY CHOOSE KIRA
          </p>

          <h2 className="text-5xl font-black mb-16 text-[#2F428C]">
            Premium Quality Guaranteed
          </h2>

          <div className="grid md:grid-cols-2 gap-16 items-center">

            <div className="space-y-8">

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-[#2F428C] text-white font-bold text-xl">
                    ✓
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#2F428C]">
                    Lab-Grown Diamonds
                  </h3>
                  <p className="text-gray-600 mt-2">
                    Ethically sourced, environmentally responsible, and chemically identical to mined diamonds at a fraction of the cost.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-[#2F428C] text-white font-bold text-xl">
                    ✓
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#2F428C]">
                    Certified Quality
                  </h3>
                  <p className="text-gray-600 mt-2">
                    Every piece undergoes rigorous multi-stage inspection and comes with certification of authenticity.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-[#2F428C] text-white font-bold text-xl">
                    ✓
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#2F428C]">
                    Expert Craftsmanship
                  </h3>
                  <p className="text-gray-600 mt-2">
                    Precision cutting using advanced technology combined with traditional jewelry-making expertise.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-[#2F428C] text-white font-bold text-xl">
                    ✓
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#2F428C]">
                    Global Delivery
                  </h3>
                  <p className="text-gray-600 mt-2">
                    Secure, insured shipping to over 150 countries with white-glove delivery service available.
                  </p>
                </div>
              </div>

            </div>

            <div className="w-full h-auto">

              <img
                src="/logo.png"
                alt="KIRA Premium Jewelry"
                className="w-full h-auto rounded-[40px] shadow-2xl object-cover"
              />

            </div>

          </div>

        </div>

      </section>

      {/* 3D VIEWER SECTION */}
      <ThreeDViewer 
        title="Explore Our 3D Models"
        modelPath="/sample_2026-06-12T090722.421.glb"
      />

      {/* APPOINTMENT SECTION */}
      <section id="booking" className="py-28 px-6">

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-start">

          <div>

            <p className="text-sm tracking-[6px] text-gray-500 mb-4">
              BOOK APPOINTMENT
            </p>

            <h2 className="text-5xl font-black leading-tight mb-6 text-[#2F428C]">
              Book Your Appointment
            </h2>

            <p className="text-gray-700 text-lg leading-relaxed">
              Schedule an appointment with our jewelry specialists to explore our exclusive collections and find your perfect piece.
            </p>

            <div className="mt-12 space-y-6 text-gray-700">

              <div>
                <h4 className="font-bold text-[#2F428C]">
                  Mumbai Office
                </h4>

                <p>BKC, Mumbai, India</p>
              </div>

              <div>
                <h4 className="font-bold text-[#2F428C]">
                  Email
                </h4>

                <p>contact@kiradiam.com</p>
              </div>

              <div>
                <h4 className="font-bold text-[#2F428C]">
                  Phone
                </h4>

                <p>+91 98765 43210</p>
              </div>

            </div>

          </div>

          <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-[40px] p-10 space-y-6 shadow-xl">

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            {submitted && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl">
                ✓ Thank you! We'll contact you soon to confirm your appointment.
              </div>
            )}

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-[#2F428C] transition"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-[#2F428C] transition"
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-[#2F428C] transition"
            />

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-[#2F428C] transition"
            />

            <button type="submit" className="w-full bg-[#2F428C] text-white font-semibold py-4 rounded-xl hover:bg-[#1d2d68] active:scale-95 active:shadow-lg cursor-pointer transition-all duration-200">
              Book Appointment
            </button>

          </form>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-300 py-10 px-6">

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">

          <div>

            <h2 className="text-2xl font-black text-[#2F428C]">
              KIRA DIAM
            </h2>

            <p className="text-gray-500 mt-2">
              Future of Sustainable Luxury
            </p>

          </div>

          <div className="flex gap-8 mt-6 md:mt-0 text-gray-600">

            <a href="https://kiradiam.com/" target="_blank" rel="noopener noreferrer" className="hover:text-[#D4AF37] transition cursor-pointer">Website</a>
            <a href="https://www.instagram.com/kiradiam/?hl=en" target="_blank" rel="noopener noreferrer" className="hover:text-[#D4AF37] transition cursor-pointer">Instagram</a>
            <a href="https://www.linkedin.com/company/kiradiamonds/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="hover:text-[#D4AF37] transition cursor-pointer">LinkedIn</a>

          </div>

        </div>

      </footer>

    </main>
  );
}