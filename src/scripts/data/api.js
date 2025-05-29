import axios from 'axios';
import { BASE_URL } from '../config';

const ENDPOINTS = {
  LOGIN: `${BASE_URL}/api/login`,
  REGISTER: `${BASE_URL}/api/register`,
  MY_USER_INFO: `${BASE_URL}/users/me`,
};

// Fungsi untuk mendaftarkan pengguna baru dengan username dan password
export async function getRegistered({ username, password }) {
  const data = JSON.stringify({ username, password });

  const fetchResponse = await fetch(ENDPOINTS.REGISTER, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: data,
  });

  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

// Fungsi untuk melakukan login pengguna dengan username dan password
// Fungsi untuk melakukan login pengguna
export async function getLogin({ username, password }) {
  const data = JSON.stringify({ username, password });

  const fetchResponse = await fetch(ENDPOINTS.LOGIN, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: data,
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}



// Fungsi untuk mendapatkan data pengguna yang sedang login
export async function getMyUserInfo() {
  const accessToken = getAccessToken();

  const fetchResponse = await fetch(ENDPOINTS.MY_USER_INFO, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}