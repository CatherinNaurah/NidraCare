import { getActiveRoute } from '../routes/url-parser';
import { ACCESS_TOKEN_KEY, USER_INFO_KEY } from '../config';

export function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Gagal mem-parse token:", error);
    return null;
  }
}

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function putAccessToken(token) {
  return localStorage.setItem(ACCESS_TOKEN_KEY, token);
}

export function putUserInfo(userInfo) {
  const userInfoString = JSON.stringify(userInfo);
  return localStorage.setItem(USER_INFO_KEY, userInfoString);
}

export function getUserInfo() {
  try {
    const userInfoString = localStorage.getItem(USER_INFO_KEY);
    return JSON.parse(userInfoString);
  } catch (error) {
    console.error('Gagal mendapatkan info pengguna:', error);
    return null;
  }
}

function removeUserInfo() {
  return localStorage.removeItem(USER_INFO_KEY);
}

function removeAccessToken() {
  return localStorage.removeItem(ACCESS_TOKEN_KEY);
}

export function getLogout() {
  removeAccessToken();
  removeUserInfo(); 
}

const unauthenticatedRoutesOnly = ['/login', '/register'];

export function checkUnauthenticatedRouteOnly(page) {
  const url = getActiveRoute();
  const isLogin = !!getAccessToken();

  if (unauthenticatedRoutesOnly.includes(url) && isLogin) {
    location.hash = '/';
    return null;
  }

  return page;
}

export function checkAuthenticatedRoute(page) {
  const isLogin = !!getAccessToken();

  if (!isLogin) {
    location.hash = '/login';
    return null;
  }

  return page;
}