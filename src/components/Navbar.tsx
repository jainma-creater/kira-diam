export default function Navbar() {
  return (
    <header className="w-full bg-[#F2F2F2] border-b border-gray-300">

      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

        <h1 className="text-3xl font-black text-[#2F428C]">
          Kira Diam
        </h1>

        <nav className="hidden md:flex gap-8 text-[#2F428C] font-medium">

          <a href="#">About</a>
          <a href="#">Collections</a>
          <a href="#">Contact</a>

        </nav>

        <button className="bg-[#2F428C] text-white px-6 py-3 rounded-full">
          Book Now
        </button>

      </div>

    </header>
  );
}