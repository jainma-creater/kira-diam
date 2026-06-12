export default function About() {
  return (
    <section className="py-24 px-6 max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-16 items-center">

        <img
          src="/ring.jpg"
          alt="Jewelry"
          className="rounded-3xl"
        />

        <div>
          <h2 className="text-4xl font-bold">
            About <span className="gold">Kira Diam</span>
          </h2>

          <p className="mt-6 text-gray-300 leading-8">
            At Kira Diam, every piece is crafted with
            precision, ethically sourced diamonds,
            and timeless elegance.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-3xl gold font-bold">10+</h3>
              <p className="text-gray-400">Years Experience</p>
            </div>

            <div>
              <h3 className="text-3xl gold font-bold">100%</h3>
              <p className="text-gray-400">Certified Diamonds</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}