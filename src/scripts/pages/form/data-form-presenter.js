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

      const predictionResponse = await predictSleepDisorder(payload);
      if (!predictionResponse.ok) {
        const errorDetail = predictionResponse.detail ? JSON.stringify(predictionResponse.detail) : predictionResponse.message;
        throw new Error(errorDetail || "Gagal mendapatkan prediksi dari server.");
      }
      
      const resultData = {
        prediction: predictionResponse,
        originalForm: formData,
      };

      const userSpecificKey = `${DataFormPresenter.#PREDICTION_KEY_PREFIX}_${userId}`;
      
      localStorage.setItem(userSpecificKey, JSON.stringify(resultData));
      
      this.#view.showSuccessMessage();

    } catch (error) {
      console.error('Terjadi kesalahan saat memproses form:', error);
      alert(`Terjadi kesalahan: ${error.message}`);
    } finally {
      this.#setLoading(false);
    }
  }

  #setLoading(isLoading) {
    if (this.#submitButton) {
      this.#submitButton.disabled = isLoading;
      this.#submitButton.innerHTML = isLoading ? 'Memproses...' : 'Simpan & Lihat Hasil';
    }
  }
}

export default DataFormPresenter;