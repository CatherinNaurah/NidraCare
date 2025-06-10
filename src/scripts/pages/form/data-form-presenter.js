import { getUserInfo } from '../../utils/auth';
import { predictSleepDisorder } from '../../data/api';

class DataFormPresenter {
  #view;
  #form;
  #submitButton;
  static #PREDICTION_KEY_PREFIX = 'predictionResultData';

  constructor({ view, form, submitButton }) {
    this.#view = view;
    this.#form = form;
    this.#submitButton = submitButton;
  }

  async submitForm(formData) {
    this.#setLoading(true);

    const maxRetries = 2; 
    let lastError = null;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const userInfo = getUserInfo();
        
        if (!userInfo || !userInfo.id) {
          throw new Error("ID Pengguna tidak ditemukan. Silakan login kembali.");
        }
        const userId = userInfo.id;
        
        const payload = {
          user_id: userId,
          gender: formData.jenisKelamin === 'Perempuan' ? 'female' : 'male',
          age: formData.umur,
          sleep_duration: formData.durasiTidur,
          sleep_quality: formData.kualitasTidur,          
          physical_activity_duration: formData.aktivitasFisik, 
          stress_level: formData.stressLevel,
          bmi_category: formData.kategoriBmi, 
          steps_per_day: formData.dailyStep,               
        };

        console.log(`Mencoba submit, percobaan ke-${attempt}`);
        const predictionResponse = await predictSleepDisorder(payload);
        
        const resultData = {
          prediction: predictionResponse,
          originalForm: formData,
        };
        const userSpecificKey = `${DataFormPresenter.#PREDICTION_KEY_PREFIX}_${userId}`;
        localStorage.setItem(userSpecificKey, JSON.stringify(resultData));
        
        this.#view.showSuccessMessage();

        lastError = null;
        break; 

      } catch (error) {
        lastError = error;
        console.warn(`Percobaan ke-${attempt} gagal:`, error.message);

        if (attempt < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
    }

    if (lastError) {
      console.error('Gagal memproses form setelah semua percobaan:', lastError);
      alert(`Terjadi kesalahan saat memproses form: ${lastError.message}`);
    }

    this.#setLoading(false);
  }

  #setLoading(isLoading) {
    if (this.#submitButton) {
      this.#submitButton.disabled = isLoading;
      this.#submitButton.innerHTML = isLoading ? 'Memproses...' : 'Simpan & Lihat Hasil';
    }
  }
}

export default DataFormPresenter;