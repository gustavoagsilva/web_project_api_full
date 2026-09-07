export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export function request(url, options) {
  return fetch(url, options).then(async (response) => {
    const body = await response.json().catch(() => null);

    if (!response.ok) {
      const error = new Error(body?.message || `Erro: ${response.status}`);
      error.status = response.status;
      throw error;
    }

    return body;
  });
}
