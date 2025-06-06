import axios from 'axios';
import { BASE_URL } from '../config';
import { ML_API_BASE_URL } from '../config';
import { getAccessToken } from '../utils/auth'; 

const ENDPOINTS = {
  LOGIN: `${BASE_URL}/api/login`,
  REGISTER: `${BASE_URL}/api/register`,
  PREDICT_DISORDER: `${ML_API_BASE_URL}/predict`, 
};

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

export async function getLogin({ username, password }) {
  const data = JSON.stringify({ username, password });

  const fetchResponse = await fetch(ENDPOINTS.LOGIN, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: data,
  });
  const json = await fetchResponse.json();

  if (!fetchResponse.ok) {
    return { ...json, ok: false };
  }
  
  return {
    ...json,
    ok: true,
  };
}

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

export async function predictSleepDisorder(payload) {
  const response = await fetch(ENDPOINTS.PREDICT_DISORDER, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Terjadi kesalahan pada server dengan status: ${response.status}`);
  }

  const json = await response.json();

  return {
    ...json,
    ok: response.ok,
  };
}