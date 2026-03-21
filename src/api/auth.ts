import { apiFetch } from './client';

type LoginResponse = {
  email: string;
  token: string;
};

export function loginWithPassword(email: string, password: string) {
  return apiFetch<LoginResponse>('/v1/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
    }),
  });
}
