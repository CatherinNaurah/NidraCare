import ResultsPresenter from "./results-presenter.js";
import { getUserInfo } from "../../utils/auth";
import insomniaImage from '../../assets/images/insomnia-predict.jpg';
import sleepApneaImage from '../../assets/images/sleep-apnea-predict.jpg';
import normalImage from '../../assets/images/normal-sleep-predict.jpg';

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
    const { durasiTidur, dailyStep, stressLevel, umur, jenisKelamin, aktivitasFisik, kategoriBmi } = this.#formData;
    
    const { predicted_class = "Data Tidak Ditemukan", confidence = 0 } = this.#prediction;

    const DESCRIPTIONS = {
      'Insomnia': '<strong class="font-bold text-[#040A42]">Insomnia</strong> adalah gangguan tidur yang ditandai dengan kesulitan untuk tertidur, tetap tertidur, atau bangun terlalu cepat dan tidak bisa kembali tidur. Gangguan ini dapat menyebabkan kelelahan, gangguan konsentrasi, dan mempengaruhi produktivitas harian. Insomnia dapat bersifat jangka pendek (akut) atau jangka panjang (kronis).',
      'Sleep Apnea': '<strong class="font-bold text-[#040A42]">Sleep Apnea</strong> adalah gangguan tidur serius yang terjadi ketika pernapasan seseorang terhenti secara berulang selama tidur. Hal ini menyebabkan otak dan tubuh kekurangan oksigen, yang dapat berdampak pada kesehatan jantung dan sistem pernapasan. Sleep apnea sering tidak disadari penderitanya karena terjadi saat tidur.',
      'Normal': '<strong class="font-bold text-[#040A42]">Tidur normal</strong> adalah kondisi di mana seseorang dapat tertidur dengan mudah, tetap tertidur sepanjang malam, dan bangun dengan perasaan segar. Pola tidur yang sehat membantu menjaga keseimbangan energi, konsentrasi, suasana hati, serta mendukung fungsi tubuh dan otak secara optimal.',
      'Data Tidak Ditemukan': 'Deskripsi tidak tersedia karena data hasil prediksi tidak dapat ditemukan. Silakan isi formulir terlebih dahulu.'
    };

    const IMAGES = {
      'Insomnia': insomniaImage,
      'Sleep Apnea': sleepApneaImage,
      'Normal': normalImage
    };

    const bmiDisplayText = {
      'Normal': 'Underweight',
      'Normal Weight': 'Healthy Weight',
      'Overweight': 'Overweight',
      'Obese': 'Obesity'
    };

    const dynamicDescription = DESCRIPTIONS[predicted_class] || DESCRIPTIONS['Data Tidak Ditemukan'];
    const dynamicImage = IMAGES[predicted_class];

    let durasiTidurMetric = {
      title: "Durasi Tidur",
      value: durasiTidur ? `${durasiTidur} Jam` : "N/A",
      description: durasiTidur >= 7 ? "Pertahankan!" : "Tingkatkan jam tidurmu!",
      colorClass: durasiTidur >= 7 ? "text-green-500" : "text-red-500",
    };

    let langkahHarianMetric = {
      title: "Langkah Harian",
      value: dailyStep ? `${dailyStep} Langkah` : "N/A",
      description: dailyStep >= 7000 ? "Pertahankan!" : "Tingkatkan aktivitas harianmu!",
      colorClass: dailyStep >= 7000 ? "text-green-500" : "text-red-500",
    };

    let stressLevelMetric = {
      title: "Stress Level",
      value: stressLevel ? stressLevel.toString() : "N/A",
      description: stressLevel < 5 ? "Pertahankan!" : "Relaksasikan Pikiranmu!",
      colorClass: stressLevel < 5 ? "text-green-500" : "text-red-500",
    };

    let dynamicSaran = [];
    const isLangkahHarianRed = langkahHarianMetric.colorClass === 'text-red-500';
    const isStressLevelRed = stressLevelMetric.colorClass === 'text-red-500';
    const isDurasiTidurRed = durasiTidurMetric.colorClass === 'text-red-500';

    if (predicted_class === 'Data Tidak Ditemukan') {
      dynamicSaran.push('Silakan isi formulir terlebih dahulu.');
    } else {
      if (predicted_class === 'Normal') {
        const allMetricsGreen = !isLangkahHarianRed && !isStressLevelRed && !isDurasiTidurRed;

        if (allMetricsGreen) {
          dynamicSaran.push('Saat ini, Anda tampaknya memiliki pola hidup yang sehat dan pola tidur yang baik. Untuk menjaga kondisi ini, usahakan untuk tetap konsisten dengan jadwal tidur dan hindari kebiasaan yang bisa mengganggu kualitas tidur Anda, seperti begadang dan bermain ponsel hingga larut malam');
        } else {
          dynamicSaran.push('Pastikan kamar tidur tenang, sejuk, dan nyaman');
        }
      } else if (predicted_class === 'Insomnia') {
        dynamicSaran.push('Hindari layar gadget dan kafein minimal 1 jam sebelum tidur');
      } else if (predicted_class === 'Sleep Apnea') {
        dynamicSaran.push('Tidurlah dengan posisi menyamping untuk mencegah saluran napas tertutup saat tidur');
        dynamicSaran.push('Segera periksakan diri ke dokter jika sering mendengkur keras atau terbangun tiba-tiba saat tidur');
      }

      if (isDurasiTidurRed) {
        dynamicSaran.push('Tetapkan jadwal tidur yang konsisten setiap hari');
      }
      if (isLangkahHarianRed) {
        dynamicSaran.push('Lakukan aktivitas fisik ringan seperti berjalan kaki atau stretching');
        dynamicSaran.push('Gunakan tangga dibandingkan lift atau eskalator');
      }
      if (isStressLevelRed) {
        dynamicSaran.push('Luangkan waktu untuk relaksasi setiap hari'); 
        dynamicSaran.push('Kurangi paparan informasi negatif berlebihan');
      }
    }

    const resultData = {
      condition: predicted_class,
      confidence: (confidence * 100).toFixed(1),
      personalData: {
        "Usia": umur ? `${umur} Tahun` : "Data tidak tersedia",
        "Jenis Kelamin": jenisKelamin || "Data tidak tersedia",
        "Aktivitas Fisik": aktivitasFisik ? `${aktivitasFisik} Menit` : "Data tidak tersedia",
        "Durasi Tidur": durasiTidur ? `${durasiTidur} Jam` : "Data tidak tersedia",
        "Langkah Harian": dailyStep ? `${dailyStep} Langkah` : "Data tidak tersedia",
        "Stress Level": stressLevel ? stressLevel.toString() : "Data tidak tersedia",
        "Kategori BMI": bmiDisplayText[kategoriBmi] || kategoriBmi || "Data tidak tersedia",
      },
      description: dynamicDescription,
      metrics: { 
        durasiTidur: durasiTidurMetric,
        langkahHarian: langkahHarianMetric,
        stressLevel: stressLevelMetric,
      },
      saran: dynamicSaran,
    };

    return `
      <div class="font-sans bg-[#E4E6F9] text-slate-800 p-5 md:p-10 min-h-screen">
        <div class="w-full max-w-6xl mx-auto">
          <h1 class="text-3xl font-semibold mb-8">Berdasarkan data yang Anda masukkan, Anda terindikasi mengalami:</h1>
          
          <div class="flex flex-col gap-5">
            <div class="grid gap-5 md:grid-cols-10">
              <div class="bg-white text-slate-800 rounded-2xl shadow-lg overflow-hidden flex flex-col text-center md:col-span-4">
                <div class="p-6 flex-grow">
                
                  ${dynamicImage 
                    ? `<img src="${dynamicImage}" alt="Ilustrasi ${resultData.condition}" class="w-[150px] h-[150px] rounded-full object-cover mx-auto" />`
                    : `<div class="w-[150px] h-[150px] bg-slate-200 rounded-full flex items-center justify-center text-slate-400 italic mx-auto">Gambar tidak tersedia</div>`
                  }

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
                 <p class="leading-relaxed">${resultData.description}</p>
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
        <div class="flex justify-center mt-10">
         <a href="#/home">
         <button class="bg-[#5366c7] hover:bg-[#4254a0] text-white font-semibold py-2 px-6 rounded-xl shadow-md transition-colors duration-300">
         Kembali ke Beranda
        </button>
        </a>
      </div>
      </div>
    `;
  }

  afterRender() {
    this.#presenter = new ResultsPresenter({ view: this });
  }
}

export default ResultsPage;