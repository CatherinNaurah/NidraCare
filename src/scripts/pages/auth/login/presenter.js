export default class Presenter {
  #view;
  #model;
  #authModel;

  constructor({ view, model, authModel }) {
    this.#view = view;
    this.#model = model;
    this.#authModel = authModel;
  }

  async getLogin({ username, password }) {
    this.#view.showSubmitLoadingButton();

    try {
      const response = await this.#model.getLogin({ username, password });

      console.log('Login response:', response);

      if (!response.ok) {
        this.#view.loginFailed(response.message || 'Login gagal');
        return;
      }

      // Pastikan authModel tidak undefined
      if (this.#authModel && typeof this.#authModel.putAccessToken === 'function') {
        this.#authModel.putAccessToken(response.token);
      } else {
        console.warn('authModel tidak tersedia atau putAccessToken bukan function');
      }

      this.#view.loginSuccessfully(response.message);
    } catch (error) {
      console.error('getLogin: error:', error);
      this.#view.loginFailed('Terjadi kesalahan pada server.');
    } finally {
      this.#view.hideSubmitLoadingButton();
    }
  }
}
