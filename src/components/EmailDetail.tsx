
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { EmailType } from "@/lib/types";
import { formatRelative } from "date-fns";
import { cn } from "@/lib/utils";

interface EmailDetailProps {
  email: EmailType;
  onBack: () => void;
}

const EmailDetail = ({ email, onBack }: EmailDetailProps) => {
  const [showingAiOptions, setShowingAiOptions] = useState(false);
  const [selectedReply, setSelectedReply] = useState<string | null>(null);
  
  // Mock AI-generated replies
  const suggestedReplies = [
    "Thanks for the information! I'll review this and get back to you soon.",
    "I appreciate your email. I'll need some time to check this out and will respond properly later today.",
    "Got it. Let me look into this matter and I'll have an answer for you by tomorrow."
  ];
  
  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-card">
      {/* Email header */}
      <div className="p-4 border-b">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={onBack}
            className="flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left mr-1">
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
            Back to inbox
          </button>
          
          <div className="flex gap-2">
            <button className="p-1.5 text-muted-foreground hover:text-foreground rounded-sm hover:bg-muted">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-archive">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m8 2 4 4 4-4" />
                <path d="M12 15V9" />
                <path d="m15 12-3 3-3-3" />
              </svg>
            </button>
            <button className="p-1.5 text-muted-foreground hover:text-foreground rounded-sm hover:bg-muted">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2">
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                <line x1="10" x2="10" y1="11" y2="17" />
                <line x1="14" x2="14" y1="11" y2="17" />
              </svg>
            </button>
            <button className={cn(
              "p-1.5 rounded-sm",
              email.important ? "text-red-600 hover:bg-red-50" : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={email.important ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-flag">
                <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                <line x1="4" x2="4" y1="22" y2="15" />
              </svg>
            </button>
          </div>
        </div>
        
        <h1 className="text-xl font-medium mb-4">{email.subject}</h1>
        
        <div className="flex justify-between items-start">
          <div className="flex">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3 text-primary font-medium">
              {email.sender.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-medium">{email.sender.name}</span>
                <span className="text-muted-foreground">&lt;{email.sender.email}&gt;</span>
              </div>
              <div className="text-sm text-muted-foreground">
                to <span className="text-primary">me</span> •{" "}
                {formatRelative(new Date(email.timestamp), new Date())}
              </div>
            </div>
          </div>
          
          {email.labels && email.labels.length > 0 && (
            <div className="flex gap-1">
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
                      "text-xs px-2 py-1 rounded-full",
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
        </div>
      </div>
      
      {/* Email content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="prose prose-sm max-w-none">
          {email.summary && (
            <div className="mb-6 bg-blue-50 border border-blue-100 p-4 rounded-md">
              <div className="flex items-center text-blue-700 text-sm font-medium mb-2 gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sparkles">
                  <path d="m12 3-1.9 5.8a2 2 0 0 1-1.287 1.288L3 12l5.8 1.9a2 2 0 0 1 1.288 1.287L12 21l1.9-5.8a2 2 0 0 1 1.287-1.288L21 12l-5.8-1.9a2 2 0 0 1-1.288-1.287L12 3Z" />
                </svg>
                <span>AI Summary</span>
              </div>
              <p className="text-blue-900 mb-0">{email.summary}</p>
            </div>
          )}
          <div className="whitespace-pre-line">
            {email.content}
          </div>
          
          {email.attachments && email.attachments.length > 0 && (
            <div className="mt-6 pt-6 border-t">
              <h3 className="text-sm font-medium mb-3">Attachments ({email.attachments.length})</h3>
              <div className="grid grid-cols-2 gap-3">
                {email.attachments.map((attachment) => (
                  <div key={attachment.id} className="border rounded-md p-3 flex items-center gap-2">
                    <div className="w-10 h-10 bg-muted rounded flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file">
                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{attachment.filename}</p>
                      <p className="text-xs text-muted-foreground">{attachment.size}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Reply section */}
      <div className="border-t p-4">
        {!showingAiOptions && !selectedReply ? (
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => setShowingAiOptions(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sparkles mr-2">
                <path d="m12 3-1.9 5.8a2 2 0 0 1-1.287 1.288L3 12l5.8 1.9a2 2 0 0 1 1.288 1.287L12 21l1.9-5.8a2 2 0 0 1 1.287-1.288L21 12l-5.8-1.9a2 2 0 0 1-1.288-1.287L12 3Z" />
              </svg>
              Generate AI replies
            </Button>
            <Button>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-reply mr-2">
                <polyline points="9 17 4 12 9 7" />
                <path d="M20 18v-2a4 4 0 0 0-4-4H4" />
              </svg>
              Reply
            </Button>
          </div>
        ) : showingAiOptions ? (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium">AI suggested replies</h3>
              <button 
                className="text-sm text-muted-foreground hover:text-foreground"
                onClick={() => setShowingAiOptions(false)}
              >
                Cancel
              </button>
            </div>
            <div className="space-y-2">
              {suggestedReplies.map((reply, index) => (
                <div 
                  key={index} 
                  className="p-3 border rounded-md cursor-pointer hover:bg-muted/50"
                  onClick={() => {
                    setSelectedReply(reply);
                    setShowingAiOptions(false);
                  }}
                >
                  <p className="text-sm">{reply}</p>
                </div>
              ))}
            </div>
          </div>
        ) : selectedReply ? (
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium">Your reply</h3>
              <button 
                className="text-sm text-muted-foreground hover:text-foreground"
                onClick={() => setSelectedReply(null)}
              >
                Cancel
              </button>
            </div>
            <div className="border rounded-md p-3 mb-3">
              <p className="text-sm">{selectedReply}</p>
            </div>
            <div className="flex justify-end">
              <Button>Send Reply</Button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default EmailDetail;
