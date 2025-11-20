import { describe, it, expect } from 'vitest';
import { API_CONFIG } from './api';

describe('API_CONFIG', () => {
  it('debe usar la base url desde import.meta.env', () => {
    expect(API_CONFIG.BASE_URL).toBe(import.meta.env.VITE_API_BASE_URL);
  });

  it('debe tener las rutas relativas correctas', () => {
    expect(API_CONFIG.PLANS).toBe('/api/plans.json');
    expect(API_CONFIG.USER).toBe('/api/user.json');
  });

  it('debe formar correctamente las URLs completas usando la base URL', () => {
    const plansUrl = `${API_CONFIG.BASE_URL}${API_CONFIG.PLANS}`;
    const userUrl = `${API_CONFIG.BASE_URL}${API_CONFIG.USER}`;

    expect(plansUrl).toBe(
      `${import.meta.env.VITE_API_BASE_URL}/api/plans.json`
    );
    expect(userUrl).toBe(
      `${import.meta.env.VITE_API_BASE_URL}/api/user.json`
    );
  });
});
