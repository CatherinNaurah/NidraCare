# NidraCare

## Pengantar

Project Akhir bagian Front - End Dicoding Camp

## Deskripsi
Aplikasi NidraCare merupakan web berbasis Machine Learning yang dirancang untuk memprediksi potensi gangguan tidur seperti insomnia atau sleep apnea berdasarkan data pengguna, seperti durasi tidur, gejala fisik dan mental, serta gaya hidup. Dengan pendekatan design thinking, aplikasi ini membantu pengguna mengenali kondisi tidurnya sebelum berkonsultasi dengan tenaga medis. Model klasifikasi digunakan untuk mengelompokkan kondisi tidur pengguna ke dalam kategori normal, insomnia, atau sleep apnea, serta memberikan saran perbaikan yang sesuai.



## Prasyarat

- Node.js (disarankan versi terbaru)
- npm atau yarn

## Instalasi

- Unduh  project [NidraCare.zip]
- Unzip berkas ZIP yang telah diunduh. Bisa pakai perintah berikut untuk Linux:
  ```bash
  unzip ./NidraCare.zip
  ```

- Masuk ke direktori proyek:
  ```bash
  cd NidraCare
  ```

- Pasang seluruh dependensi:
  ```bash
  npm install
  ```

## Scripts

- `npm run build`: Membuat build production menggunakan Webpack.
- `npm run start-dev`: Menjalankan server development menggunakan Webpack Dev Server.
- `npm run serve`: Menjalankan server HTTP untuk build yang sudah dibuat.
- `npm run prettier`: Memeriksa format kode menggunakan Prettier.
- `npm run prettier:write`: Memformat ulang kode menggunakan Prettier.

## Struktur Proyek

```plaintext
nidracare
├── .gitignore                # Mengabaikan file dan direktori dari Git
├── package.json              # Informasi dependensi proyek
├── package-lock.json         # File lock untuk dependensi
├── postcss.config.js         # Konfigurasi untuk PostCSS
├── tailwind.config.js        # Konfigurasi untuk Tailwind CSS
├── README.md                 # Dokumentasi proyek
├── webpack.common.js         # Konfigurasi Webpack (umum)
├── webpack.dev.js            # Konfigurasi Webpack (development)
├── webpack.prod.js           # Konfigurasi Webpack (production)
└── src                       # Direktori utama untuk kode sumber
    ├── index.html            # Berkas HTML utama
    ├── public                # Direktori aset publik
    │   ├── app.webmanifest   # Manifest untuk Progressive Web App (PWA)
    │   └── nidracare app.png # Ikon atau gambar utama aplikasi
    ├── scripts               # Direktori untuk kode JavaScript
    │   ├── assets            # Folder untuk aset yang digunakan oleh JavaScript
    │   ├── data              # Folder untuk API atau sumber data
    │   ├── pages             # Halaman-halaman utama aplikasi
    │   ├── routes            # Pengaturan routing aplikasi
    │   ├── utils             # Helper dan fungsi utilitas
    │   ├── config.js         # Konfigurasi skrip proyek
    │   ├── index.js          # Entry point aplikasi JavaScript
    │   └── templates.js      # Template untuk komponen atau halaman
    └── styles                # Direktori untuk file CSS
        └── styles.css        # Gaya umum aplikasi
```
