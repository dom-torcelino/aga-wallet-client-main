// @ts-ignore
import { API_URL } from '@env';
import { AuthResponse } from '../types/authTypes'

export const loginWithEmailPassword = async (email: string, password: string): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/v1/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Login failed');
  }

  return response.json();
};

export const loginWithGoogle = async (accessToken: string): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/v1/auth/google`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ access_token: accessToken }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Google login failed');
  }

  return response.json();
};

export const loginWithFacebook = async (accessToken: string): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/v1/auth/facebook`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ access_token: accessToken }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Facebook login failed');
  }

  return response.json();
};
