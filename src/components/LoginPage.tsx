
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { loginWithGoogle } from "@/lib/authUtils";

interface LoginPageProps {
  setIsAuthenticated: (value: boolean) => void;
}

const LoginPage = ({ setIsAuthenticated }: LoginPageProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    
    try {
      // This will redirect to Google OAuth
      await loginWithGoogle();
      
      // Note: The page will redirect to Google, so the code below will not execute
      // until the user returns from Google OAuth (handled in Index.tsx)
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: "There was an error logging in with Google",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-background to-muted/50">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-primary rounded-full p-3 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail-check">
              <path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              <path d="m16 19 2 2 4-4" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-center">Email Organizer</h1>
          <p className="text-muted-foreground mt-2 text-center max-w-sm">
            AI-powered assistant to manage your inbox, save time, and never miss important emails.
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Sign in to your account</CardTitle>
            <CardDescription>
              Connect your Google account to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              className="w-full flex items-center justify-center space-x-2"
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 488 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C315.5 98.6 282.7 81.2 248 81.2c-101.7 0-184.7 82.8-184.7 184.8 0 102 83 184.8 184.7 184.8 99.7 0 173.3-73.2 180.6-166.8H248V203h238.1c2.3 12.7 3.9 24.9 3.9 41.8z" fill="white"/>
                </svg>
              )}
              <span>{isLoading ? "Connecting..." : "Connect with Google"}</span>
            </Button>
            
            <div className="mt-6">
              <p className="text-center text-sm text-muted-foreground">
                By signing in, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-muted-foreground text-center">
              <p>Connect to your Gmail account</p>
              <p className="text-xs mt-1">We request permission to read and organize your emails</p>
            </div>
          </CardFooter>
        </Card>
        
        <div className="mt-8 space-y-4 bg-card rounded-lg p-4 border">
          <h3 className="font-medium">Features</h3>
          <div className="grid gap-3">
            <div className="flex items-start gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-tag text-primary mt-0.5">
                <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
                <path d="M7 7h.01" />
              </svg>
              <span>Auto-label client emails</span>
            </div>
            <div className="flex items-start gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-flag text-primary mt-0.5">
                <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                <line x1="4" x2="4" y1="22" y2="15" />
              </svg>
              <span>Flag important messages</span>
            </div>
            <div className="flex items-start gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list-filter text-primary mt-0.5">
                <path d="M3 6h18" />
                <path d="M7 12h10" />
                <path d="M10 18h4" />
              </svg>
              <span>Summarize unread threads</span>
            </div>
            <div className="flex items-start gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-reply text-primary mt-0.5">
                <polyline points="9 17 4 12 9 7" />
                <path d="M20 18v-2a4 4 0 0 0-4-4H4" />
              </svg>
              <span>AI-powered quick replies</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
