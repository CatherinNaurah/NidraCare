import Presenter from './presenter';
import * as API from '../../data/api';

export default class Page {
  #presenter = null;

  async render() {
    return `
      <section>
        <h2>Home Page</h2>
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
