import { vi, describe, it, expect, beforeAll } from 'vitest';

globalThis.localStorage = {
  getItem: vi.fn(() => 'accessToken'),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  key: vi.fn(),
  length: 0,
} as unknown as Storage;

describe('authSlice', () => {
// Иначе ломается - не видит localStorage
  let authReducer: any;
  let setAuthChecked: any;
  let setAuthenticated: any;
  let setAccessToken: any;
  let logout: any;
  let initialState: any;

  beforeAll(async () => {
    const slice = await import('../services/slices/authSlice');
    authReducer = slice.default;
    setAuthChecked = slice.setAuthChecked;
    setAuthenticated = slice.setAuthenticated;
    setAccessToken = slice.setAccessToken;
    logout = slice.logout;
    initialState = slice.initialState;
  });

  const getFreshState = () => structuredClone(initialState);

  it('Should return the initial state by default', () => {
    const state = authReducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  it('Should set isAuthChecked', () => {
    const state = authReducer(getFreshState(), setAuthChecked(true));
    expect(state.isAuthChecked).toBe(true);
  });

  it('Should set isAuthenticated', () => {
    const state = authReducer(getFreshState(), setAuthenticated(true));
    expect(state.isAuthenticated).toBe(true);
  });

  it('Should set access token', () => {
    const token = 'Bearer ergrt158v61fgrt46r89tg1erf8f4ef'

    const state = authReducer(getFreshState(), setAccessToken(token));
    expect(state.accessToken).toBe(token);
  });

  it('Should logout', () => {
    const mockInitial = {
      isAuthChecked: false,
      isAuthenticated: true,
      accessToken: 'token'
    };

    const expected = {
      isAuthChecked: false,
      isAuthenticated: false,
      accessToken: null
    };

    const state = authReducer(mockInitial, logout());
    expect(state).toEqual(expected);
  });
});
