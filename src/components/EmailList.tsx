
import { cn } from "@/lib/utils";
import { EmailType } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";

interface EmailListProps {
  emails: EmailType[];
  onSelectEmail: (email: EmailType) => void;
  activeCategory: string;
}

const EmailList = ({ emails, onSelectEmail, activeCategory }: EmailListProps) => {
  if (emails.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-8 text-center">
        <div>
          <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search-x text-muted-foreground">
              <path d="M10 10 4 16 M4 10l6 6" />
              <path d="M13.5 6.5 17 10" />
              <path d="M17 6.5 13.5 10" />
              <circle cx="10" cy="10" r="8" />
              <path d="m21 21-3-3" />
            </svg>
          </div>
          <h3 className="text-lg font-medium mb-1">No emails found</h3>
          <p className="text-muted-foreground text-sm">
            There are no emails in {activeCategory} category
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex-1 overflow-hidden flex flex-col">
      <div className="border-b p-4 flex justify-between items-center bg-card">
        <div>
          <h2 className="font-medium capitalize">{activeCategory}</h2>
          <p className="text-sm text-muted-foreground">{emails.length} messages</p>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-full hover:bg-muted">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </button>
          <button className="p-2 rounded-full hover:bg-muted">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-filter">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto email-list">
        <div className="divide-y">
          {emails.map((email) => (
            <div 
              key={email.id}
              className={cn(
                "p-4 hover:bg-muted/50 transition-colors cursor-pointer",
                !email.read && "bg-blue-50"
              )}
              onClick={() => onSelectEmail(email)}
            >
              <div className="flex justify-between items-start mb-1">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 text-primary font-medium">
                    {email.sender.name.charAt(0).toUpperCase()}
                  </div>
                  <span className={cn("font-medium", !email.read && "font-semibold")}>
                    {email.sender.name}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(email.timestamp), { addSuffix: true })}
                </span>
              </div>
              
              <div className="ml-11">
                <h3 className={cn("text-sm mb-1", !email.read && "font-medium")}>
                  {email.subject}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {email.summary || email.content.substring(0, 120) + "..."}
                </p>
                
                {/* Labels */}
                {email.labels && email.labels.length > 0 && (
                  <div className="flex gap-1 mt-2">
                    {email.labels.map((label) => {
                      let bgColor = "bg-gray-100";
                      let textColor = "text-gray-800";
                      
                      if (label === "client") {
                        bgColor = "bg-blue-100";
                        textColor = "text-blue-800";
                      } else if (label === "urgent") {
                        bgColor = "bg-red-100";
                        textColor = "text-red-800";
                      } else if (label === "invoice") {
                        bgColor = "bg-green-100";
                        textColor = "text-green-800";
                      } else if (label === "meeting") {
                        bgColor = "bg-purple-100";
                        textColor = "text-purple-800";
                      } else if (label === "project") {
                        bgColor = "bg-yellow-100";
                        textColor = "text-yellow-800";
                      }
                      
                      return (
                        <span 
                          key={label}
                          className={cn(
                            "text-xs px-1.5 py-0.5 rounded-sm",
                            bgColor,
                            textColor
                          )}
                        >
                          {label}
                        </span>
                      );
                    })}
                  </div>
                )}
                
                {/* Important flag */}
                {email.important && (
                  <div className="mt-2 flex items-center gap-1 text-red-600 text-xs">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-flag">
                      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                      <line x1="4" x2="4" y1="22" y2="15" />
                    </svg>
                    <span>Important</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmailList;
