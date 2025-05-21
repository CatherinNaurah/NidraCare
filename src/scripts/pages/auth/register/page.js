import Presenter from './presenter';
import * as API from '../../../data/api';

export default class Page {
  #presenter = null;

  async render() {
    return `
      <section class="mt-4">
        <h2 class="text-5xl w-full flex justify-center">Register Page</h2>
      </section>
    `;
  }

  async afterRender() {
    this.#presenter = new Presenter({
      view: this,
      model: API,
    });
  }
}
