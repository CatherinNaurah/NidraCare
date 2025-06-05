import { getActiveRoute } from '../routes/url-parser';
import { transitionHelper } from '../utils';
import { routes } from '../routes/routes';
import { generateUnauthenticatedNavigationListTemplate, generateFooterTemplate } from '../templates';
import { getAccessToken, getLogout } from '../utils/auth';

export default class App {
  #content;
  #navbar;
  #footer;
  #navbarHeight = 88; 
  #routesWithoutNavbarPadding = ['/']; 

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
      this.#navbar.innerHTML = generateUnauthenticatedNavigationListTemplate();

      const logoutButton = document.getElementById('logout-button');
      if (logoutButton) {
        logoutButton.addEventListener('click', (event) => {
          event.preventDefault();
          if (confirm('Apakah Anda yakin ingin keluar?')) {
            getLogout();
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
      this.setupNavbar(); 
      this.setupFooter();
      this.#adjustMainContentPadding(); 
      return;
    }

    const page = route();

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