import { getActiveRoute } from '../routes/url-parser';
import { transitionHelper } from '../utils';
import { routes } from '../routes/routes';
import { generateUnauthenticatedNavigationListTemplate } from '../templates';

export default class App {
  #content;
  #navbar;

  constructor({ content, navbar }) {
    this.#content = content;
    this.#navbar = navbar;
  }

  async setupNavbar() {
    this.#navbar.innerHTML = generateUnauthenticatedNavigationListTemplate();
  }

  async renderPage() {
    const url = getActiveRoute();
    const route = routes[url];

    if (!route) {
      this.#content.innerHTML = '<h2>Page not found</h2>';
      return;
    }

    const page = route();

    const transition = transitionHelper({
      updateDOM: async () => {
        if (!page || !page.render) return;
        this.#content.innerHTML = await page.render();
        page.afterRender();
      },
    });

    transition.ready.catch(console.error);
    transition.updateCallbackDone.then(() => {
      scrollTo({ top: 0, behavior: 'instant' });
      this.setupNavbar();
    });
  }
}
