export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">

      {/* BACKGROUND VIDEO */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/diamond-video.mp4" type="video/mp4" />
      </video>

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/40" />

      {/* CONTENT */}
      <div className="relative z-10 min-h-screen flex items-center">

        <div className="max-w-7xl mx-auto px-6">

          <p className="uppercase tracking-[0.4em] text-white text-sm mb-6">
            Kira Diam
          </p>

          <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9]">
            FUTURE
            <br />
            OF
            <br />
            DIAMONDS
          </h1>

          <p className="mt-8 text-gray-200 text-lg max-w-xl leading-8">
            Sustainable brilliance crafted with precision,
            innovation, and modern luxury.
          </p>

          <button className="mt-10 bg-white text-black px-8 py-4 rounded-full font-semibold hover:scale-105 transition">
            Explore Collection
          </button>

        </div>

      </div>

    </section>
  );
}