
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import Sidebar from "@/components/Sidebar";
import EmailList from "@/components/EmailList";
import EmailDetail from "@/components/EmailDetail";
import { mockEmails } from "@/lib/mockData";
import { EmailType } from "@/lib/types";
import { logoutUser } from "@/lib/authUtils";

const Dashboard = () => {
  const [selectedEmail, setSelectedEmail] = useState<EmailType | null>(null);
  const [emails, setEmails] = useState(mockEmails);
  const [activeCategory, setActiveCategory] = useState<string>("inbox");
  const { toast } = useToast();
  
  const handleEmailSelect = (email: EmailType) => {
    setSelectedEmail(email);
    
    // Mark email as read if it's unread
    if (!email.read) {
      setEmails(emails.map(e => 
        e.id === email.id ? { ...e, read: true } : e
      ));
    }
  };
  
  const handleLogout = () => {
    logoutUser();
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
    window.location.reload();
  };
  
  const filteredEmails = activeCategory === "inbox" 
    ? emails
    : emails.filter(email => email.labels?.includes(activeCategory));
  
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setSelectedEmail(null);
  };
  
  return (
    <div className="h-screen flex flex-col">
      <header className="bg-primary text-white p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail-check">
            <path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            <path d="m16 19 2 2 4-4" />
          </svg>
          <h1 className="text-xl font-bold">Email Organizer</h1>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center space-x-1 text-sm opacity-80 hover:opacity-100"
        >
          <span>Logout</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-out">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
        </button>
      </header>
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          activeCategory={activeCategory} 
          onCategoryChange={handleCategoryChange} 
        />
        
        <div className="flex-1 flex overflow-hidden">
          {!selectedEmail ? (
            <EmailList 
              emails={filteredEmails} 
              onSelectEmail={handleEmailSelect} 
              activeCategory={activeCategory}
            />
          ) : (
            <EmailDetail 
              email={selectedEmail} 
              onBack={() => setSelectedEmail(null)} 
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
