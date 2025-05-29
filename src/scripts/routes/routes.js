import RegisterPage from '../pages/auth/register/page';
import LoginPage from '../pages/auth/login/page';
import HomePage from '../pages/home/page';
import Nidracare from '../pages/nidracare/page';
import InfoPage from '../pages/info/page';
import { checkAuthenticatedRoute, checkUnauthenticatedRouteOnly } from '../utils/auth';

export const routes = {
  '/login': () => checkUnauthenticatedRouteOnly(new LoginPage()),
  '/register': () => checkUnauthenticatedRouteOnly(new RegisterPage()),
  '/nidracare': () => checkUnauthenticatedRouteOnly(new Nidracare()),
  '/info': () => checkUnauthenticatedRouteOnly(new InfoPage()),
  '/home': () => checkAuthenticatedRoute(new HomePage()),

  '/': () => checkUnauthenticatedRouteOnly(new HomePage()),
};
