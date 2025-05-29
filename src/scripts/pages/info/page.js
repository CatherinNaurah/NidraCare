import Presenter from './presenter';
import * as API from '../../data/api';
import insom from '../../assets/images/Insomnia.png';
import anea from '../../assets/images/sleep anea.png';

export default class Page {
  #presenter = null;

  async render() {
    return `
    <div class="min-h-screen mx-auto bg-gradient-to-b from-[#f0f3fb] to-[#d7d9f2] font-sans px-6 py-10">
      <div class="bg-gradient-to-r from-[#5366c7] to-[#7a86c0] text-white font-semibold text-2xl md:text-3xl rounded-xl shadow-lg py-4 px-6 text-center max-w-4xl mx-auto tracking-wide drop-shadow-md">
        Mari Mengenal Lebih dalam Terkait Insomnia
      </div>

      <div class="flex flex-col sm:flex-row items-start gap-6 mt-10 max-w-4xl mx-auto">
        <img src="${insom}" alt="Ilustrasi Insomnia" class="w-[160px] h-[130px] rounded-xl object-cover flex-shrink-0 shadow-md transition-transform duration-300 hover:scale-105"/>
        <p class="text-base md:text-lg text-gray-700 text-justify leading-relaxed tracking-wide">
          Insomnia adalah kondisi di mana seseorang mengalami kesulitan untuk tidur atau mempertahankan tidur yang berkualitas. Bayangkan saja, sudah berbaring di tempat tidur berjam-jam tapi mata tetap melek seperti burung hantu. Atau mungkin bisa tertidur, tapi sering terbangun di tengah malam dan susah tidur lagi. Penderita insomnia biasanya merasa lelah sepanjang hari, sulit berkonsentrasi, dan mood-nya jadi gampang berubah. Penyebabnya bisa macam-macam, mulai dari stres, kecemasan, kebiasaan buruk sebelum tidur, hingga konsumsi kafein berlebihan. Insomnia bisa terjadi sesekali (akut) atau berlangsung lama (kronis) jika tidak ditangani dengan baik.
        </p>
      </div>

      <section class="bg-white rounded-2xl shadow-lg mt-12 max-w-4xl mx-auto p-8">
        <h2 class="font-extrabold text-center text-2xl mb-6 text-[#4a4e69] tracking-wide">Apa Penyebab Insomnia?</h2>
        <p class="text-lg leading-relaxed mb-5 text-gray-700 text-justify tracking-wide">
          Insomnia dipicu oleh berbagai faktor saling berkaitan. Stres, kecemasan, dan depresi jadi penyebab utama karena membuat pikiran sulit tenang. Gaya hidup seperti konsumsi kafein, alkohol, atau makan berat sebelum tidur ikut mengganggu pola tidur.
        </p>
        <p class="text-lg leading-relaxed mb-5 text-gray-700 text-justify tracking-wide">
          Lingkungan tidur yang kurang nyaman, paparan cahaya gadget, serta kondisi medis seperti asma, refluks, dan penyakit kronis dapat memicu insomnia. Obat-obatan tertentu juga berperan.
        </p>
        <p class="text-lg leading-relaxed text-gray-700 text-justify tracking-wide">
          Selain itu, usia, perubahan hormonal, kerja shift, dan perjalanan lintas zona waktu bisa mengacaukan ritme tidur. Memahami penyebabnya penting untuk menentukan penanganan yang tepat, karena tiap orang memiliki faktor pemicu berbeda.
        </p>
      </section>

      <div class="flex flex-col md:flex-row gap-8 mt-12 max-w-4xl mx-auto">
        <div class="bg-white rounded-2xl shadow-lg p-8 flex-1 hover:shadow-xl transition-shadow duration-300">
          <h3 class="font-bold text-xl mb-4 text-center text-[#22223b] tracking-wide">Apa Saja Gejala Insomnia?</h3>
          <p class="italic font-semibold mb-2 text-sm text-[#6c757d] tracking-wide">Gejala utama:</p>
          <ul class="list-disc list-inside text-base mb-5 text-gray-700 tracking-wide space-y-1">
            <li>Sulit tidur di malam hari</li>
            <li>Sering terbangun di malam hari dan sulit tidur kembali</li>
            <li>Bangun terlalu pagi dan tidak bisa tidur lagi</li>
            <li>Tidur terasa tidak nyenyak atau tidak menyegarkan</li>
          </ul>
          <p class="italic font-semibold mb-2 text-sm text-[#6c757d] tracking-wide">Gejala tambahan (akibat kurang tidur):</p>
          <ul class="list-disc list-inside text-base text-gray-700 tracking-wide space-y-1">
            <li>Mudah lelah atau mengantuk di siang hari</li>
            <li>Sulit fokus, konsentrasi, atau mengingat</li>
            <li>Mudah marah, cemas, atau mood buruk</li>
            <li>Menurunnya performa kerja</li>
            <li>Sakit kepala atau gangguan pencernaan</li>
          </ul>
        </div>

        <div class="bg-white rounded-2xl shadow-lg p-8 flex-1 hover:shadow-xl transition-shadow duration-300">
          <h3 class="font-bold text-xl mb-4 text-center text-[#22223b] tracking-wide">Apa Saja Faktor Risiko Penyebab Insomnia?</h3>
          <ul class="list-disc list-inside text-base leading-relaxed text-gray-700 tracking-wide space-y-2">
            <li>Stres atau tekanan emosional mengganggu ketenangan menjelang tidur.</li>
            <li>Wanita lebih berisiko karena perubahan hormon saat menstruasi, hamil, dan menopause.</li>
            <li>Riwayat keluarga dengan gangguan tidur meningkatkan kemungkinan insomnia.</li>
            <li>Gaya hidup tidak sehat seperti begadang dan konsumsi kafein/alkohol.</li>
            <li>Paparan gadget sebelum tidur atau lingkungan tidur yang tidak nyaman.</li>
            <li>Penggunaan obat tertentu seperti antidepresan atau dekongestan.</li>
            <li>Usia lanjut yang disertai perubahan pola tidur alami.</li>
            <li>Gangguan mental seperti kecemasan, depresi, atau PTSD.</li>
            <li>Penyakit fisik seperti nyeri kronis, GERD, atau asma.</li>
          </ul>
        </div>
      </div>

      <div class="mt-12 bg-gradient-to-r from-[#1e3a5f] to-[#2c4b67] text-white font-semibold text-2xl md:text-3xl rounded-xl shadow-lg py-4 px-6 text-center max-w-4xl mx-auto tracking-wide drop-shadow-md">
        Mari Mengenal Lebih dalam Terkait Sleep Apneas
      </div>

      <div class="flex flex-col sm:flex-row items-start gap-6 mt-10 max-w-4xl mx-auto">
        <img src="${anea}" alt="Ilustrasi Sleep Apneas" class="w-[160px] h-[130px] rounded-xl object-cover flex-shrink-0 shadow-md transition-transform duration-300 hover:scale-105"/>
        <p class="text-base md:text-lg text-gray-700 text-justify leading-relaxed tracking-wide">
          Sleep apnea adalah gangguan tidur yang cukup serius, di mana pernapasan seseorang terhenti berulang kali saat tidur. Kondisi ini seperti "mogok napas" sementara yang bisa terjadi puluhan bahkan ratusan kali dalam semalam. Yang paling umum adalah Obstructive Sleep Apnea (OSA), di mana saluran napas tersumbat karena otot-otot tenggorokan mengendur berlebihan.
          Gejala yang paling khas adalah dengkuran keras yang diselingi periode hening (napas berhenti), lalu diikuti suara seperti tersedak atau terengah-engah. Penderitnya sering tidak sadar mengalami hal ini, tapi akan bangun dengan perasaan tidak segar meski sudah tidur lama. Sleep apnea dapat meningkatkan risiko penyakit jantung, stroke, dan diabetes jika tidak ditangani.
        </p>
      </div>

      <section class="bg-white rounded-2xl shadow-lg mt-12 max-w-4xl mx-auto p-8">
        <h2 class="font-extrabold text-center text-2xl mb-6 text-[#3b4a6b] tracking-wide">Apa Penyebab Sleep Apnea?</h2>
        <p class="text-lg leading-relaxed mb-5 text-gray-700 text-justify tracking-wide">
          Sleep apnea adalah gangguan tidur serius yang menyebabkan henti napas berulang saat tidur. Terdapat dua jenis utama: Obstructive Sleep Apnea (OSA) akibat penyumbatan saluran napas, dan Central Sleep Apnea (CSA) akibat gangguan sinyal otak ke otot pernapasan. Kondisi ini menurunkan kualitas tidur dan berisiko menimbulkan komplikasi kesehatan jika tak ditangani.
        </p>
        <p class="text-lg leading-relaxed mb-5 text-gray-700 text-justify tracking-wide">
          Obesitas jadi penyebab utama karena lemak di leher mempersempit saluran napas. Faktor lain termasuk struktur anatomi seperti rahang kecil, amandel besar, serta kebiasaan merokok, konsumsi alkohol, dan tidur telentang. Usia, jenis kelamin, dan riwayat keluarga juga memengaruhi risiko — pria lebih rentan, namun risiko meningkat pada wanita setelah menopause.
        </p>
        <p class="text-lg leading-relaxed text-gray-700 text-justify tracking-wide">
          Sleep apnea juga terkait kondisi medis seperti hipertensi, gagal jantung, stroke, ginjal kronis, diabetes tipe 2, hipotiroidisme, dan PCOS. Jika dibiarkan, dapat memicu kelelahan kronis, gangguan konsentrasi, serta risiko penyakit jantung dan kecelakaan akibat kantuk di siang hari. Deteksi dini dan penanganan medis sangat penting.
        </p>
      </section>

      <div class="flex flex-col md:flex-row gap-8 mt-12 max-w-4xl mx-auto">
        <div class="bg-white rounded-2xl shadow-lg p-8 flex-1 hover:shadow-xl transition-shadow duration-300">
          <h3 class="font-bold text-xl mb-4 text-center text-[#22223b] tracking-wide">Apa Saja Gejala Sleep Apnea?</h3>
          <p class="italic font-semibold mb-2 text-sm text-[#6c757d] tracking-wide">Gejala utama:</p>
          <ul class="list-disc list-inside text-base mb-5 text-gray-700 tracking-wide space-y-1">
            <li>Mendengkur keras saat tidur</li>
            <li>Napas terhenti sesaat selama tidur (sering disadari oleh orang lain)</li>
            <li>Tersedak atau terengah-engah saat tidur</li>
            <li>Tidur tidak nyenyak dan sering terbangun</li>
            <li>Rasa kantuk berlebihan di siang hari meskipun cukup tidur</li>
          </ul>
          <p class="italic font-semibold mb-2 text-sm text-[#6c757d] tracking-wide">Gejala tambahan (akibat kurang tidur):</p>
          <ul class="list-disc list-inside text-base text-gray-700 tracking-wide space-y-1">
            <li>Sakit kepala di pagi hari, terutama di bagian dahi atau pelipis</li>
            <li>Rasa mengantuk berlebihan di siang hari, bahkan saat sedang aktif</li>
            <li>Kesulitan berkonsentrasi dan memperhatikan hal-hal sederhana</li>
          </ul>
        </div>

        <div class="bg-white rounded-2xl shadow-lg p-8 flex-1 hover:shadow-xl transition-shadow duration-300">
          <h3 class="font-bold text-xl mb-4 text-center text-[#22223b] tracking-wide">Apa Saja Faktor Risiko Penyebab Sleep Apnea?</h3>
          <ul class="list-disc list-inside text-base leading-relaxed text-gray-700 tracking-wide space-y-2">
            <li>Mengalami obesitas karena lemak berlebih di leher menyempitkan saluran napas.</li>
            <li>Memiliki rahang kecil, amandel besar, atau sumbatan anatomis lainnya.</li>
            <li>Usia lanjut yang menyebabkan otot saluran napas mengendur.</li>
            <li>Jenis kelamin laki-laki lebih rentan dibanding perempuan.</li>
            <li>Kebiasaan merokok dan konsumsi alkohol meningkatkan risiko.</li>
            <li>Memiliki riwayat keluarga dengan sleep apnea.</li>
            <li>Memiliki penyakit kronis seperti hipertensi, gagal jantung, stroke, dan diabetes.</li>
            <li>Gangguan hormonal seperti hipotiroidisme dan PCOS.</li>
            <li>Tidur posisi terlentang meningkatkan risiko terjadinya apnea.</li>
          </ul>
        </div>
      </div>
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
