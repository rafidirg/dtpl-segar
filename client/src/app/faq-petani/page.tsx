import Image from "next/image";

export default function FAQPetani() {
  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Tutorial Penggunaan Admin Petani 
      </h1>

      {/* Cara Akses & Petani Baru */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          Cara Akses & Petani Baru
        </h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>
            Request kepada <strong>SuperAdmin</strong> untuk pendaftaran petani.
            Anda akan diberikan Email & Password untuk login. (Langkah ini bisa
            diskip jika sudah memiliki akun.)
          </li>
          <Image src="/images/Login.png" alt="" width={700} height={300} />
          <li>
            Kunjungi website{" "}
            <a
              href="https://strapi.rafidirg.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              strapi.rafidirg.com
            </a>{" "}
            dan input Email & Password yang telah diberikan.
          </li>
        </ol>
      </section>

      {/* Menambahkan Produk */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Menambahkan Produk</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>
            Login dan pilih menu <strong>Content Manager</strong> di samping
            kiri.
          </li>
          <li>
            Klik <strong>Product</strong> di bagian Collection Types.
          </li>
          <Image
            src="/images/tambah-produk.png"
            alt=""
            width={700}
            height={300}
          />
          <li>
            Klik tombol <strong>+ Click new entry</strong> di kanan atas.
          </li>
          <Image
            src="/images/isi-detail-produk.png"
            alt=""
            width={700}
            height={300}
          />
          <li>
            Isi informasi produk: nama, kategori, gambar, harga, deskripsi,
            ketersediaan, dan opsi PreOrder.
          </li>
          <li>
            Klik <strong>Save</strong> untuk menyimpan, lalu klik{" "}
            <strong>Publish</strong> untuk menerbitkan produk.
          </li>
        </ol>
      </section>

      {/* Mengubah & Menghapus Produk */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          Mengubah atau Menghapus Produk
        </h2>
        <p className="mb-4">Pada daftar produk yang telah dipublish:</p>
        <Image src="/images/edit-produk.png" alt="" width={700} height={300} />
        <ul className="list-disc list-inside space-y-2">
          <li>
            Klik ikon tiga titik di produk yang ingin dihapus, lalu pilih{" "}
            <strong>Delete entry</strong>.
          </li>
          <li>
            Klik ikon tiga titik di produk yang ingin diubah, lalu pilih{" "}
            <strong>Edit</strong>. Setelah perubahan, klik <strong>Save</strong>{" "}
            dan <strong>Publish</strong>.
          </li>
        </ul>
      </section>

      {/* Melihat & Merubah Status Pesanan */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          Melihat & Merubah Status Pesanan
        </h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>
            Pada <strong>Content Manager</strong>, klik bagian{" "}
            <strong>Order</strong> di Collection Types.
          </li>
          <Image src="/images/order-list.png" alt="" width={700} height={300} />
          <li>Lihat detail pesanan seperti email, alamat, dan status order.</li>
          <li>
            Untuk mengubah status pesanan (Pending / Diproses / Dalam
            Perjalanan), klik ikon tiga titik, lalu pilih <strong>Edit</strong>.
          </li>
          <Image src="/images/order-edit.png" alt="" width={700} height={300} />
          <li>
            Setelah perubahan, klik <strong>Save</strong> dan{" "}
            <strong>Publish</strong>.
          </li>
        </ol>
      </section>
    </main>
  );
}
