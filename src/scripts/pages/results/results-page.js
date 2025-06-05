import ResultsPresenter from "./results-presenter.js";

class ResultsPage {
  #presenter;
  #formData = {}; 

  static #HEALTH_FORM_DATA_KEY = 'healthFormData'; 

  constructor() {
    this.#loadData();
  }

  #loadData() {
    const storedDataString = localStorage.getItem(ResultsPage.#HEALTH_FORM_DATA_KEY);
    if (storedDataString) {
      try {
        this.#formData = JSON.parse(storedDataString);
        console.log("Data loaded from localStorage for results:", this.#formData);
      } catch (error) {
        console.error("Failed to parse health data from localStorage:", error);
        this.#formData = {}; 
      }
    } else {
      console.warn("No data found in localStorage for ResultsPage. Some fields may show default/empty values.");
    }
  }

  render() {

    const resultData = {
      condition: "Sleep Apnea",
      personalData: {
        "Usia": this.#formData.umur ? `${this.#formData.umur} Tahun` : "Data tidak tersedia",
        "Jenis Kelamin": this.#formData.jenisKelamin || "Data tidak tersedia",
        "Aktivitas Fisik": this.#formData.aktivitasFisik !== null && this.#formData.aktivitasFisik !== undefined ? `${this.#formData.aktivitasFisik} Jam` : "Data tidak tersedia",
        "Langkah harian": this.#formData.dailyStep !== null && this.#formData.dailyStep !== undefined ? `${this.#formData.dailyStep} Langkah` : "Data tidak tersedia",
        "Durasi Tidur": this.#formData.durasiTidur !== null && this.#formData.durasiTidur !== undefined ? `${this.#formData.durasiTidur} Jam` : "Data tidak tersedia",
        "Stress Level": this.#formData.stressLevel !== null && this.#formData.stressLevel !== undefined ? `${this.#formData.stressLevel}` : "Data tidak tersedia",
        "Kategori BMI": this.#formData.kategoriBmi || "Data tidak tersedia",
      },
      description:
        " adalah gangguan tidur serius yang terjadi ketika pernapasan seseorang terhenti secara berulang selama tidur. Hal ini menyebabkan otak dan tubuh kekurangan oksigen, yang dapat berdampak pada kesehatan jantung dan sistem pernapasan. Sleep apnea sering tidak disadari penderitanya karena terjadi saat tidur.",
      metrics: { 
        durasiTidur: {
          title: "Durasi Tidur",
          value: this.#formData.durasiTidur !== null && this.#formData.durasiTidur !== undefined ? `${this.#formData.durasiTidur} Jam` : "N/A",
          description: "Tingkatkan jam tidurmu!", 
          colorClass: "text-red-500",
        },
        langkahHarian: {
          title: "Langkah Harian",
          value: this.#formData.dailyStep !== null && this.#formData.dailyStep !== undefined ? `${this.#formData.dailyStep} Langkah` : "N/A",
          description: "Pertahankan!",
          colorClass: "text-green-500", 
        },
        stressLevel: {
          title: "Stress Level",
          value: this.#formData.stressLevel !== null && this.#formData.stressLevel !== undefined ? this.#formData.stressLevel.toString() : "N/A",
          description: "Relaksasikan Pikiranmu!",
          colorClass: "text-orange-500",
        },
      },
      saran: [ 
        "Hindari layar gadget dan kafein minimal 1 jam sebelum tidur",
        "Ciptakan suasana kamar tidur yang tenang, gelap, dan nyaman",
        "Luangkan waktu untuk aktivitas menyenangkan dan me-time setiap hari",
        "Jika sulit tidur atau stres berlanjut, pertimbangkan untuk berkonsultasi dengan tenaga profesional",
      ],
    };

    return `
      <div class="font-sans bg-[#E4E6F9] text-slate-800 p-5 md:p-10 min-h-screen">
        <div class="w-full max-w-6xl mx-auto">
          <h1 class="text-3xl font-semibold mb-8">Berdasarkan data yang Anda masukkan, Anda terindikasi mengalami:</h1>

          <div class="flex flex-col gap-5">
            
            <div class="grid gap-5 md:grid-cols-10">
              
              <div class="bg-white text-slate-800 rounded-2xl shadow-lg overflow-hidden flex flex-col text-center md:col-span-4">
                <div class="p-6 flex-grow">
                  <div class="w-[150px] h-[150px] bg-slate-200 rounded-full flex items-center justify-center text-slate-400 italic mx-auto">Image Placeholder</div>
                  <h2 class="text-4xl mt-4 font-bold text-[#040A42]">${
                    resultData.condition
                  }</h2>
                </div>
              </div>

              <div class="bg-white text-slate-800 rounded-2xl shadow-lg overflow-hidden flex flex-col md:col-span-6">
                <div class="bg-[#040A42] text-slate-50 p-3 px-5 font-semibold text-lg text-center">Data Diri</div>
                <div class="p-5 flex-grow">
                  
                  <ul class="space-y-1 text-sm">
                    ${Object.entries(resultData.personalData)
                      .map(
                        ([key, value]) => `
                          <li>
                            <span class="font-medium inline-block w-[140px]">${key}</span>
                            <span>: ${value}</span>
                          </li>
                        `
                      )
                      .join("")}
                  </ul>

                </div>
              </div>
            </div>

            <div class="bg-white text-slate-800 rounded-2xl shadow-lg overflow-hidden flex flex-col">
              <div class="bg-[#040A42] text-slate-50 p-3 px-5 font-semibold text-lg text-center">Deskripsi</div>
              <div class="p-5 flex-grow">
                 <p class="leading-relaxed"><strong class="font-bold text-[#040A42]">${
                   resultData.condition
                 }</strong>${resultData.description}</p>
              </div>
            </div>
            
            <div class="grid gap-5 md:grid-cols-3">
              <div class="bg-white text-slate-800 rounded-2xl shadow-lg overflow-hidden flex flex-col">
                <div class="bg-[#040A42] text-slate-50 p-3 px-5 font-semibold text-lg text-center">${
                  resultData.metrics.durasiTidur.title
                }</div>
                <div class="p-5 flex-grow text-center flex flex-col justify-center items-center">
                  <div class="text-5xl font-bold mb-2 ${
                    resultData.metrics.durasiTidur.colorClass
                  }">${resultData.metrics.durasiTidur.value}</div>
                  <div class="font-medium text-sm ${
                    resultData.metrics.durasiTidur.colorClass
                  }">${resultData.metrics.durasiTidur.description}</div>
                </div>
              </div>
              <div class="bg-white text-slate-800 rounded-2xl shadow-lg overflow-hidden flex flex-col">
                <div class="bg-[#040A42] text-slate-50 p-3 px-5 font-semibold text-lg text-center">${
                  resultData.metrics.langkahHarian.title
                }</div>
                <div class="p-5 flex-grow text-center flex flex-col justify-center items-center">
                  <div class="text-5xl font-bold mb-2 ${
                    resultData.metrics.langkahHarian.colorClass
                  }">${resultData.metrics.langkahHarian.value}</div>
                  <div class="font-medium text-sm ${
                    resultData.metrics.langkahHarian.colorClass
                  }">${resultData.metrics.langkahHarian.description}</div>
                </div>
              </div>
              <div class="bg-white text-slate-800 rounded-2xl shadow-lg overflow-hidden flex flex-col">
                <div class="bg-[#040A42] text-slate-50 p-3 px-5 font-semibold text-lg text-center">${
                  resultData.metrics.stressLevel.title
                }</div>
                <div class="p-5 flex-grow text-center flex flex-col justify-center items-center">
                  <div class="text-5xl font-bold mb-2 ${
                    resultData.metrics.stressLevel.colorClass
                  }">${resultData.metrics.stressLevel.value}</div>
                  <div class="font-medium text-sm ${
                    resultData.metrics.stressLevel.colorClass
                  }">${resultData.metrics.stressLevel.description}</div>
                </div>
              </div>
            </div>

            <div class="bg-white text-slate-800 rounded-2xl shadow-lg overflow-hidden flex flex-col">
              <div class="bg-[#040A42] text-slate-50 p-3 px-5 font-semibold text-lg text-center">Saran</div>
              <div class="p-5 flex-grow">
                <ul class="list-disc list-inside space-y-3">
                  ${resultData.saran.map((item) => `<li>${item}</li>`).join("")}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>
    `;
  }

  afterRender() {
    this.#presenter = new ResultsPresenter({ view: this });
  }
}

export default ResultsPage;