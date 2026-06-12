const products = [
  {
    title: "Royal Emerald Ring",
    image: "/ring1.jpg",
  },
  {
    title: "Diamond Eternity Band",
    image: "/ring2.jpg",
  },
  {
    title: "Classic Gold Solitaire",
    image: "/ring3.jpg",
  },
];

export default function Collection() {
  return (
    <section className="bg-black text-white py-24 px-6">

      <div className="max-w-7xl mx-auto">

        <div className="mb-16 text-center">
          <p className="text-[#D4AF37] uppercase tracking-[0.3em] text-sm">
            Featured Collection
          </p>

          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            Signature Pieces
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {products.map((product, index) => (
            <div
              key={index}
              className="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 hover:scale-105 transition"
            >

              <img
                src={product.image}
                alt={product.title}
                className="w-full h-[350px] object-cover"
              />

              <div className="p-6">
                <h3 className="text-xl font-semibold">
                  {product.title}
                </h3>
              </div>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}