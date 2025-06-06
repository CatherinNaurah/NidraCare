import { parseJwt } from '../../../utils/auth';

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

      if (!response.ok) {
        this.#view.loginFailed(response.message || 'Login gagal');
        return;
      }

      const { token } = response;
      if (token && this.#authModel) {
        this.#authModel.putAccessToken(token);

        const userInfo = parseJwt(token);

        if (userInfo && typeof this.#authModel.putUserInfo === 'function') {
          this.#authModel.putUserInfo(userInfo);
          this.#view.loginSuccessfully(response.message, userInfo);
        } else {
          throw new Error('Gagal mem-parse atau menyimpan info pengguna dari token.');
        }
      } else {
         throw new Error('Token tidak ditemukan dalam respons login.');
      }

    } catch (error) {
      console.error('getLogin: error:', error);
      this.#view.loginFailed(error.message || 'Terjadi kesalahan pada server.');
    } finally {
      this.#view.hideSubmitLoadingButton();
    }
  }
}