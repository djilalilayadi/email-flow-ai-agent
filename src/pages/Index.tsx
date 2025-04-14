
import { useEffect, useState } from "react";
import Dashboard from "@/components/Dashboard";
import LoginPage from "@/components/LoginPage";
import { useToast } from "@/components/ui/use-toast";
import { getStoredAuthToken, handleGoogleCallback, fetchUserProfile } from "@/lib/authUtils";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<any>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if user is coming back from OAuth redirect
    const checkOAuthCallback = async () => {
      if (window.location.hash.includes("access_token")) {
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
          }
        }
      }
    };
    
    // Check if user is already authenticated
    const checkAuth = async () => {
      const token = getStoredAuthToken();
      
      if (token) {
        try {
          // Validate the token by fetching user profile
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
    
    checkOAuthCallback().then(() => {
      if (!isAuthenticated) {
        checkAuth();
      } else {
        setIsLoading(false);
      }
    });
  }, [toast]);
  
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
    <LoginPage setIsAuthenticated={setIsAuthenticated} />
  );
};

export default Index;
