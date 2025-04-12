
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const Sidebar = ({ activeCategory, onCategoryChange }: SidebarProps) => {
  const categories = [
    { id: "inbox", label: "Inbox", icon: "inbox", count: 24 },
    { id: "important", label: "Important", icon: "alert-circle", count: 5 },
    { id: "client", label: "Clients", icon: "briefcase", count: 12 },
    { id: "project", label: "Projects", icon: "folder", count: 7 },
    { id: "personal", label: "Personal", icon: "user", count: 3 },
    { id: "unread", label: "Unread", icon: "mail", count: 9 }
  ];
  
  return (
    <div className="w-64 bg-card border-r flex flex-col">
      <div className="p-4">
        <Button className="w-full flex items-center justify-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-refresh-cw">
            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
            <path d="M21 3v5h-5" />
            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
            <path d="M3 21v-5h5" />
          </svg>
          <span>Sync Inbox</span>
        </Button>
      </div>
      
      <nav className="flex-1 overflow-y-auto p-2">
        <ul className="space-y-1">
          {categories.map((category) => (
            <li key={category.id}>
              <button
                onClick={() => onCategoryChange(category.id)}
                className={cn(
                  "w-full flex items-center justify-between p-2 rounded-md text-sm transition-colors",
                  activeCategory === category.id 
                    ? "bg-primary text-white" 
                    : "hover:bg-muted"
                )}
              >
                <div className="flex items-center gap-3">
                  <CategoryIcon name={category.icon} active={activeCategory === category.id} />
                  <span>{category.label}</span>
                </div>
                <span className={cn(
                  "text-xs py-0.5 px-2 rounded-full",
                  activeCategory === category.id 
                    ? "bg-white/20" 
                    : "bg-muted"
                )}>
                  {category.count}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium">Labels</h3>
          <button className="text-xs text-primary hover:underline">Edit</button>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Client</span>
          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Invoice</span>
          <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Project</span>
          <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">Meeting</span>
          <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">Urgent</span>
        </div>
      </div>
    </div>
  );
};

const CategoryIcon = ({ name, active }: { name: string, active: boolean }) => {
  const iconColor = active ? "white" : "currentColor";
  
  switch (name) {
    case "inbox":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-inbox">
          <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
          <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
        </svg>
      );
    case "alert-circle":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-alert-circle">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      );
    case "briefcase":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-briefcase">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      );
    case "folder":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-folder">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        </svg>
      );
    case "user":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      );
    case "mail":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail">
          <rect x="2" y="4" width="20" height="16" rx="2" ry="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      );
    default:
      return null;
  }
};

export default Sidebar;
