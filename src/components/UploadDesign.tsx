export default function UploadDesign() {
  return (
    <section className="py-24 px-6">

      <div className="max-w-4xl mx-auto bg-[#111] rounded-3xl p-12 text-center">

        <h2 className="text-4xl font-bold">
          Upload Your Inspiration
        </h2>

        <p className="mt-4 text-gray-400">
          Share sketches, images, or references for custom jewelry.
        </p>

        <div className="mt-10 border-2 border-dashed border-[#D4AF37] rounded-2xl p-16">

          <input type="file" className="text-gray-300" />

        </div>

      </div>

    </section>
  );
}