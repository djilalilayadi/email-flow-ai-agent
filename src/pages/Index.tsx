
import { useEffect, useState } from "react";
import Dashboard from "@/components/Dashboard";
import LoginPage from "@/components/LoginPage";
import { useToast } from "@/components/ui/use-toast";
import { getStoredAuthToken, handleGoogleCallback, fetchUserProfile } from "@/lib/authUtils";
import { UserProfile } from "@/lib/types";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if user is coming back from OAuth redirect
    const checkOAuthCallback = async () => {
      if (window.location.hash.includes("access_token")) {
        console.log("OAuth callback detected");
        const token = handleGoogleCallback();
        if (token) {
          setIsAuthenticated(true);
          toast({
            title: "Login successful!",
            description: "You've been authenticated with Google",
          });
          
          try {
            const profile = await fetchUserProfile();
            setUserProfile(profile);
          } catch (error) {
            console.error("Error fetching profile:", error);
            setAuthError("Failed to fetch user profile");
            toast({
              title: "Error",
              description: "Failed to fetch user profile",
              variant: "destructive",
            });
          }
        } else {
          console.error("No token found in callback");
          setAuthError("No authentication token received");
          toast({
            title: "Login failed",
            description: "No authentication token received from Google",
            variant: "destructive",
          });
        }
      } else if (window.location.hash.includes("error")) {
        console.error("OAuth error in URL hash:", window.location.hash);
        const errorParams = new URLSearchParams(window.location.hash.substring(1));
        const errorMessage = errorParams.get("error_description") || "Authentication error";
        setAuthError(errorMessage);
        toast({
          title: "Login failed",
          description: errorMessage,
          variant: "destructive",
        });
      }
    };
    
    // Check if user is already authenticated
    const checkAuth = async () => {
      const token = getStoredAuthToken();
      console.log("Checking authentication, token exists:", !!token);
      
      if (token) {
        try {
          // Validate the token by fetching user profile
          console.log("Validating token by fetching user profile");
          const profile = await fetchUserProfile();
          setUserProfile(profile);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Auth token invalid:", error);
          // If token is invalid, remove it
          localStorage.removeItem('email-organizer-auth-token');
        }
      }
      
      setIsLoading(false);
    };
    
    // We still check for redirect-based auth (for backward compatibility)
    // but primary auth will now happen through popup
    checkOAuthCallback().then(() => {
      if (!isAuthenticated) {
        checkAuth();
      } else {
        setIsLoading(false);
      }
    });
  }, [toast]);
  
  // When user authenticates via popup in LoginPage
  const handleAuthentication = async (isAuth: boolean) => {
    if (isAuth) {
      setIsAuthenticated(true);
      try {
        const profile = await fetchUserProfile();
        setUserProfile(profile);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 rounded-full bg-primary mb-4"></div>
          <div className="h-4 w-32 bg-muted rounded"></div>
        </div>
      </div>
    );
  }
  
  return isAuthenticated ? (
    <Dashboard userProfile={userProfile} />
  ) : (
    <LoginPage 
      setIsAuthenticated={handleAuthentication} 
      authError={authError}
    />
  );
};

export default Index;
