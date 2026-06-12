export default function Appointment() {
  return (
    <section className="py-24 px-6">

      <div className="max-w-3xl mx-auto">

        <h2 className="text-4xl font-bold text-center mb-12">
          Book Appointment
        </h2>

        <form className="space-y-6">

          <input
            type="text"
            placeholder="Full Name"
            className="w-full bg-[#111] border border-gray-700 rounded-xl p-4"
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full bg-[#111] border border-gray-700 rounded-xl p-4"
          />

          <input
            type="date"
            className="w-full bg-[#111] border border-gray-700 rounded-xl p-4"
          />

          <textarea
            placeholder="Message"
            rows={5}
            className="w-full bg-[#111] border border-gray-700 rounded-xl p-4"
          />

          <button className="w-full bg-[#D4AF37] text-black py-4 rounded-xl font-semibold">
            Reserve Consultation
          </button>

        </form>

      </div>

    </section>
  );
}