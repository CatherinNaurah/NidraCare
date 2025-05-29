export default class Presenter {
  #view;
  #model;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

  async getRegistered({ username, password }) {
    this.#view.showSubmitLoadingButton();

    try {
      const response = await this.#model.getRegistered({ username, password });

      if (!response.ok) {
        console.error('getRegistered failed:', response);
        this.#view.registeredFailed(response.error || 'Pendaftaran gagal.');
        return;
      }

      this.#view.registeredSuccessfully(response.message, response.user);
    } catch (error) {
      console.error('getRegistered: error:', error);
      this.#view.registeredFailed(error.message || 'Terjadi kesalahan saat mendaftar.');
    } finally {
      this.#view.hideSubmitLoadingButton();
    }
  }
}
