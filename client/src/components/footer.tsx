import {
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start">
          <div className="mb-6 md:mb-0">
            <h2 className="text-lg font-semibold">PesanPanen</h2>
            <div className="flex space-x-4 mt-4 text-gray-600">
              <FaFacebookF className="text-xl cursor-pointer" />
              <FaLinkedinIn className="text-xl cursor-pointer" />
              <FaYoutube className="text-xl cursor-pointer" />
              <FaInstagram className="text-xl cursor-pointer" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full md:w-auto">
            <div>
              <h3 className="text-sm font-semibold mb-2">Tentang Kami</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>
                  <a href="#" className="hover:underline">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-2">Berita</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>
                  <a href="#" className="hover:underline">
                    Berita & Promo
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-2">Bantuan & Panduan</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>
                  <a href="#" className="hover:underline">
                    Bantuan
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Kebijakan & Privasi
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Help Desk
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
