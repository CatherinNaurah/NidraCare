import { getActiveRoute } from '../routes/url-parser';
import { transitionHelper } from '../utils';
import { routes } from '../routes/routes';
import {
  generateAuthenticatedNavigationListTemplate,
  generateUnauthenticatedNavigationListTemplate,
  generateFooterTemplate,
} from '../templates';
import { getAccessToken, getLogout } from '../utils/auth';
import { initNavigationToggle } from '../utils/nav-toggle.js';

export default class App {
  #content;
  #navbar;
  #footer;
  #navbarHeight = 88;
  #routesWithoutNavbarPadding = ['/', '/home'];

  constructor({ content, navbar, footer }) {
    this.#content = content;
    this.#navbar = navbar;
    this.#footer = footer;
  }

  async setupNavbar() {
    if (!this.#navbar) return;

    const url = getActiveRoute();
    if (url === '/login' || url === '/register') {
      this.#navbar.style.display = 'none';
    } else {
      this.#navbar.style.display = '';
      const isAuthenticated = !!getAccessToken();

      if (isAuthenticated) {
        this.#navbar.innerHTML = generateAuthenticatedNavigationListTemplate();
        initNavigationToggle();

        const logoutButton = document.getElementById('logout-button');
        const logoutButtonMobile = document.getElementById('logout-button-mobile');

        const logoutHandler = (event) => {
          event.preventDefault();
          if (confirm('Apakah Anda yakin ingin keluar?')) {
            getLogout();
            location.hash = '/login';
          }
        };

        if (logoutButton) logoutButton.addEventListener('click', logoutHandler);
        if (logoutButtonMobile) logoutButtonMobile.addEventListener('click', logoutHandler);
      } else {
        this.#navbar.innerHTML = generateUnauthenticatedNavigationListTemplate();
        initNavigationToggle();
      }
    }
  }

  async setupFooter() {
    if (!this.#footer) return;

    const url = getActiveRoute();
    if (url === '/login' || url === '/register') {
      this.#footer.style.display = 'none';
    } else {
      this.#footer.style.display = '';
      this.#footer.innerHTML = generateFooterTemplate();
    }
  }

  #adjustMainContentPadding() {
    if (this.#navbar && this.#content) {
      const currentRoute = getActiveRoute();
      const navbarHeightToUse = this.#navbarHeight;
      const isNavbarVisible = this.#navbar.style.display !== 'none';

      if (isNavbarVisible && !this.#routesWithoutNavbarPadding.includes(currentRoute)) {
        this.#content.style.paddingTop = `${navbarHeightToUse}px`;
      } else {
        this.#content.style.paddingTop = '0px';
      }
    }
  }

  async renderPage() {
    const url = getActiveRoute();
    const route = routes[url];

    if (!route) {
      this.#content.innerHTML = '<h2>Page not found</h2>';
      await this.setupNavbar();
      await this.setupFooter();
      this.#adjustMainContentPadding();
      return;
    }

    const page = route();
    if (!page) return;

    const transition = transitionHelper({
      updateDOM: async () => {
        if (!page || !page.render) return;
        this.#content.innerHTML = await page.render();
        if (typeof page.afterRender === 'function') {
          await page.afterRender();
        }
      },
    });

    transition.ready.catch(console.error);
    transition.updateCallbackDone.then(async () => {
      scrollTo({ top: 0, behavior: 'instant' });
      await this.setupNavbar();
      await this.setupFooter();
      this.#adjustMainContentPadding();
    });
  }
}
