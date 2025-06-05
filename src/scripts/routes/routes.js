import RegisterPage from '../pages/auth/register/page';
import LoginPage from '../pages/auth/login/page';
import HomePage from '../pages/home/page';
import InfoPage from '../pages/info/page';
import DataFormPage from '../pages/form/data-form-page.js'; 
import ResultsPage from '../pages/results/results-page.js'; 
import { checkAuthenticatedRoute, checkUnauthenticatedRouteOnly } from '../utils/auth';

export const routes = {
  '/login': () => checkUnauthenticatedRouteOnly(new LoginPage()),
  '/register': () => checkUnauthenticatedRouteOnly(new RegisterPage()),
  '/info': () => checkUnauthenticatedRouteOnly(new InfoPage()),
  '/home': () => checkAuthenticatedRoute(new HomePage()),

  '/form': () => checkUnauthenticatedRouteOnly(new DataFormPage()),
  '/results': () => checkUnauthenticatedRouteOnly(new ResultsPage()),

  '/': () => checkUnauthenticatedRouteOnly(new HomePage()), 
};