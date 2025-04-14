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

// Scopes needed for Gmail access
const GMAIL_SCOPES = [
  "https://www.googleapis.com/auth/gmail.readonly",
  "https://www.googleapis.com/auth/gmail.labels",
  "https://www.googleapis.com/auth/gmail.modify",
  "profile",
  "email"
].join(" ");

// Helper to parse auth response
const parseAuthResponse = (responseUrl: string): string | null => {
  try {
    const url = new URL(responseUrl);
    const hashParams = new URLSearchParams(url.hash.substring(1));
    return hashParams.get('access_token');
  } catch (error) {
    console.error('Failed to parse auth response:', error);
    return null;
  }
};

// Open a popup window for authentication
export const initiateGoogleLoginPopup = (): Promise<string | null> => {
  return new Promise((resolve) => {
    // Create the OAuth URL with popup parameters
    const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    authUrl.searchParams.append("client_id", GOOGLE_CLIENT_ID);
    authUrl.searchParams.append("redirect_uri", window.location.origin);
    authUrl.searchParams.append("response_type", "token");
    authUrl.searchParams.append("scope", GMAIL_SCOPES);
    authUrl.searchParams.append("prompt", "consent");
    authUrl.searchParams.append("access_type", "online");
    
    console.log("Initiating Google login popup with URL:", authUrl.toString());
    
    // Open popup
    const width = 500;
    const height = 600;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;
    
    const popup = window.open(
      authUrl.toString(),
      "googleAuthPopup",
      `width=${width},height=${height},left=${left},top=${top}`
    );
    
    // Poll for popup closure and check for token
    const pollTimer = window.setInterval(() => {
      try {
        // Check if popup is closed
        if (!popup || popup.closed) {
          window.clearInterval(pollTimer);
          resolve(null);
          return;
        }
        
        // Check if we're at the redirect URI
        if (popup.location.href.includes(window.location.origin)) {
          window.clearInterval(pollTimer);
          const token = parseAuthResponse(popup.location.href);
          popup.close();
          resolve(token);
        }
      } catch (error) {
        // Accessing popup.location.href may throw cross-origin error
        // This is expected while the popup is on the Google domain
      }
    }, 500);
    
    // Backup timeout in case something goes wrong
    setTimeout(() => {
      window.clearInterval(pollTimer);
      if (popup && !popup.closed) popup.close();
      resolve(null);
    }, 120000); // 2 minute timeout
  });
};

// Legacy redirect method (keeping for reference)
export const initiateGoogleLogin = (): void => {
  // Create the OAuth URL
  const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  authUrl.searchParams.append("client_id", GOOGLE_CLIENT_ID);
  authUrl.searchParams.append("redirect_uri", window.location.origin);
  authUrl.searchParams.append("response_type", "token");
  authUrl.searchParams.append("scope", GMAIL_SCOPES);
  authUrl.searchParams.append("prompt", "consent");
  authUrl.searchParams.append("access_type", "online");
  
  console.log("Initiating Google login with URL:", authUrl.toString());
  
  // Redirect to Google's OAuth page
  window.location.href = authUrl.toString();
};

export const handleGoogleCallback = (): string | null => {
  // Extract token from URL after OAuth redirect
  const hash = window.location.hash.substring(1);
  const params = new URLSearchParams(hash);
  const accessToken = params.get("access_token");
  
  console.log("Auth callback received, hash:", hash);
  console.log("Access token:", accessToken ? "Token received" : "No token found");
  
  if (accessToken) {
    storeAuthToken(accessToken);
    // Clear the URL hash to remove the token
    window.history.replaceState(null, "", window.location.pathname);
    return accessToken;
  }
  
  return null;
};

// Updated login function to use popup instead of redirect
export const loginWithGoogle = async (): Promise<string | null> => {
  // Start the OAuth flow with popup
  const token = await initiateGoogleLoginPopup();
  
  if (token) {
    storeAuthToken(token);
    return token;
  }
  
  return null;
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
  
  console.log("Fetching user profile with token:", token.substring(0, 5) + "...");
  
  const response = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    console.error("Profile fetch failed:", response.status, response.statusText);
    throw new Error("Failed to fetch user profile");
  }
  
  const profile = await response.json();
  console.log("Profile fetched successfully:", profile.email);
  return profile;
};
