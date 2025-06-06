import DataFormPresenter from "./data-form-presenter.js";

class DataFormPage {
  #presenter;
  #form;

  constructor() { 
  }

  async render() {
    const selectClasses = "w-full py-3 pl-3 pr-3 border-r-[8px] border-transparent rounded-lg text-base transition-colors duration-200 outline outline-1 outline-slate-200 focus:outline-2 focus:outline-[#040A42] focus:ring-4 focus:ring-[#040A42]/20";

    return `
      <div class="bg-[#E4E6F9] text-slate-800 font-sans p-10 px-5 flex justify-center items-center min-h-screen">
        <div class="w-full max-w-3xl">
          <div class="bg-white p-10 rounded-2xl shadow-lg">
            <h1 class="text-2xl font-semibold mb-8 text-slate-800">Mohon lengkapi formulir data diri dan kesehatan Anda.</h1>
            
            <form id="data-form">
              <div class="mb-6">
                <label for="umur" class="block font-medium mb-2 text-sm">Umur</label>
                <input type="number" id="umur" name="umur" placeholder="Masukkan umur Anda saat ini." required
                       class="w-full py-3 px-4 border border-slate-200 rounded-lg text-base transition-colors duration-200 
                              placeholder:text-slate-400 focus:outline-none focus:border-[#040A42] focus:ring-4 focus:ring-[#040A42]/20 no-spinner">
              </div>

              <div class="mb-6">
                <label for="jenis-kelamin" class="block font-medium mb-2 text-sm">Jenis Kelamin</label>
                <select id="jenis-kelamin" name="jenisKelamin" required
                        class="${selectClasses}"> {/* Kelas diubah di sini */}
                  <option value="" disabled selected>Pilih jenis kelamin Anda</option>
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>

              <div class="mb-6">
                <label for="aktivitas-fisik" class="block font-medium mb-2 text-sm">Durasi Aktivitas Fisik (satuan menit)</label>
                <input type="number" step="any" id="aktivitas-fisik" name="aktivitasFisik" placeholder="Masukkan berapa lama Anda melakukan aktivitas fisik."
                       class="w-full py-3 px-4 border border-slate-200 rounded-lg text-base transition-colors duration-200 
                              placeholder:text-slate-400 focus:outline-none focus:border-[#040A42] focus:ring-4 focus:ring-[#040A42]/20 no-spinner">
              </div>

              <div class="mb-6">
                <label for="daily-step" class="block font-medium mb-2 text-sm">Daily Step</label>
                <input type="number" id="daily-step" name="dailyStep" placeholder="Masukkan jumlah langkah rata-rata Anda per hari."
                       class="w-full py-3 px-4 border border-slate-200 rounded-lg text-base transition-colors duration-200 
                              placeholder:text-slate-400 focus:outline-none focus:border-[#040A42] focus:ring-4 focus:ring-[#040A42]/20 no-spinner">
              </div>

              <div class="mb-6">
                <label for="durasi-tidur" class="block font-medium mb-2 text-sm">Durasi Jam Tidur</label>
                <input type="number" step="any" id="durasi-tidur" name="durasiTidur" placeholder="Gunakan angka desimal jika perlu. Misal: 6, 7.5, 8"
                       class="w-full py-3 px-4 border border-slate-200 rounded-lg text-base transition-colors duration-200 
                              placeholder:text-slate-400 focus:outline-none focus:border-[#040A42] focus:ring-4 focus:ring-[#040A42]/20 no-spinner">
              </div>

              <div class="flex flex-col md:flex-row gap-6">
                <div class="flex-1 mb-6 md:mb-0">
                  <label for="stress-level" class="block font-medium mb-2 text-sm">Stress Level (1-10)</label>
                  <select id="stress-level" name="stressLevel" required
                          class="${selectClasses}"> {/* Kelas diubah di sini */}
                    <option value="" disabled selected>Pilih Tingkat Stres</option>
                    ${Array.from(
                      { length: 10 },
                      (_, i) => `<option value="${i + 1}">${i + 1}</option>`
                    ).join("")}
                  </select>
                </div>

                <div class="flex-1">
                  <label for="kategori-bmi" class="block font-medium mb-2 text-sm">Kategori BMI</label>
                  <select id="kategori-bmi" name="kategoriBmi" required
                          class="${selectClasses}"> {/* Kelas diubah di sini */}
                    <option value="" disabled selected>Pilih Kategori BMI</option>
                    <option value="Underweight">Underweight (Kurang berat badan)</option>
                    <option value="Normal">Normal (Berat badan ideal)</option>
                    <option value="Overweight">Overweight (Kelebihan berat badan)</option>
                  </select>
                  <small class="text-xs text-slate-500 mt-1.5 block">Info: BMI <18.5 (Underweight), 18.5-24.9 (Normal), >25 (Overweight)</small>
                </div>
              </div>

              <div class="mt-8 flex justify-end">
                <button type="submit" 
                        class="bg-[#040A42] hover:bg-[#1a205a] text-white py-3 px-8 text-base font-semibold rounded-lg 
                               cursor-pointer transition-all duration-200 hover:-translate-y-0.5">
                  Simpan & Lihat Hasil
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
  }

  async afterRender() {
    this.#presenter = new DataFormPresenter({
      view: this,
    });

    this.#form = document.getElementById("data-form");
    if (this.#form) {
      this.#form.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(this.#form);
        const data = Object.fromEntries(formData.entries());
        
        const numericFields = ['umur', 'aktivitasFisik', 'dailyStep', 'durasiTidur', 'stressLevel'];
        for (const field of numericFields) {
          if (data[field] !== '' && data[field] !== null && !isNaN(parseFloat(data[field]))) {
            data[field] = parseFloat(data[field]);
          } else if (data[field] === '') {
              data[field] = null; 
          }
        }

        this.#presenter.submitForm(data);
      });
    } else {
      console.error("Form with id 'data-form' not found after render.");
    }
  }

  showSuccessMessage(data) {
    console.log("Data yang berhasil disubmit:", data);
    location.hash = '/results';
  }
}

export default DataFormPage;