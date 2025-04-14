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

// Google OAuth client ID from Google Developer Console
const GOOGLE_CLIENT_ID = "596429290799-sdas9qvelc3pgni7tm96rv9t0jr36r87.apps.googleusercontent.com";
const GOOGLE_REDIRECT_URI = window.location.origin;

// Scopes needed for Gmail access
const GMAIL_SCOPES = [
  "https://www.googleapis.com/auth/gmail.readonly",
  "https://www.googleapis.com/auth/gmail.labels",
  "https://www.googleapis.com/auth/gmail.modify",
  "profile",
  "email"
].join(" ");

export const initiateGoogleLogin = (): void => {
  // Create the OAuth URL
  const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  authUrl.searchParams.append("client_id", GOOGLE_CLIENT_ID);
  authUrl.searchParams.append("redirect_uri", GOOGLE_REDIRECT_URI);
  authUrl.searchParams.append("response_type", "token");
  authUrl.searchParams.append("scope", GMAIL_SCOPES);
  authUrl.searchParams.append("prompt", "select_account");
  authUrl.searchParams.append("access_type", "offline");
  
  // Redirect to Google's OAuth page
  window.location.href = authUrl.toString();
};

export const handleGoogleCallback = (): string | null => {
  // Extract token from URL after OAuth redirect
  const hash = window.location.hash.substring(1);
  const params = new URLSearchParams(hash);
  const accessToken = params.get("access_token");
  
  if (accessToken) {
    storeAuthToken(accessToken);
    // Clear the URL hash to remove the token
    window.history.replaceState(null, "", window.location.pathname);
    return accessToken;
  }
  
  return null;
};

export const loginWithGoogle = async (): Promise<void> => {
  // Start the OAuth flow
  initiateGoogleLogin();
};

export const logoutUser = (): void => {
  removeAuthToken();
};

// Function to fetch user profile once authenticated
export const fetchUserProfile = async (): Promise<any> => {
  const token = getStoredAuthToken();
  if (!token) {
    throw new Error("Not authenticated");
  }
  
  const response = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    throw new Error("Failed to fetch user profile");
  }
  
  return await response.json();
};
