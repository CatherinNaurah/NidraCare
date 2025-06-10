import Presenter from './presenter';
import * as API from '../../data/api';


export default class Page {
  #presenter = null;

  async render() {
    return `
      <div>
        <section class="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
          <video 
            autoplay 
            muted 
            loop 
            playsinline 
            class="absolute inset-0 w-full h-full object-cover z-0"
          >
            <source src="https://cdn.dribbble.com/userupload/41534275/file/original-4facec7eab76ecf084d3006241db4e7e.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <!-- Konten -->
          <div class="relative z-10 flex flex-col items-center justify-center px-4 text-center">
            <h1 class="text-5xl font-bold mb-4">Tidur Berkualitas,<br/>Produktif Maksimal!</h1>
            <p class="text-md max-w-2xl">Temukan rahasia tidur yang lebih nyenyak bersama NidraCare! Kami hadir untuk menganalisis dan memberikan solusi tepat, agar tidur Anda lebih berkualitas.</p>
            <button 
              class="text-white cursor-pointer bg-black mt-6 px-4 py-3 border rounded-xl transition-all duration-300 hover:scale-105 hover:bg-black/90"
              onclick="location.hash='#/form'"
            >
              Analisa Sekarang
            </button>
          </div>

          <!-- Optional: Overlay Gelap -->
          <div class="absolute inset-0 bg-white/90 z-5"></div>
        </section>

        <!-- Section Card -->
        <section class="py-24 text-white relative z-10 bg-gradient-to-b from-[#7676c7] to-[#4a4a9c]">
          <div class="max-w-screen-xl mx-auto px-4">
            <h2 class="text-3xl font-bold text-center mb-10">Kenali Jenis Gangguan Tidur</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">

              <!-- Card 1 -->
              <div class="bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 hover:scale-105 hover:shadow-primary/50">
                <div class="text-primary text-4xl mb-4">🛌</div>
                <h3 class="text-xl font-semibold mb-2 text-gray-900">Apa itu Gangguan Tidur?</h3>
                <p class="text-gray-600">Gangguan tidur adalah kondisi yang menyebabkan kualitas, waktu, atau kuantitas tidur terganggu sehingga memengaruhi kesehatan tubuh dan produktivitas sehari-hari.</p>
              </div>

              <!-- Card 2 -->
              <div class="bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 hover:scale-105 hover:shadow-primary/50">
                <div class="text-primary text-4xl mb-4">😴</div>
                <h3 class="text-xl font-semibold mb-2 text-gray-900">Sleep Apnea</h3>
                <p class="text-gray-600">Sleep apnea adalah gangguan tidur di mana pernapasan berhenti secara berkala saat tidur, menyebabkan tubuh kekurangan oksigen dan tidur jadi tidak nyenyak.</p>
              </div>

              <!-- Card 3 -->
              <div class="bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 hover:scale-105 hover:shadow-primary/50">
                <div class="text-primary text-4xl mb-4">🌙</div>
                <h3 class="text-xl font-semibold mb-2 text-gray-900">Insomnia</h3>
                <p class="text-gray-600">Insomnia adalah kesulitan untuk tidur, sulit mempertahankan tidur, atau bangun terlalu pagi dan tidak bisa tidur kembali, sehingga tubuh tidak cukup istirahat.</p>
              </div>
            </div>
            <div class="w-full flex justify-center items-center flex-wrap mt-4">
              <button
                class="cursor-pointer mt-8 bg-white text-[#7676c7] px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-white/90 transition"
                type="button"
                onclick="window.location.href='/#/info'"
              >
                Baca Lebih Lengkap
              </button>
            </div>
          </div>
        </section>

       <section class="relative py-20 bg-gray-50 overflow-hidden">
          <!-- Background Pattern -->
          <div class="absolute inset-0 pointer-events-none">
            <svg class="w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="pattern" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                  <circle cx="3" cy="3" r="2" fill="#d1d5db" />
                  <circle cx="15" cy="15" r="2" fill="#d1d5db" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#pattern)" />
            </svg>
          </div>

          <!-- Konten -->
          <div class="relative z-10 max-w-3xl mx-auto py-20 px-6 text-center">
            <h2 class="text-4xl font-extrabold mb-6 text-gray-900">Solusi Modern untuk Tidur Berkualitas</h2>
            <p class="text-lg text-gray-700 leading-relaxed">
              NidraCare menggabungkan teknologi machine learning dan pengetahuan medis untuk analisis pola tidur yang presisi, lengkap dengan rekomendasi personal demi kualitas tidur dan produktivitas yang optimal.
            </p>
            <p class="mt-6 text-lg text-primary font-semibold">
              Cukup isi data, dan dapatkan kondisi tidur Anda dalam hitungan detik. Yuk, mulai tidur nyenyak dan bangun segar bersama NidraCare!
            </p>
          </div>
        </section>
      </div>
    `;
  }

  async afterRender() {
    this.#presenter = new Presenter({
      view: this,
      model: API,
    });
  }
}
