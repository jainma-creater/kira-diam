export default function Footer() {
  return (
    <footer className="border-t border-gray-800 py-10 px-6">

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">

        <h2 className="text-2xl font-bold gold">
          Kira Diam
        </h2>

        <div className="flex gap-6 text-gray-400">
          <a href="#">Instagram</a>
          <a href="#">WhatsApp</a>
          <a href="#">Email</a>
        </div>

      </div>

    </footer>
  );
}