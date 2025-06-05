class DataFormPresenter {
  #view;
  static #HEALTH_FORM_DATA_KEY = 'healthFormData';

  constructor({ view }) {
    this.#view = view;
  }

  async submitForm(data) {
    console.log('Presenter menerima data untuk diproses:', data);

    try {
      localStorage.setItem(DataFormPresenter.#HEALTH_FORM_DATA_KEY, JSON.stringify(data));
      console.log('Data disimpan ke localStorage:', data);

      this.#view.showSuccessMessage(data);

    } catch (error) {
      console.error('Gagal menyimpan data ke localStorage atau memproses:', error);
      alert('Terjadi kesalahan saat menyimpan data.');
    }
  }
}

export default DataFormPresenter;