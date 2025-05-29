import { getActiveRoute } from '../routes/url-parser';
import { transitionHelper } from '../utils';
import { routes } from '../routes/routes';
import { generateUnauthenticatedNavigationListTemplate, generateFooterTemplate } from '../templates';
import { getAccessToken, getLogout } from '../utils/auth';

export default class App {
  #content;
  #navbar;
  #footer;

  constructor({ content, navbar, footer }) {
    this.#content = content;
    this.#navbar = navbar;
    this.#footer = footer
  }

async setupNavbar() {
  if (!this.#navbar) return;

  const url = getActiveRoute();
  if (url === '/login' || url === '/register') {
    this.#navbar.style.display = 'none';
  } else {
    this.#navbar.style.display = '';
    this.#navbar.innerHTML = generateUnauthenticatedNavigationListTemplate();

    // Tambah listener tombol logout setelah HTML terpasang
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
      logoutButton.addEventListener('click', (event) => {
        event.preventDefault(); // Mencegah navigasi default (optional)

        if (confirm('Apakah Anda yakin ingin keluar?')) {
          getLogout(); // Fungsi hapus token/session
          location.hash = '/login';
        }
      });
    }
  }
}

  async setupFooter() {
    if (!this.#footer) return;
    
    const url = getActiveRoute();
    if (url === '/login' || url === '/register') {
      if (this.#footer) this.#footer.style.display = 'none';
    } else {
      if (this.#footer) {
        this.#footer.style.display = '';
        this.#footer.innerHTML = generateFooterTemplate();
      }
    }
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

      // setup navbar & footer
      this.setupNavbar();
      this.setupFooter();
    });
  }
}
