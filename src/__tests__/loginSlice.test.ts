import loginReducer, { setAuthenticated,
    setAccessToken,
    setRefreshToken,
    setError,
    setIsLoading,
    clearAuthData,
    initialState } from '../services/slices/loginSlice';

import { it, describe, expect } from 'vitest';

describe('Login Slice reducer', () => {
    const getFreshState = () => structuredClone(initialState);
    const accessTokenExample = 'Bearer r43nr4nrfnv34onfwoifn4ofn3o4nfn34oifn';
    const refreshTokenExample = 'r43nr4nrfnv34onfwoifn4ofn3o4nfn34oifn';
    const errorMsg = 'Error';
    const mockData = {
        isAuthenticated: true,
        accessToken: accessTokenExample,
        refreshToken: refreshTokenExample,
        error: '',
        isLoading: false,
    }

    it('Should return the initial state by default', () => {
      const state = loginReducer(undefined, { type: '' });
      expect(state).toEqual(initialState);
    });

    it('Should be authenticated', () => {
        const state = loginReducer(getFreshState(), setAuthenticated(true));
        expect(state.isAuthenticated).toBe(true);
    });
    
    it('Should set access token', () => {
        const state = loginReducer(getFreshState(), setAccessToken(accessTokenExample));
        expect(state.accessToken).toBe(accessTokenExample);
    });
    
    it('Should set refresh token', () => {
        const state = loginReducer(getFreshState(), setRefreshToken(refreshTokenExample));
        expect(state.refreshToken).toBe(refreshTokenExample);
    });
    
    it('Should set error', () => {
        const state = loginReducer(getFreshState(), setError(errorMsg));
        expect(state.error).toBe(errorMsg);
    });
    
    it('Should be in loading process', () => {
        const state = loginReducer(getFreshState(), setIsLoading(true));
        expect(state.isLoading).toBe(true);
    });
    
    it('Should clear data', () => {
        const state = loginReducer(mockData, clearAuthData());
        expect(state).toEqual(initialState);
    });
});
