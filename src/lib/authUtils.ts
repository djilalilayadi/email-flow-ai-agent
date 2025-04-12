
const AUTH_TOKEN_KEY = 'email-organizer-auth-token';

export const storeAuthToken = (token: string): void => {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
};

export const getStoredAuthToken = (): string | null => {
  return localStorage.getItem(AUTH_TOKEN_KEY);
};

export const removeAuthToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
};

export const loginWithGoogle = async (): Promise<string> => {
  // In a real app, we would interact with Google OAuth API
  // For this demo, we'll mock a successful login
  await new Promise(resolve => setTimeout(resolve, 1000));
  return "mock-google-token-" + Math.random().toString(36).substring(2);
};

export const logoutUser = (): void => {
  removeAuthToken();
};
