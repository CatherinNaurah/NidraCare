import ResultsPresenter from "./results-presenter.js";
import { getUserInfo } from "../../utils/auth";

class ResultsPage {
  #presenter;
  #formData = {}; 
  #prediction = {};

  static #PREDICTION_KEY_PREFIX = 'predictionResultData';

  constructor() {
    this.#loadData();
  }

  #loadData() {
    const userInfo = getUserInfo(); 

    if (!userInfo || !userInfo.id) {
      console.warn("Tidak ada pengguna yang login, tidak ada data hasil yang bisa ditampilkan.");
      return;
    }

    const userSpecificKey = `${ResultsPage.#PREDICTION_KEY_PREFIX}_${userInfo.id}`;
    const storedDataString = localStorage.getItem(userSpecificKey); 

    if (storedDataString) {
      try {
        const parsedData = JSON.parse(storedDataString);
        this.#formData = parsedData.originalForm || {};
        this.#prediction = parsedData.prediction || {};
        console.log("Data loaded from localStorage for results:", parsedData);
      } catch (error) {
        console.error("Failed to parse prediction data from localStorage:", error);
        this.#formData = {}; 
        this.#prediction = {};
      }
    } else {
      console.warn("No prediction data found in localStorage for this user.");
    }
  }

  render() {
    const { durasiTidur, dailyStep, stressLevel, umur, jenisKelamin, aktivitasFisik, kategoriBmi } = this.#formData; //
    
    const { predicted_class = "Data Tidak Ditemukan", confidence = 0 } = this.#prediction; //

    let durasiTidurMetric = {
      title: "Durasi Tidur", //
      value: durasiTidur ? `${durasiTidur} Jam` : "N/A", //
      description: durasiTidur >= 7 ? "Pertahankan!" : "Tingkatkan jam tidurmu!", //
      colorClass: durasiTidur >= 7 ? "text-green-500" : "text-red-500", //
    };

    let langkahHarianMetric = {
      title: "Langkah Harian", //
      value: dailyStep ? `${dailyStep} Langkah` : "N/A", //
      description: dailyStep >= 7000 ? "Pertahankan!" : "Tingkatkan aktivitas harianmu!", //
      colorClass: dailyStep >= 7000 ? "text-green-500" : "text-red-500", //
    };

    let stressLevelMetric = {
      title: "Stress Level", //
      value: stressLevel ? stressLevel.toString() : "N/A", //
      description: stressLevel < 5 ? "Pertahankan!" : "Relaksasikan Pikiranmu!", //
      colorClass: stressLevel < 5 ? "text-green-500" : "text-red-500", //
    };

    const resultData = {
      condition: predicted_class, //
      confidence: (confidence * 100).toFixed(1), //
      personalData: {
        "Usia": umur ? `${umur} Tahun` : "Data tidak tersedia", //
        "Jenis Kelamin": jenisKelamin || "Data tidak tersedia", //
        "Aktivitas Fisik": aktivitasFisik ? `${aktivitasFisik} Menit` : "Data tidak tersedia", //
        "Durasi Tidur": durasiTidur ? `${durasiTidur} Jam` : "Data tidak tersedia", //
        "Langkah Harian": dailyStep ? `${dailyStep} Langkah` : "Data tidak tersedia", // <-- BARIS BARU
        "Stress Level": stressLevel ? stressLevel.toString() : "Data tidak tersedia", // <-- BARIS BARU
        "Kategori BMI": kategoriBmi || "Data tidak tersedia", //
      },
      description:
        " adalah gangguan tidur serius yang terjadi ketika pernapasan seseorang terhenti secara berulang selama tidur. Hal ini menyebabkan otak dan tubuh kekurangan oksigen, yang dapat berdampak pada kesehatan jantung dan sistem pernapasan.", //
      metrics: { 
        durasiTidur: durasiTidurMetric, //
        langkahHarian: langkahHarianMetric, //
        stressLevel: stressLevelMetric, //
      },
      saran: [ 
        "Hindari layar gadget dan kafein minimal 1 jam sebelum tidur", //
        "Ciptakan suasana kamar tidur yang tenang, gelap, dan nyaman", //
        "Luangkan waktu untuk aktivitas menyenangkan dan me-time setiap hari", //
        "Jika sulit tidur atau stres berlanjut, pertimbangkan untuk berkonsultasi dengan tenaga profesional", //
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
                  <h2 class="text-4xl mt-4 font-bold text-[#040A42]">${resultData.condition}</h2>
                  <div class="text-base text-slate-500 mt-2">Tingkat Keyakinan: ${resultData.confidence}%</div>
                </div>
              </div>

              <div class="bg-white text-slate-800 rounded-2xl shadow-lg overflow-hidden flex flex-col md:col-span-6">
                <div class="bg-[#040A42] text-slate-50 p-3 px-5 font-semibold text-lg text-center">Data Diri Anda</div>
                <div class="p-5 flex-grow">
                  <ul class="space-y-1 text-base">
                    ${Object.entries(resultData.personalData).map(([key, value]) => `<li><span class="font-medium inline-block w-[140px]">${key}</span><span>: ${value}</span></li>`).join("")}
                  </ul>
                </div>
              </div>
            </div>

            <div class="bg-white text-slate-800 rounded-2xl shadow-lg overflow-hidden flex flex-col">
              <div class="bg-[#040A42] text-slate-50 p-3 px-5 font-semibold text-lg text-center">Deskripsi</div>
              <div class="p-5 flex-grow">
                 <p class="leading-relaxed"><strong class="font-bold text-[#040A42]">${resultData.condition}</strong>${resultData.description}</p>
              </div>
            </div>
            
            <div class="grid gap-5 md:grid-cols-3">
              <div class="bg-white text-slate-800 rounded-2xl shadow-lg overflow-hidden flex flex-col">
                <div class="bg-[#040A42] text-slate-50 p-3 px-5 font-semibold text-lg text-center">${resultData.metrics.durasiTidur.title}</div>
                <div class="p-5 flex-grow text-center flex flex-col justify-center items-center">
                  <div class="text-4xl font-bold mb-2 ${resultData.metrics.durasiTidur.colorClass}">${resultData.metrics.durasiTidur.value}</div>
                  <div class="font-medium text-base ${resultData.metrics.durasiTidur.colorClass}">${resultData.metrics.durasiTidur.description}</div>
                </div>
              </div>
              <div class="bg-white text-slate-800 rounded-2xl shadow-lg overflow-hidden flex flex-col">
                <div class="bg-[#040A42] text-slate-50 p-3 px-5 font-semibold text-lg text-center">${resultData.metrics.langkahHarian.title}</div>
                <div class="p-5 flex-grow text-center flex flex-col justify-center items-center">
                  <div class="text-4xl font-bold mb-2 ${resultData.metrics.langkahHarian.colorClass}">${resultData.metrics.langkahHarian.value}</div>
                  <div class="font-medium text-base ${resultData.metrics.langkahHarian.colorClass}">${resultData.metrics.langkahHarian.description}</div>
                </div>
              </div>
              <div class="bg-white text-slate-800 rounded-2xl shadow-lg overflow-hidden flex flex-col">
                <div class="bg-[#040A42] text-slate-50 p-3 px-5 font-semibold text-lg text-center">${resultData.metrics.stressLevel.title}</div>
                <div class="p-5 flex-grow text-center flex flex-col justify-center items-center">
                  <div class="text-4xl font-bold mb-2 ${resultData.metrics.stressLevel.colorClass}">${resultData.metrics.stressLevel.value}</div>
                  <div class="font-medium text-base ${resultData.metrics.stressLevel.colorClass}">${resultData.metrics.stressLevel.description}</div>
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