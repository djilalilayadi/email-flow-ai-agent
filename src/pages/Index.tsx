
import { useEffect, useState } from "react";
import Dashboard from "@/components/Dashboard";
import LoginPage from "@/components/LoginPage";
import { useToast } from "@/components/ui/use-toast";
import { getStoredAuthToken } from "@/lib/authUtils";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      const token = getStoredAuthToken();
      
      if (token) {
        // We would validate the token here in a real app
        setIsAuthenticated(true);
      }
      
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);
  
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
  
  return isAuthenticated ? <Dashboard /> : <LoginPage setIsAuthenticated={setIsAuthenticated} />;
};

export default Index;
